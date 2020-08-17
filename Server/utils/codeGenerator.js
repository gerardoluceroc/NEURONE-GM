const { normalize } = require('normalize-diacritics');

module.exports = {
//Función para generar un código que sirva como identificador único para los recursos de gamificación (acciones, puntos, niveles, etc)
    async codeGenerator(appCode, name, type) {
        const app = appCode.split("_");
        const element = name.split(' ').join('').slice(0, 12);
        const normalize_element = await normalize(element);
        return app[0] + '_' + type + '_' + normalize_element;
    }
};
