const mongoose = require('mongoose');

const ContribuicaoSchema = new mongoose.Schema({
  tipo:String,
  cadeira:String,
  semestre: Number,
  ano: Number,
  autor: String,
  titulo: String,
  detalhes: String,
  ficheiro: String,
}, {
  timestamps: true,
});

const ContribuicaoModel = mongoose.model('Contribuicoes', ContribuicaoSchema);

module.exports = ContribuicaoModel;