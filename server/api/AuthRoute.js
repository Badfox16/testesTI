const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const Usuario = require('../models/Usuario.js');
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);
const app = express()
app.use(cors({credentials:true,origin:'http://localhost:3000'}));

const router = express.Router();
const secret="asfadfdaohgihrj0ihg08wrhg08hj08"

router.use(cookieParser());

// Endpoint de login
router.post('/login',async (req, res) => {
    const { email, senha } = req.body;
    const UserDoc = await Usuario.findOne({ email });

    const passOk = bcrypt.compareSync(senha, UserDoc.senha);
   
    if (passOk) {
        //Se logar
        console.log("Chamada ao metodo de login")
        jwt.sign({email, id: UserDoc._id}, secret, {}, (err, token)=>{
            if (err) throw err;
            res.cookie('token', token).json({
                id: UserDoc._id,
                email,
            })
        })

    } else {
        res.status(401).json("Credenciais erradas")
    }
});



router.get('/sair', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout bem-sucedido' });
});

module.exports = router;