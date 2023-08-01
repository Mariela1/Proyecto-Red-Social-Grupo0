export const home = () => {
    const divElement = document.createElement('div');
    const html = `
    <div class="HomePage">
        <div>
            <p> Cuidamos a tu <i class="fa-solid fa-dog"></i> 
            como si fuera nuestro <i class="fa-solid fa-paw"></i> 
             Únete <i class="fa-solid fa-hand-holding-heart"></i>
            </p>
        </div>         
        <div class="contentBtn">
            <button class='buttonStart'>Empezar</button>
        </div>
        <aside class="HomeInfo">
            <img src="img/home.jpg" width="100%" height="80%" >
        </aside>
    </div>
`
   
    divElement.innerHTML = html;

    const btnStart = divElement.querySelector('.buttonStart');
        //document.querySelector('.home a').style.display = 'block';
        //window.location.hash = '#/home'

    btnStart.addEventListener('click', () => {
        window.location.hash = '#/signinForm';
    });
    return divElement;
};