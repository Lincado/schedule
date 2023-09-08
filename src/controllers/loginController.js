const Login = require("../models/loginModel")

exports.index = (req, res) => {
    if(req.session.user) return res.render("login-logado")
    return res.render("login")
}
// como no arquivo contatoModel register é async await, aqui ele tbm precisa ser
exports.register = async (req, res) => {
    try {
        const login = new Login(req.body) //instanciando class e criando a chave body
        await login.register();
    
        if(login.errors.length > 0) {
            req.flash("errors", login.errors)
            req.session.save(function() {
                return res.redirect("back"); // tenta enviar o form, se tiver erro volta para pag de login
            });
            return;
        }
        req.flash("success", "Seu usuário foi criado com sucesso")
            req.session.save(function() {
                return res.redirect("back"); // tenta enviar o form, se tiver erro volta para pag de login
            });
    }catch(e) {
        console.log(e)
        return res.render("404") // render arquivo 404.ejs
    }
}

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body) //instanciando class e criando a chave body
        await login.login()

        if (login.errors.length > 0) {
            req.flash("errors", login.errors)
            req.session.save(function () {
                return res.redirect("back"); // tenta enviar o form, se tiver erro volta para pag de login
            });
            return
        }

        req.flash("success", "Logado com sucesso")
        req.session.user = login.user
        req.session.save(function () {
            return res.redirect("back"); // tenta enviar o form, se tiver erro volta para pag de login
        });
    } catch (e) {
        console.log(e)
        return res.render("404") // render arquivo 404.ejs
    }
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect("/")
}