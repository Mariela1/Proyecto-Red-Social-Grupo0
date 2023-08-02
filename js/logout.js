import { signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js"
import {auth } from "../js/firebase.js"

export const logout = () => {
    const logout = document.getElementById("logout");
    logout.addEventListener("click", async (e) => {
        e.preventDefault();
    try {
        await signOut(auth)
        console.log("sesión cerrada");
    } catch (error) {
        console.log(error);
    }
    });

   
};
