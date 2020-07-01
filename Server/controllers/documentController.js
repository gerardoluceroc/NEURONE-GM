const SolrNode = require('solr-node');
const client = new SolrNode({
    host: 'localhost',
    port: '8983',
    core: 'neurone',
    protocol: 'http'
});

const documents = require('../models/document');

const documentController = {};

documentController.getDocument = async (req, res) => {
    let docId = req.params.id;
    await documents.findOne( { _id: docId}, (err, doc) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            doc
        });
    });
};

documentController.getDocumentsSolr = async (req, res) => {
    let queryString = req.query['query'];
    let q1 = `(title_t:${queryString} OR indexedBody_t: ${queryString} OR keywords_t: ${queryString})`,
        q2 = `start=0&rows=100`,
        q3 = `df=indexedBody_t`,
        q4 = `hl=on&hl.q=${queryString}&hl.fl=indexedBody_t&hl.snippets=3&hl.simple.pre=<em class="hl">&hl.simple.post=</em>`,
        q5 = `hl.fragmenter=regex&hl.regex.slop=0.2&hl.alternateField=body_t&hl.maxAlternateFieldLength=300`,
        query = `q=(${q1})&${q2}&${q3}&${q4})&${q5}&wt=json`;
    let respDocs = [];
    let result = await client.search(query);
    let resultDocs = result.response.docs,
        resultNUm = result.response.numFound,
        searchHl = result.highlighting;
    for(let i = 0; i<resultDocs.length; i++){
        let docId = resultDocs[i].id;
        let docFound =  await documents.findOne({ _id: docId});
        respDocs.push(docFound);
    }
    res.status(200).json({
        ok: true,
        respDocs
    });
};



module.exports = documentController;
