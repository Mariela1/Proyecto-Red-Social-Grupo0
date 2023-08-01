
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
 // import firebase from "https://www.gstatic.com/firebasejs/10.1.0/firebase.js";
  // import { } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  import { getFirestore,
    addDoc,
    getDocs,
    collection,
    serverTimestamp,
    onSnapshot,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
    query,
    orderBy,
    } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBEBX859Y5VbshqlKCCQhEdPkIWvsFWzwQ",
    authDomain: "proyectoapp-individual.firebaseapp.com",
    projectId: "proyectoapp-individual",
    storageBucket: "proyectoapp-individual.appspot.com",
    messagingSenderId: "669201204767",
    appId: "1:669201204767:web:75555c17f4220a58c6372a"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  
    // Conexion a la base de datos
    export const db = getFirestore();
  
  // Metodo para agregar un nueva coleccion de post en firestore
export const addPostCollection = (nameUser, mailCurrentUser, postMessage, idUser) => {
  const postCollection = addDoc(collection(getFirestore(),'posts'), {
    author: nameUser,
    mail: mailCurrentUser,
    post: postMessage,
    time: serverTimestamp(),
    privacyUserPost: false,
    likes: [],
    id: idUser,
  });
  return postCollection;
};

// Metodo para obtener todos los posts en orden descendente (consulta en firestore)
export const getPosts = async () => {
  const postCollection = collection(getFirestore(), 'posts');
  const postQuery = query(postCollection, orderBy('time', 'desc'));
  const postSnapshot = await getDocs(postQuery);
  // Creando un array para almacenar los posts
  const posts = [];
  // Iterar a traves de los resultados y agregarlos al array de posts
  postSnapshot.forEach((doc) => {
    posts.push({
      id: doc.id,
      ...doc.data() });

  })
  return posts;
};

// Metodo para obtener todos los posts actualizados
export const onGetPosts = (callback) => {
  const postCollection = collection(getFirestore(), 'posts');
  const unsuscribe = onSnapshot(postCollection, (snapshot) => {
    const posts = [];
    snapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data()
      });
      callback(posts);
    });
    return unsuscribe;
  })
}

// Metodo para actualizar corazon de post
export const updateLoves = (id, likes) => {
  const postRef = db.collection('posts').doc(id);
  return postRef.update({ likes });
};
// Metodo para obtener un post desde su Id
export const getPostsUserId = (id) => {
  const postOnFirestore = db.collection('posts').doc(id).get();
  return postOnFirestore;
};