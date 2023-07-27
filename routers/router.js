import {components} from '../lib/dictionary.js';

export const changeViews = (hash) => {
    const contentElement = document.getElementById('content');
    if (contentElement)
    {contentElement.innerHTML = "";
 
    switch (hash) {
        case '':
        case '#':
        case '#/':
        case '#/home':
            return contentElement.appendChild(components.inicio());
        case '#/signinForm':
            return contentElement.appendChild(components.inicioSesion());
        case '#/signupForm': 
            return contentElement.appendChild(components.registro());
        case '#/logout':
            return contentElement.appendChild(components.logout());
        case '#/muro':
            return contentElement.appendChild(components.muro());
   }}
   else {
         return contentElement.appendChild(components.inicio());
   }
    

};