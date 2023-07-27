import { home } from '../js/home.js';
import { signin } from '../js/signinForm.js';
import {signup} from '../js/signupForm.js';
import {wall} from '../js/wall.js';
import {logout} from '../js/logout.js';
export const components = {
    inicio: home,
    inicioSesion: signin,
    registro: signup,
    muro: wall,
    logout: logout,
};

