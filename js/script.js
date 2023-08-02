import { changeViews } from '../routers/router.js';
import { loginCheck } from '../js/loginCheck.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {auth,
//getPosts,
//onGetPosts,
//deletePost,
//getPost,
 } from "../js/firebase.js"
import '../js/signupForm.js';
import '../js/logout.js';
import '../js/signinForm.js';
import '../js/loading.js';
import '../js/wall.js';

// Iniciar la aplicacion

const init = () => {
    //window.location.hash = '#/';

    window.addEventListener('hashchange', () => {

        changeViews(window.location.hash);
        
    });
    window.addEventListener('beforeunload', function() {
        mostrarLoader();
      });

    window.addEventListener('load', function() {
        ocultarLoader();
      });
    //window.location.hash = '#/home';
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

};

window.addEventListener('load', init) 





