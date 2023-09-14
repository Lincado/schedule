import validator from "validator";

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.validate(e);
        })
    }

    validate(e) {
        const el = e.target;
        const nomeInput = el.querySelector("input[name='nome']");
        const nomeDiv = el.querySelector(".nome");
        const emailInput = el.querySelector("input[name='telefone']");
        const emailDiv = el.querySelector(".email");
        const telefoneInput = el.querySelector("input[name='email']");
        const telefoneDiv = el.querySelector(".telefone");
        let error = false

        this.removeAlert(nomeDiv);
        this.removeAlert(emailDiv);
        this.removeAlert(telefoneDiv);

        if(nomeInput.value === "") {
            this.addAlert(nomeDiv, "Nome é um campo obrigatório");
            error =  true;
        }
        if(!validator.isEmail(emailInput.value) && telefoneInput.value === "") {
            this.addAlert(emailDiv, "E-mail inválido");
            this.addAlert(telefoneDiv, "E-mail ou telefone são requeridos");
            error = true
        }

        if(!error) el.submit();
    }

    addAlert(container, msg) {
        const p = this.createTagAlert(msg);
        container.append(p);
    }

    createTagAlert(msg) {
        const tagAlert = document.createElement("p");
        tagAlert.classList.add("alert", "alert-danger", "mt-1");
        tagAlert.innerText = msg;
        return tagAlert;
    }

    removeAlert(container) {
        const existingAlert = container.querySelector(".alert-danger");
        if(existingAlert) container.removeChild(existingAlert);
    }
}