const mongoose = require('mongoose');


const DisciplinaSchema = new mongoose.Schema({
  nome: String,
  ano: Number,
  semestre: Number,
});

const DisciplinaModel = mongoose.model('Disciplina', DisciplinaSchema);

module.exports = DisciplinaModel;