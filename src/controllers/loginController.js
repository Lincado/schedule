const Login = require("../models/loginModel")
exports.index = (res, req) => {
    res.render("login")
}
// como no arquivo loginController o register é async await, aqui ele tbm precisa ser
exports.register = async (res, req) => {
    try {
        const login = new Login(req.body) //instanciando class e criando a chave body
        await login.register()
    
        if(login.errors.length > 0) {
            req.flash("errors", login.errors)
            req.session.save(function() {
                return res.redirect("back"); // tenta enviar o form, se tiver erro volta para pag de login
            });
            return
        }
        req.flash("sucess", "Seu usuário foi criado com sucesso")
            req.session.save(function() {
                return res.redirect("back"); // tenta enviar o form, se tiver erro volta para pag de login
            });
            return
    
        res.send(login.body) // request o post de formulário dentro do body
    }catch(e) {
        res.render("404") // render arquivo 404.ejs
    }
}