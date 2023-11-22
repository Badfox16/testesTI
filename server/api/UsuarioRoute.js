const express = require('express');
const Usuario = require('../models/Usuario.js');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const salt = bcrypt.genSaltSync(10);
const app = express()
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
const router = express.Router()

const secret = "asfadfdaohgihrj0ihg08wrhg08hj08"

router.use(cookieParser());
app.use(express.json());
app.use(cookieParser());

// Endpoint de login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    const user = await Usuario.findOne({ email });

    if (!user || !bcrypt.compareSync(senha, user.senha)) {
        return res.status(401).json("Credenciais erradas");
    }

    const token = jwt.sign({ email, id: user._id }, secret, {});
    res.cookie('token', token, { httpOnly: true }).json({
        id: user._id,
        email,
        token, // Inclua o token na resposta
    });
});

// Endpoint de perfil
router.get('/perfil', (req, res) => {
    console.log(req.body.jwt)
    const { token } = req.cookies;

    try {
        const decoded = jwt.verify(token, secret);
        if (!decoded) {
            throw new Error('Token inválido');
        }
        const { email, id } = decoded;
        res.status(200).json({ email, id });
    } catch (err) {
        // console.log(err);
        res.status(401).json('Token inválido');
    }
});

router.route('/usuario')
    //Criar Usuario
    .post(async (req, res) => {

        const { nome, apelido, email, telefone, senha } = req.body;

        try {
            const novoUsuario = new Usuario({
                nome: nome,
                apelido: apelido,
                email: email,
                telefone: telefone,
                senha: bcrypt.hashSync(senha, salt),
            });

            const usuarioSalvo = await novoUsuario.save();
            res.status(201).json(usuarioSalvo);
            console.log(usuarioSalvo);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    })
    //Listar todos os usuarios
    .get(async (req, res) => {
        try {
            const usuarios = await Usuario.find({});
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
//Listar um usuario
router.route('/usuario/:id').get(async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
    //Editar Usuario
    .put(async (req, res) => {
        try {
            const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
    //Apagar Usuario
    .delete(async (req, res) => {
        try {
            const usuario = await Usuario.findByIdAndRemove(req.params.id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })



module.exports = router