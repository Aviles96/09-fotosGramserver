"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const posts_1 = __importDefault(require("./routes/posts"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const server = new server_1.default();
//Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//FileUpload
server.app.use((0, express_fileupload_1.default)({ useTempFiles: true }));
//Configurar corps
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
//Rutas de mi aplicacion
server.app.use('/user', usuario_1.default);
server.app.use('/posts', posts_1.default);
//Conectar DB
mongoose_1.default.connect('mongodb://127.0.0.1:27017/fotosgram', (err) => {
    if (err)
        throw err;
    console.log('Base de Datos Online');
});
//Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
