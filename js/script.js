import { changeViews } from '../routers/router.js';
import {wall} from '../js/wall.js';
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
};

window.addEventListener('load', init) 





