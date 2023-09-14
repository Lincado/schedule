import validator from 'validator';

export default class Login {
    constructor(formClass ) {
        this.form = document.querySelector(formClass)
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
        const emailDiv = el.querySelector(".form-group")
        const passwordDiv = el.querySelector(".password")
        const emailInput = el.querySelector("input[name='email']");
        const passwordInput = el.querySelector("input[name='password']");
        let error = false;

        this.removeAlert(emailDiv)
        this.removeAlert(passwordDiv)

        if(!validator.isEmail(emailInput.value))  {
            this.addAlert(emailDiv, "E-mail inválido.");
            error = true;
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            this.addAlert(passwordDiv, "A senha deve ter entre 3 e 50 caracteres.");
            error = true;           
        }

        if(!error) el.submit();
    }

    addAlert(container,msg) {
        const p = this.createTagAndMsgAlert(msg)
        container.append(p)
    }

    createTagAndMsgAlert(msg) {
        const p = document.createElement("p");
        p.classList.add("alert", "alert-danger", "mt-1");
        p.innerText = msg
        return p
    }
    
    removeAlert(container) {
        const existingEmailAlert = container.querySelector(".alert-danger");
        if(existingEmailAlert) container.removeChild(existingEmailAlert);
    }
}