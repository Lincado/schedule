// Pasta model que faz tratamento de dados
const validator = require("validator")
const mongoose = require('mongoose');
const bcryptjs = require("bcryptjs")

const loginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  
});

const loginModel = mongoose.model('login', loginSchema);

//o que for postado vai ser recebido aqui
class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null
  }

  async login() {
    this.valida()
    if(this.errors.length > 0) return 
    this.user = await loginModel.findOne({ email: this.body.email })

    if(!this.user) {
      this.errors.push("Usuário não existe")
      this.user = null
      return
    }
    //se usuário passar daqui, criar uma sessão no loginController
    if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Senha inválida")
      return
    }
  }

  async register() {
    this.valida() // Valida todos os dados
    if(this.errors.length > 0) return // se possuir um error vai gerar flash message do erro
    
    await this.UserExist() // checar se usuário existe

    if(this.errors.length > 0) return // se usuário ja existir vai exibir a flash message de que email ja está sendo utilizado

    const salt = bcryptjs.genSaltSync(); // gerando salt (sequencia aleatória)
    this.body.password = bcryptjs.hashSync(this.body.password, salt) // usando salt no value da senha para que represente a senha original, mas que não pode ser revertido (uma sequencia de caracteres, é como se fosse uma criptografia, porem não pode ser revertida ao estado original)
    // arqui não precisa de try...catch pois já foi usado em loginController
    this.user = await loginModel.create(this.body)
    
  }
  async UserExist() {
    // Aqui não precisa do try...catch pois ja foi usado em loginController, e ia impedir o try catch de lá de executar
    this.user = await loginModel.findOne({ email: this.body.email })

    if(this.user) this.errors.push("Usuário já existe")
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
      if (typeof this.body[key] !== "string") {
        this.body[key] = "" 
      }
    }
    
    this.body = {
      email: this.body.email,
      password: this.body.password
    }
  }
}

module.exports = Login;
