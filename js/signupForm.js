import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js"
import { auth } from "../js/firebase.js"        
import { showMessage } from "../js/showMessage.js"

export const signup = () => {

const html = `
<div class="mb-3 row">
<div class="col-sm-10">
            <form id="signup-form">
                <label for="email">Email: </label>
                <input type="email" id="signup-email" class="form-control mb-3" placeholder="Email" required>

                <label for="password">Password: </label>
                <input type="password" id="signup-password" class="form-control mb-3" placeholder="********"
                    required>
                <button type="submit" class="btn btn-dark" id="signUp">
                    Register
                </button>
            </form>
</div>
</div>

`;

const divElement = document.createElement('div');
divElement.innerHTML = html;

const btnSignUp = divElement.querySelector('#signUp');
const formElement = divElement.querySelector('#signup-form');
const emailUser = divElement.querySelector('#signup-email');
const passwordUser = divElement.querySelector('#signup-password');


btnSignUp.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailUser.value;
    const password = passwordUser.value;
    formElement.addEventListener('click', async(e) => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            console.log(userCredentials)
    
            // cerrar el modal de registro de usuario
            // const signupModal = document.querySelector('#signupModal')
            // const modal = bootstrap.Modal.getInstance(signupModal).hide()
            // modal.hide();
    
            //Mostrar el mensaje de bienvenida
            showMessage('Bienvenido' + userCredentials.user.email);
    
        } catch (err) {
            console.log(err.message)
            console.log(err.code)
    
            if (err.code === 'auth/email-already-in-use') {
                showMessage('El correo electrónico ya está en uso')
            } else if (err.code === 'auth/invalid-email') {
                showMessage('El correo electrónico no es válido')
            } else if (err.code === 'auth/weak-password') {
                showMessage('La contraseña debe tener al menos 6 caracteres')
            } else if (err.code) {
                showMessage('Algo salio mal')
            }
        
        }
  
    
    
    });
    
    window.location.hash = '#/signupForm';

});

return divElement;

}