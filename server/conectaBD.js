const mongoose = require("mongoose")
require('dotenv').config()

const conectaBD = ()=>{
    const connectionParams = {useNewUrlParser: true, useUnifiedTopology: true}
    mongoose.connect(process.env.DB, connectionParams)

    mongoose.connection.on("connected", () => {
		console.log("Conectado com a base de dados");
	});

	mongoose.connection.on("error", (err) => {
		console.log("Erro ao conectar com a base de dados :" + err);
	});

	mongoose.connection.on("disconnected", () => {
		console.log("Ligação com a Mongodb cortada");
	});
}

module.exports = conectaBD;