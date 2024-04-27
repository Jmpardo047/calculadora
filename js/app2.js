//Primero Definimos variables que vamos a usar en general
const screen = document.querySelector('#op'); //Se define como const para que no se pueda cambiar
//Y el document.querySelector es para agarrar el primer elemto de html con ese id o clase, en este caso id
const aux = document.querySelector('screen')
const button = document.querySelectorAll(".button");
//El document.querySelectorAll hace lo mismo que el otro 
let x1 = 0;
let x2 = 0;
button.forEach(item =>{
    item.addEventListener('click', (e) => {
        let clicked = e.target.textContent.trim();
        clicked = confirm(clicked)
        if(item.id === "c"){
            screen.textContent = "0";
            return;
        }

        if(clicked === "="){
            calc();
            return;
        }
        else if (clicked === "sin"){
            calcSin();
        }
        else if (clicked === "cos"){
            calcCos();
        }
        else if (clicked === "tan"){
            calcTan();
        }
        else if (clicked === "xy" || clicked === "y"){
            calcPt()
        }
        else if(screen.textContent === "0" ){
            screen.textContent = clicked;   
        }
        else{
            screen.textContent += clicked;
        }

    })
})

function confirm(clicked){
    let conf;
    if (clicked === "="){
        conf = clicked;
    }
    else{
        conf = clicked.trim();
    }
    return conf;
}

function calc(){
    const screen = document.querySelector('#op');
        try{
            if(screen.textContent.includes("sin")){
                screen.textContent = `Math.sin(${parseFloat((screen.textContent.substring(3,screen.textContent.length))* (Math.PI/180))})`
            }
            else if(screen.textContent.includes("cos")){
                screen.textContent = `Math.cos(${parseFloat((screen.textContent.substring(3,screen.textContent.length))* (Math.PI/180))})`
            }
            else if(screen.textContent.includes("tan")){
                screen.textContent = `Math.tan(${parseFloat((screen.textContent.substring(3,screen.textContent.length))* (Math.PI/180))})`
            }
            else if(screen.textContent.includes("√")){
                screen.textContent = `Math.sqrt(${parseFloat(screen.textContent.substring(1,screen.textContent.length))})`
            }
            let result = eval(screen.textContent);
            result = result.toFixed(2);
            screen.textContent = result;
            return;
        }catch(error){
            screen.textContent = 'Error';
        }
}


function calcSin(){
    const pantalla = document.querySelector('#op');
    try {
        if (!pantalla.textContent.startsWith("sin"))
                pantalla.textContent = "sin";
    }catch (error){
        pantalla.value = 'Error'
    }
}

function calcCos(){
    const pantalla = document.querySelector('#op');
    try {
        if (!pantalla.textContent.startsWith("cos"))
                pantalla.value = "cos";
    }catch (error){
        pantalla.value = 'Error'
    }
}

function calcTan(){
    const pantalla = document.querySelector('#op');
    try {
        if (!pantalla.textContent.startsWith("tan"))
                pantalla.value = "tan";
    }catch (error){
        pantalla.value = 'Error'
    }
}

function calcPt(){
    const pantalla = document.querySelector('#op');
    try{
        if(x1 === 0){
            x1 = pantalla.textContent;
            pantalla.textContent = 0;
        }
        else if(x2 === 0){
            x2 = pantalla.textContent;
        }
        if (x1 != 0 && x2 >0){
            const resultado = Math.pow(x1, x2);
            pantalla.textContent = parseFloat(resultado.toFixed(2));
            x1 = 0
            x2 = 0
        }
    }
    catch(error){
        pantalla.value = 'Error'
    }
}