const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const Usuario = require('./models/Usuario.js');
const Teste = require('./models/Teste.js')
const Disciplina = require('./models/Disciplina.js')
const Contribuicao = require('./models/Contribuicao.js')
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const path = require('path');
const conectaBD = require('./conectaBD.js');
require('dotenv').config();

const salt = bcrypt.genSaltSync(10);
const secret = "ajbhfqoehqcuhfbvqpwuyhr";
const API_KEY = "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";

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:3001']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

conectaBD()

app.post('/cadastro', async (req, res) => {
  const { nome, apelido, email, telefone, senha } = req.body;

  try {
    const UsuarioDoc = await Usuario.create({
      nome: nome,
      apelido: apelido,
      email: email,
      senha: bcrypt.hashSync(senha, salt),
    });

    res.json(UsuarioDoc);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'E-mail já estão em uso' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

app.post('/entrar', async (req, res) => {
  const { email, senha } = req.body;
  const UserDoc = await Usuario.findOne({ email });
  const nome = UserDoc.nome
  const apelido = UserDoc.apelido

  const passOk = bcrypt.compareSync(senha, UserDoc.senha);

  if (passOk) {
    //Se logar
    console.log("Chamada ao metodo de login")
    jwt.sign({ nome, apelido, email, id: UserDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id: UserDoc._id,
        nome,
        apelido,
        email
      })
    })

  } else {
    res.status(401).json("Credenciais erradas")
  }
})

app.get('/perfil', (req, res) => {
  const { token } = req.cookies

  try {
    jwt.verify(token, secret, {}, (err, info) => {
      if (err) throw err;
      res.json(info)
    })
  } catch (err) {
    res.status(401).json('Token inválido')
  }
})

app.post('/sair', (req, res) => {
  res.cookie('token', '', { expires: new Date(0) }).json('ok');
});

app.post('/teste', uploadMiddleware.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

  try {
    const { tipo, cadeira, ano, semestre, ano_criacao, conteudo, docente } = req.body;
    const TesteDoc = await Teste.create({
      tipo,
      cadeira,
      ano,
      semestre,
      ano_criacao,
      conteudo,
      docente,
      ficheiro: newPath,
    });
    res.json(TesteDoc);

  } catch (err) {
    console.log(err);
  }
})

app.get('/testes', async (req, res) => {
  try {
    const testes = await Teste.find().sort({ createdAt: -1 });
    res.json(testes);
  } catch (error) {
    console.error('Erro ao buscar testes:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao buscar os testes.' });
  }
})

app.get('/teste/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contribuicaoDoc = await Teste.findById(id);
    if (contribuicaoDoc) {
      res.json(contribuicaoDoc);
    } else {
      res.status(404).json({ error: 'Teste não encontrado' });
    }
  } catch (error) {
    console.error("Erro ao buscar o teste: ", error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
})

app.put('/teste', uploadMiddleware.single('file'), async (req, res) => {
  try {
    const { tipo, cadeira, ano, semestre, ano_criacao, conteudo, docente, id } = req.body;
    const TesteDoc = await Teste.findById(id);

    if (!TesteDoc) {
      return res.status(404).json({ error: 'Teste não encontrado' });
    }

    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
    }

    const updatedTeste = await Teste.findOneAndUpdate(
      { _id: id },
      {
        tipo,
        cadeira,
        ano,
        semestre,
        ano_criacao,
        conteudo,
        docente,
        ficheiro: newPath ? newPath : TesteDoc.ficheiro,
      },
      { new: true }
    );

    if (!updatedTeste) {
      return res.status(500).json({ error: 'Falha ao atualizar o teste' });
    }

    res.json(updatedTeste);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/pesquisa/testes', async (req, res) => {
  try {

    const { ano, semestre, tipo, cadeira } = req.query;

    const anosPermitidos = [1, 2, 3, 4];
    const semestresPermitidos = [1, 2];
    const tiposPermitidos = ["Primeiro Teste", "Segundo Teste", "Exame Normal", "Exame de Recorrência"];

    const query = {};

    if (anosPermitidos.includes(parseInt(ano))) {
      query.ano = parseInt(ano);
    }
    if (semestresPermitidos.includes(parseInt(semestre))) {
      query.semestre = parseInt(semestre);
    }
    if (tiposPermitidos.includes(tipo)) {
      query.tipo = tipo;
    }
    if (cadeira) {
      query.cadeira = new RegExp(cadeira, 'i'); 
    }

    const testes = await Teste.find(query)

    res.json(testes);
  } catch (error) {
    console.error('Erro ao buscar testes:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao buscar os testes.' });
  }
});

