import {signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js"
import { auth } from "../js/firebase.js";
import { showMessage } from "../js/showMessage.js";
import { loginCheck } from '../js/loginCheck.js';

export const signin = () => {
    const html = `
            <div class="mb-3 row">
            <div class="col-sm-10">
                <form id="login-form">
                    <label for="email">Email: </label>
                    <input type="email" id="signin-email" class="form-control mb-3" placeholder="Email" required>

                    <label for="password">Password: </label>
                    <input type="password" id="signin-password" class="form-control mb-3" placeholder="********"
                        required>

                    <button id='btnLogin' type="submit" class="btn btn-dark w-100 mb-4">
                        Login
                    </button>

                    <button id='signUp' type="submit" class="btn btn-dark w-100 mb-4">
                        Registrarse
                    </button>
                
                    <button id='btnGoogle' src="../img/google.png" type="submit" class="btn btn-dark"w-80 mb-4 id="googleLogin"><i class="fa-brands fa-google fa-2xs" style="color: #0031f5;"></i>
                        Google
                    </button>
                </form>
                </div>
            </div>
    `;
    const divElement = document.createElement('div');
    divElement.innerHTML = html;
    const taskForm = document.getElementById("#login-form");

    const btnLogin = divElement.querySelector('#btnLogin');
    const btnSignUp = divElement.querySelector('#signUp');
    const btnGoogle = divElement.querySelector('#btnGoogle');

    const emailUser = divElement.querySelector('#signin-email');
    const passwordUser = divElement.querySelector('#signin-password');

    btnLogin.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = emailUser.value;
        const password = passwordUser.value;
        try {
            // En el firebase
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredentials);
           //window.location.hash = '#/muro'
            // cerrar el modal de logueo de usuario
            // const modal = bootstrap.Modal.getInstance(signInForm.closest('.modal'));
            //modal.hide();
            //const user = userCredentials.user;
            // Mensaje de bienvenida
            showMessage('Bienvenido  ' + userCredentials.user.email);
            //console.log(email, password)
            window.location.hash = '#/muro'
        } catch (error) {
            //console.log(error)
            if (error.code === 'auth/wrong-password') {
                showMessage('Contraseña incorrecta', 'error')
            } else if (error.code === 'auth/user-not-found') {
                showMessage('Usuario no encontrado', 'error')
            } else if (error.code === 'auth/invalid-email') {
                showMessage('Correo electrónico no válido', 'error')
            } else {
                showMessage('Otro tipo de error', 'error')
            }
        }

       
        
    });

    // --------------------Registro-------------------------

btnSignUp.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#/signupForm'
  });

btnGoogle.addEventListener('click', async (e) => {
    e.preventDefault();

    const provider = new GoogleAuthProvider();

    try {
            const credentials = await signInWithPopup(auth, provider)
            console.log(credentials);
            console.log("sesion iniciada con google");
            window.location.hash = '#/muro'
            // Cerrar el modal de logueo de usuario
            //const modal = bootstrap.Modal.getInstance(document.querySelector('#signinModal'));
            //modal.hide();

            // Mostrar mensaje de bienvenida
            showMessage('Bienvenido  ' + credentials.user.displayName, 'success');
    } catch (error) {
        console.log(error);
    }

        taskForm.reset();
    });
  
    onAuthStateChanged(auth, (user) => {
        if (user) {
            loginCheck(user)
            try {
                console.log("sesión iniciada");
            } catch (error) {
                console.log(error);
            }
        } else {
            loginCheck(user)
        }
    
    });
 
   
    return divElement;

   
}





