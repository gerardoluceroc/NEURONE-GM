
module.exports = {
//Función para generar un código que sirva como identificador único para los recursos de gamificación (acciones, puntos, niveles, etc)
    codeGenerator(appCode, name, type) {
        const app = appCode.split("_");
        const element = name.split(' ').join('').slice(0, 12);
        return app[0] + '_' + type + '_' + element;
    }
};
