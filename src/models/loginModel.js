// Pasta model que faz tratamento de dados
const validator = require("validator")
const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  
});

const loginModel = mongoose.model('login', loginSchema);

//o que for postado vai ser recebido aqui
class login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null
  }

  async register() {
    this.valida()
    if(this.errors.length > 0) return
    //sempre que tiver async await usar try catch
    try {
    this.user = await loginModel.create(this.body)
    }catch(e) {
      console.log(e)
    }
  }

  valida() {
    this.clearUp();
    // Validação
    // O e-mail precisa ser valido
    if(!validator.isEmail(this.body.email)) this.errors.push("E-mail inválido")
    // A senha precisa ter entre 3 e 50 caracteres
  if(this.body.password < 3 || this.body.password > 50) {
    this.errors.push("A senha precisa ter entre 3 e 50 caracteres")
  }
  }

  //vai fazer um for nas chaves, e vai garantir tudo que estiver no body vai ser string
  clearUp() {
    for(const key in this.body) {
      //este body são os campos do form
      if (typeof this.body[key] !== "String") {
        this.body[key] = "" 
      }
    }
    
    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }
}

module.exports = login;
