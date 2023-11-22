const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    apelido: { type: String, required: true },
    username: { type: String, required: true, min: 5, unique: true },
    senha: { type: String, required: true },
})

const AdminModel = mongoose.model('Admin', AdminSchema)

module.exports = AdminModel;