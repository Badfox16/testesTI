const mongoose = require("mongoose");
const { Schema } = mongoose;

const ComentarioSchema = new Schema({
    autor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    conteudo: { type: String, required: true },
    teste: { type: Schema.Types.ObjectId, ref: 'Teste' }
}, {
    timestamps: true,
});

const ComentarioModel = mongoose.model('Comentario', ComentarioSchema);

module.exports = ComentarioModel;