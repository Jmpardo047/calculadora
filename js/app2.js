//1. Definimos variables que vamos a usar en general
const screen = document.querySelector('#op'); //Se define como const para que no se pueda cambiar
//Y el document.querySelector es para agarrar el primer elemto de html con ese id o clase, en este caso id
const aux = document.querySelector('screen')
const button = document.querySelectorAll(".button");
//El document.querySelectorAll hace lo mismo que el otro, pero no agarra todos los elementos, no solo el primero
/*|Screen| tiene el div donde se muestra los numero q vamos a poner, |button| es cualquier
numero u operacion que se puedan presionar, y |aux| es la pantalla de arriba, aunque no se esta usando aun*/
let x1 = 0;
let x2 = 0;

/*ForEach se usa para recorrer todos los elementos de un array, te acuerdas que arriba llamamos con 
la variable |button| a todos los botones de la calculadora?, bueno, la  variable los guarda como array
entonces basicamente recorremos boton por boton*/
button.forEach(item =>{
    /* item.addEventListener es  para que el programa perciba algun evento, como hover y eso q usabamos en 
    css, en este caso queremos que el programa lea cuando hacemos 'click' a algun elemento dentro del array que 
    estamos recorriendo, osea, a algun boton*/
    item.addEventListener('click', (e) => {
        let clicked = e.target.textContent.trim();
        //la variable clicked lee el texto que se encuentra en el boton html que se clickeo
        //trim es para quitar los espacios en blanco que hay en el html

        if(item.id === "c"){ //si el boton tiene el id "c" vamos a eliminar todo y dejar un 0 en la pantalla
            screen.textContent = "0";
            return;
        }

        if(clicked === "="){ //si el texto dentro del boton es =, vamos a calcular con la funcion q creé
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
        /* este es para mirar si el boton indica potencia pq la protencia no se puede operar con la funcion eval
        como el resto de operaciones*/
        else if (clicked === "xy" || clicked === "y"){ 
            calcPt()
        }
        else if(screen.textContent === "0" ){/*esto indica que si en la pantalla esta en 0, 
        el contenido ahora va a ser el texto dentro del boton html*/
            screen.textContent = clicked;   
        }
        else{//y si ninguno de los casos se cumple, simplemente le vamos a agregar el texto del boton a la pantalla
            screen.textContent += clicked;
        }

    })
})

function calc(){ //Esta es la funcion que calcula todas las operaciones menos la potencia
    const screen = document.querySelector('#op');
        try{ //Usamos un try para verificar que no haya ningun error con los datos o cualquier cosa
            /*tanto para el seno, coseno, tangente y raiz, hay q usar funciones especiales q son Math. y la operacion,
            esas funciones las lee eval, pero para q en la pantalla solo se vea por ejemplo sin, y no Math.sin, covertimos
            la string internamente para luego procesarla con eval*/
            if(screen.textContent.includes("sin")){ //verificamos q en la pantalla este la palabra sin
                screen.textContent = `Math.sin(${parseFloat((screen.textContent.substring(3,screen.textContent.length))* (Math.PI/180))})`
                /*aca modificamos la string, por ejemplo, si originalmente teniamos sin90 en la pantalla, ahora la vamos
                a convertir en Math.sin(90) para que el eval la pueda procesar, esto lo hacemos creando una substring que va
                desde la posicion 3 hasta que acabe el string, esto ya que la palabra "sin"" ocupa 3 posiciones, y al empezar la
                cadena desde aqui la eliminamos, juntando Math.sin con la substring de la string de la pantalla que borra el sin*/ 
            }
            else if(screen.textContent.includes("cos")){
                screen.textContent = `Math.cos(${parseFloat((screen.textContent.substring(3,screen.textContent.length))* (Math.PI/180))})`
            }
            else if(screen.textContent.includes("tan")){
                screen.textContent = `Math.tan(${parseFloat((screen.textContent.substring(3,screen.textContent.length))* (Math.PI/180))})`
            }
            else if(screen.textContent.includes("√")){
                screen.textContent = `Math.sqrt(${parseFloat(screen.textContent.substring(1,screen.textContent.length))})`
                /*por ejemplo, aca como en vez de usar sin cos o tan q tienen 3 letras, el símbolo de raíz solo ocupa 1
                posición, por lo que ahora la substring empieza desde 1, como ya te habrás dado cuenta, esta forma de rehacer
                las cadenas tiene sus limitaciones, por ejemplo, no podemos hacer mas que esa operacion porque entraria toda la 
                operacion dentro de la funcion math, o si hay operaciones antes de las palabras sin cos tan o raiz se van a borrar
                en lugar de estas palabras, para poder hacer esto de forma dinamica y sin limites hay q usar expresiones regulares,
                pero eso es cuento para despues jajaja*/
            }
            let result = eval(screen.textContent); /*Para operar usamos eval, que basicamente agarra una
            string, en este caso el contenido de la pantalla, y automaticamente lo opera segun los signos q tenga,
            puede soportar operaciones basicas como + - * / o funciones de js como Math.sin, que usamos para el seno*/
            result = result.toFixed(2); // acá modifico el resultado del eval para que si es decimal, solo muestre los primeros 2 decimales
            screen.textContent = result;// y aca simplemente le pido al programa que el texto de la pantalla ahora sea el resultado
            return;
        }catch(error){// si existe algun error de cualquier tipo, simplemente pedimos a la pantalla que muestre la palabra error
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
/*Estas funcionnes de CalcSin calcCos y calcTan realmente no estan haciendo nada :)*/

/*Para calcular potencias es medio distinto, pq tenemos que usar 2 variables auxiliares, pq en caso de querer
mandar todo el string y que lo opere con eval, seria mas complicado la vdd*/ 
function calcPt(){
    const pantalla = document.querySelector('#op');
    try{
        if(x1 === 0){
            /*Primero vemos si la base es igual a 0, si es el caso, la variable tomará el valor 
            del primer numero que mandemos, y volveremos a poner 0 en la pantalla, para agregar otro nro*/
            x1 = pantalla.textContent;
            pantalla.textContent = 0;
        }
        else if(x2 === 0){
            /*Si la base ya tiene valor, el sigiente número que ingresemos será el exponente, y la potencia
            se operará cuando volvamos a presionar el boton de protencia*/
            x2 = pantalla.textContent;
        }
        /*si ya hay base y exponente, operamos la potencia*/
        if (x1 != 0 && x2 >0){
            const resultado = Math.pow(x1, x2);//math.pow es una función para poder operar potencias
            pantalla.textContent = parseFloat(resultado.toFixed(2));
            x1 = 0
            x2 = 0
        }
    }
    catch(error){
        pantalla.value = 'Error'
    }
}

/*Y lissto, eso seria basicámente todo, espero me hayas entendido jajaja, aun falta lo de bin, oct y hex, 
y digamos q hay q poner muchas expeciones y ahorita esta bastante limitada la calculadora, pero pues hice
esto mas bien para q entendieras mejor como funcionaba todo este cuento de js, ya lo proximo lo podemos hacer 
juntos si quieres, y ya se te va a hacer mas facil pq pues esta es la base psd: te amo<3*/