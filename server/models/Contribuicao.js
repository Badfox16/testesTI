const mongoose = require('mongoose');

const ContribuicaoSchema = new mongoose.Schema({
  tipo:String,
  cadeira:String,
  semestre: Number,
  ano_criacao: Number,
  conteudo: String,
  ficheiro: String,
}, {
  timestamps: true,
});

const ContribuicaoModel = mongoose.model('Contribuicao', ContribuicaoSchema);

module.exports = ContribuicaoModel;