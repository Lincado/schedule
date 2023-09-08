const Contato = require("../models/contatoModel");
exports.index = (req, res) => {
  res.render("contato", { contato: {} }); 
  return; 
};

exports.register = async (req, res) => {
  try{
  const contato =  new Contato(req.body);
  await contato.register();
  
  if(contato.errors.length > 0) {
    req.flash("errors", contato.errors);
    req.session.save(() => res.redirect("back"));
    return ;
  }

  req.flash("success", "Contato criado com sucesso");
  req.session.save(() => res.redirect(`contato/index/${contato.contato._id}`));
  return;
  } catch(e) {
    console.log(e);
    return res.render("404"); //pagina 404.ejs
  }
};

exports.editIndex = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const contato = await Contato.buscaPorId(req.params.id);
  if(!contato) return res.render('404');

  res.render('contato', { contato });
};



