
const nSelector = document.querySelectorAll(".button");
const screen = document.querySelector("#op");
const aux = document.querySelector("#screen")

nSelector.forEach(item => {
    item.addEventListener("click",(e) => {
        let clicked = e.target.textContent.trim();
        let op1;
        let op2;
        switch(clicked){
            case ("+"):
                if(aux.textContent === "0"){
                    op1 = operation(clicked);
                }
                else{
                    op1 = parseInt(aux.textContent.substring(0,aux.textContent.length - 1));
                    op2 = parseInt(screen.textContent);
                    sum(op1,op2)
                    op1 = result(aux.textContent,clicked);
                }
                return;
            case "-":
                if(aux.textContent === "0"){
                    op1 = operation(clicked);
                }
                else{
                    op1 = parseInt(aux.textContent.substring(0,aux.textContent.length - 1));
                    op2 = parseInt(screen.textContent);
                    rest(op1,op2)
                    op1 = result(aux.textContent,clicked);
                }
                return;
            case "*":
                break;
            case "/":
                break;
            case "=":
                break;
        }
        if(item.id === "c"){
            screen.textContent = "0";
            return;
        }
        if(screen.textContent === "0"){
            screen.textContent = clicked;
        }
        else{
            screen.textContent += clicked;
        }
    })

})

function operation(clicked){
    screen.textContent += clicked;
    op1 = parseInt(screen.textContent);
    aux.textContent = screen.textContent;
    screen.textContent = "0";
    return op1;
}

function sum(op1,op2){
    let suma = op1 + op2;
    aux.textContent = suma
}
function rest(op1,op2){
    let resta = op1 - op2;
    aux.textContent = resta
}
function result(au,clicked){
    aux.textContent += clicked;
    op1 = parseInt(au.substring(0,au.length - 1));
    screen.textContent = "0";
    return op1;
}