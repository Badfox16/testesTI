const mongoose = require('mongoose');

const TesteSchema = new mongoose.Schema({
  tipo:String,
  cadeira:String,
  ano: Number,
  semestre: Number,
  ano_criacao: Number,
  conteudo: String,
  docente: String,
  ficheiro: String,
}, {
  timestamps: true,
});

const TesteModel = mongoose.model('Teste', TesteSchema);

module.exports = TesteModel;