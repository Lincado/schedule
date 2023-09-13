import validator from 'validator';

export default class Login {
    constructor(formClass ) {
        this.form = document.querySelector(formClass)
    }

    init() {
        this.events()
    }
    events() {
        if(!this.form) return
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
        

        if(!validator.isEmail(emailInput.value))  {
            const p = this.createTagAndMsgAlert("E-mail inválido");
            emailDiv.append(p)
            error = true
        } else {
            const existingAlert = emailDiv.querySelector(".alert-danger")
            if(existingAlert) emailDiv.remove(existingAlert)
        }

        if(passwordInput.value.length < 3 || passwordInput.value.length > 50) {
            const p = this.createTagAndMsgAlert("Senha precisa ter entre 3 a 40 caracteres");
            passwordDiv.append(p)
            error = true
        } else {
            const existingAlert = passwordDiv.querySelector(".alert-danger")
            if(existingAlert) passwordDiv.remove(existingAlert)
        }

        if(!error) el.submit()
    }

    createTagAndMsgAlert(msg) {
        const p = document.createElement("p");
        p.classList.add("alert", "alert-danger", "mt-1");
        p.innerText = msg
        return p
    }

}