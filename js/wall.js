//import { signOut } from '../js/logout.js';
//import firebase from "https://www.gstatic.com/firebasejs/10.1.0/firebase.js";

import {
    addPostCollection, 
    getPosts, 
    onGetPosts,
    updateLoves,
    getPostsUserId,

} from '../js/firebase.js';

export const wall  = () => {

      // ---------------Posteos de la base de datos----------------------------//
    const view =  `
    <section class='timeLineContainer'>
      <section class='profileContainer'>
        <figure>
          <img id='imgUser' class='imgProfile' src='img/user.png' width="20%" height="20%" alt='photoProfile' />
        </figure>
        <p id='nameProfile' class='nameProfile'></p>
        <p id='status' class='status'>Estado: Dog Lovers <i class="fa-solid fa-heart" style="color: #f50a0a;"></i>  </p>
      </section>
      <section class='publicationContainer'>
      <section class='publication'>
        <textarea rows="4" cols="50" name='publication' id='textAreaPublication' class='textAreaPublication' placeholder='¿Qué deseas compartir con la comunidad de dog lovers?'></textarea>
        <div class="containerProgress">
            <div class="progress"></div>
        </div>
        <div class="hide divImg">
            <span class="deleteImg"><i class="fa-solid fa-trash fa-2xl" style="color: #fa0000;"></i></span>
            <img class="picPost"/>
        </div>
        <div class="container-functions">
      <div class="camera-privacity">
      <input type="file" id="photoPost" class="hide" accept="img/*">
      <label for="photoPost"><img src="./img/camera.png" width="10%" height="10%" class="camera"></label>        
        <div class="privacidad">
          <select id="privacyPostArea">
            <option value="1"><i class="fa-solid fa-globe"></i>  Público</option>
            <option value="2"><i class="fa-solid fa-lock fa-2xl"></i> Solo yo </option>
          </select>
        </div>
      </div>
        <div class='buttonsPost'>
            <button id='buttonImg' type='button' class='buttonImg'><i class="fas fa-images"></i></button>  
            <button id='buttonShare' type='submit' class='buttonShare'>Compartir</button>
        </div>
        </section>
      <section id='posts' class='postSection'>
      </section>
      </section>
    </section>
    `;
    const divElement = document.createElement('div');
  divElement.className = 'divContent';
  divElement.innerHTML = view;

      // Constantes Globales
      const btnShare = divElement.querySelector('#buttonShare');
      const btnImg = divElement.querySelector('#buttonImg');
    // const linkAboutLogOut = document.querySelector('.logOut a');
     const textPost = divElement.querySelector('#textAreaPublication');
     const userNameProfile = divElement.querySelector('#nameProfile');
     const postContent = divElement.querySelector('#posts');
     const imgElement = divElement.querySelector('#imgUser');
    
     
  // ------------------------- Foto de perfil -------------------------
  if (localStorage.getItem('userPhoto') === 'null') {
     imgElement.src = 'images/imgDefault3.png';
   } else {
     imgElement.src = localStorage.getItem('userPhoto');
   }
     // -------------------------  Mostrar nombre de perfil -------------------------
  if (localStorage.getItem('userName') === null) {
     userNameProfile.textContent = localStorage.getItem('userEmail');
   } else {
     userNameProfile.textContent = localStorage.getItem('userName');
   }
 
  // ------------------------- Boton compartir -------------------------
  btnShare.addEventListener('click', () => {
     if (textPost.value === '') {
       textPost.placeholder = 'Escribe algo por favor';
     } else {
       // aqui va lo de firestore
       addPostCollection(localStorage.getItem('userName'), localStorage.getItem('userEmail'), textPost.value, localStorage.getItem('userId'));
       textPost.value = '';
     }
   });
 
   onGetPosts(() => {
     postContent.innerHTML = '';
   
     getPosts().then((posts) => {
       // Iterar sobre los posts en lugar de docRef
         posts.forEach((postInfo) => {
         // Obtener el id del post directamente desde postInfo
             const idPost = postInfo.id;
         
         postContent.innerHTML += `<section class='postMessage'>
           <div class='authorPost' name='${postInfo.id}'>
             <p>Publicado por <span id='userNamePost' class='userNamePost' >${postInfo.mail}</span></p>
             <button id='${idPost}' class='btnDelete'></button>
           </div>
           <div class='sectionAboutPost'>
             <textarea name='${idPost}' disabled class='postContent' rows='2'>${postInfo.post}</textarea>
             <div>
               <button id='${idPost}' class='btnEdit'>&#9997;</button>
               <button id='${idPost}' class='btnSave'>&#9989;</button>
           </div>
           </div>
           <div id='reactionPost' class='reactionPost'>
             <button id='${idPost}' class='btnLove'></button>
             <span name='${idPost}'>${postInfo.likes.length}</span>
             <button id='${idPost}' class='btnComments'></button>
             <span>0</span>
           </div>
         </section>
         <!-- MODAL -->
         <div id="id01" class="modal">
           <div class='contentModal'>
             <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
             <form class="modal-content">
               <div class="container">
                 <h1>Eliminar publicación</h1>
                 <p>¿Estás seguro que deseas eliminar la publicación?</p>
                 <div class="clearfix">
                   <button  type="button" class="cancelbtn confirm">Cancel</button>
                   <button id="deletebtn"  type="button" class="deletebtn confirm">Eliminar post</button>
                 </div>
               </div>
             </form>
           </div>
         </div>
         <!-- fin de modal -->
         `;
       });
     });
 
   // ------------------------- Boton love -------------------------//
 divElement.addEventListener('click', async (e) => {
     if (e.target.className === 'btnLove') {
       const userId = localStorage.getItem('userId');
       const newLike = {
         userEmail: localStorage.getItem('userEmail'),
         userID: userId,
       };
       try {
           const postInfo = await getPostsUserId(e.target.id);
            const postData = postInfo.data();
           const userLikes = postData.likes;
           const filterLikeByIdUser = userLikes.filter((like) => like.userID === userId);
           const filterLikeByIdOtherUser = userLikes.filter((like) => like.userID !== userId);
           if (filterLikeByIdUser.length !== 0) {
             updateLoves(postInfo.id, filterLikeByIdOtherUser);
           } else {
             userLikes.push(newLike);
             updateLoves(postInfo.id, userLikes);
           }
       } catch (error) {
        console.error('Error al obtener el post desde Firestore: ', error);
       }
        
     }
   });
 
  // ------------------------- Boton Edit -------------------------
  divElement.addEventListener('click', async (e) => {
     if (e.target.className === 'btnEdit') {
       getPostsUserId(e.target.id)
         .then((postInfo) => {
           if (postInfo.data().id === localStorage.getItem('userId')) {
             document.querySelector(`textarea[name='${e.target.id}']`).disabled = false;
           } else {
             document.querySelector(`textarea[name='${e.target.id}']`).disabled = true;
           }
         });
     }
   });
 
   // ------------------------- Boton Save  -------------------------
 divElement.addEventListener('click', async (e) => {
     if (e.target.className === 'btnSave') {
       const postSave = document.querySelector(`textarea[name='${e.target.id}']`);
       getPostsUserId(e.target.id)
         .then((postInfo) => {
           if (postInfo.data().id === localStorage.getItem('userId')) {
             updatePost(e.target.id, postSave.value);
           } else {
             document.querySelector(`textarea[name='${e.target.id}']`).disabled = true;
           }
         });
     }
   });
 
   // ------------------------- Boton Delete -------------------------
 divElement.addEventListener('click', async (e) => {
 if (e.target.className === 'btnDelete') {
   getPostsUserId(e.target.id)
     .then((postInfo) => {
         const postData = postInfo.data();
       if (postInfo.data().id === localStorage.getItem('userId')) {
         // mostrar modal
         document.querySelector('#deletebtn').setAttribute('name', e.target.id);
         document.querySelector('#id01').style.display = 'block';
       }
     })
     .catch((error) => {
         console.error('Error al obtener el post desde Firestore: ', error);
     })
 }
 });
 
 // ------------------------- FUNCIONES DEL MODAL -------------------------
 divElement.addEventListener('click', async (e) => {
    if (e.target.className === 'deletebtn confirm') {
      const postId = e.target.getAttribute('name');
      getPostsUserId(postId)
        .then((postInfo) => {
          if (postInfo.data().id === localStorage.getItem('userId')) {
            deletePost(postId);
          }
        });
    }
  });

  divElement.addEventListener('click', async (e) => {
    if (e.target.className === 'cancelbtn confirm') {
      document.querySelector('#id01').style.display = 'none';
    }
  });


});

return divElement;
};
