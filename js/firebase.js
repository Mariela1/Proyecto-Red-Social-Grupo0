
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js"
  // import { } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  import { getFirestore,
    addDoc,
    getDocs,
    collection,
    onSnapshot,
    deleteDoc,
    doc,
    getDoc,
    updateDoc
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

    export const addPostCollection  = (title, description) => addDoc(collection(db, "posts"), {title, description});
    //console.log(title, description);
    // Listar datos
    //export const getTasks = () => console.log('tasks-list');
    export const getPosts = () => getDocs(collection(db, "posts"))


    // generando la nueva funcion
    export const onGetPosts =  (callback) => onSnapshot(collection(db, "posts"), callback);

    // export {
    //   onSnapshot,
    //   collection
    //}

    export const deletePost = (id) => deleteDoc(doc(db,"posts", id));

    // Se crea una funcion que traiga o que obtenga una tarea individual
    export const getPost = (id) => getDoc(doc(db, "posts", id))

    // Crear una funcion que actualice una tarea

    export const updatePost = (id, NewFieldsTask) => updateDoc(doc(db, "posts", id), NewFieldsTask);