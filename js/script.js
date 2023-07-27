import { changeViews } from '../routers/router.js';

import {auth } from "../js/firebase.js"
import '../js/signupForm.js';
import '../js/logout.js';
import '../js/signinForm.js';

// Iniciar la aplicacion

const init = () => {
    //window.location.hash = '#/';
    

    window.addEventListener('hashchange', () => {
        changeViews(window.location.hash);
    });

};

window.addEventListener('load', init);