app.get('/disciplinas', async (req, res) => {
  try {
    const disciplinas = await Disciplina.find();
    res.json(disciplinas);
  } catch (error) {
    console.error('Erro ao buscar disciplinas:', error);
    res.status(500).json({ error: 'Erro ao buscar disciplinas' });
  }
})

app.get('/pesquisa/disciplinas', async (req,res)=>{
  try {
    const {cadeira} = req.query;

    const query = {}

    if (cadeira) {
      query.cadeira = new RegExp(cadeira, 'i')
    }

    const disciplinas = await Disciplina.find(query)

    res.json(disciplinas)
  } catch (error) {
    console.error(error)
  }
})

app.post('/logout', (req,res) => {
  res.cookie('token', '', { expires: new Date(0) }).json('ok');
});

app.post('/contribuicao', uploadMiddleware.single('file'), async (req, res) => {
  try {
    let newPath = "";
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
    }

    const { tipo, cadeira, ano, semestre, autor, titulo, detalhes } = req.body;
    console.log(req.body);
    const ContribuicaoDoc = await Contribuicao.create({
      tipo,
      cadeira,
      ano,
      semestre,
      autor,
      titulo,
      detalhes,
      ficheiro: newPath,
    });
    res.json(ContribuicaoDoc);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Ocorreu um erro ao processar a contribuição.' });
  }
});

app.get('/contribuicao/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contribuicaoDoc = await Contribuicao.findById(id);
    if (contribuicaoDoc) {
      res.json(contribuicaoDoc);
    } else {
      res.status(404).json({ error: 'Teste não encontrado' });
    }
  } catch (error) {
    console.error("Erro ao buscar o teste: ", error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
})

app.put('/contribuicao', uploadMiddleware.single('file'), async (req, res) => {
  try {
    const { tipo, cadeira, ano, semestre, autor, titulo, detalhes, id } = req.body;
    const ContribuicaoDoc = await Contribuicao.findById(id);

    if (!ContribuicaoDoc) {
      return res.status(404).json({ error: 'Teste não encontrado' });
    }

    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
    }

    const updatedContribuicao = await Contribuicao.findOneAndUpdate(
      { _id: id },
      {
        tipo,
        cadeira,
        ano,
        semestre,
        autor,
        titulo,
        detalhes,
        ficheiro: newPath ? newPath : ContribuicaoDoc.ficheiro,
      },
      { new: true }
    );

    if (!updatedContribuicao) {
      return res.status(500).json({ error: 'Falha ao atualizar o teste' });
    }

    res.json(updatedContribuicao);
    console.log("atualizando o teste porra!");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/pesquisa/contribuicoes', async (req, res) => {
  try {

    const { tipo } = req.query;

    const tiposPermitidos = ["Dúvida", "Contribuição"];

    const query = {};

    if (tiposPermitidos.includes(tipo)) {
      query.tipo = tipo;
    }

    const testes = await Contribuicao.find(query)

    res.json(testes);
  } catch (error) {
    console.error('Erro ao buscar testes:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao buscar os testes.' });
  }
});

app.post('/respostas', async (req,res)=>{
  console.log("ChatBot iniciado");

  const options = {
    method: "POST",
    headers:{
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{role:"user", content:req.body.pergunta}],
      max_tokens: 120,
    })
  }

  try {
   const response = await fetch('https://api.openai.com/v1/chat/completions', options)
   const data = await response.json()
   res.send(data)
  } catch (error) {
    console.log(error)
  }
})

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Servidor correndo na porta: ${port}`);
});
