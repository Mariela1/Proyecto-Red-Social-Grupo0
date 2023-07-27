//import { signOut } from '../js/logout.js';

import {
    addPostCollection, getPosts, onGetPosts,
    deletePost,getPost, updatePost, 
} from '../js/firebase.js';

//updateLoves, getPostsUserId,
export const wall = () => {
    const html = `
        <section class="profileContainer">
            <figure>
                <i class="fa-solid fa-user fa-2xl" style="color: #111212;"></i>
            </figure>
        </section>
        <section>
            <textarea class='textAreaPublication' placeholder="Que tips para el cuidado de tu engreido deseas compartir?" rows="5"></textarea>
        </section>
        <div class='buttonsPost'>
        <button  type='button' class='buttonImg'><i class="fas fa-images"></i></button>
        <button  type='submit' class='buttonShare'>Compartir</button>
      </div>

    `;
    const divElement = document.createElement('div');
    divElement.innerHTML = html;
    return divElement;
}