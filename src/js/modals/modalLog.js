//email - nastya@gmail.com
//password - password

import {getLogin} from "/third-step-project/src/js/ajax.js";
import Modal from "/third-step-project/src/js/modals/modal.js";

const container = document.getElementById("container");
export let token;
token = sessionStorage.getItem('token');
const btnLog = document.querySelector('.header__btn');
btnLog.addEventListener('click', createModal);

// visibility of the login button
window.onload = function () {
    if (token) {
        btnLog.remove();
        document.querySelector('.header__btn-create').removeAttribute('hidden');
    } else {
        btnLog.removeAttribute('hidden');
    }
};

// authorization window
class ModalLogIN extends Modal {
    constructor(email, password) {
        super();
        this.email = email;
        this.password = password;
        this.element.title = document.createElement('p');
        this.element.email = document.createElement('input');
        this.element.password = document.createElement('input');
    }

    render() {
        super.render();
        this.element.email.type = 'email';
        this.element.password.type = 'password';
        this.element.email.placeholder = 'email';
        this.element.password.placeholder = 'password';
        this.element.title.textContent = "LOGIN";
        this.element.email.className = "header__modal-input";
        this.element.password.className = "header__modal-input";
        this.element.title.className = "header__modal-text";
        this.element.modalWindow.append(this.element.btnClose, this.element.title, this.element.email, this.element.password, this.element.btnSubmit);

// processing and checking for compliance  with the token
        this.element.btnSubmit.addEventListener('click', async () => {
            let tokenResponse = await getLogin(this.element.email.value, this.element.password.value).then(r => r.text());
            if (tokenResponse === "08500639-c3cd-4ffb-be8b-4ac84db0914f") {
                sessionStorage.setItem('token', tokenResponse);
                token = sessionStorage.getItem('token');
                this.element.modalWrapper.remove();
                btnLog.remove();
                document.querySelector('.header__btn-create').removeAttribute('hidden');


            } else {
                alert("ERROR! Wrong login/password! Try again.")
            }
        })
    }
}

function createModal() {
    let modalLog = new ModalLogIN();
    modalLog.render();
}