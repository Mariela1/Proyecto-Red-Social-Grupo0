import {components} from '../lib/dictionary.js';

export const changeViews = (hash) => {
    const contentElement = document.getElementById('content');
    
    if (contentElement) {
        contentElement.innerHTML = "";
        let componentToAdd = null;
        
        switch (hash)   {
        case '':
        case '#':
        case '#/':
        case '#/home':
            componentToAdd = components.inicio();
            break;
        case '#/signinForm':
            componentToAdd = components.inicioSesion();
            break;
        case '#/signupForm': 
            componentToAdd = components.registro();
            break;
        case '#/logout':
            componentToAdd = components.logout();
            break;
        case '#/muro':
            componentToAdd = components.muro();
            break;
        case '#/perfil':
            componentToAdd = components.perfil();
            break;
        default:
            componentToAdd = components.inicio();
            break;
        }
   if (componentToAdd) {
         contentElement.appendChild(componentToAdd);
        }
    
}

};