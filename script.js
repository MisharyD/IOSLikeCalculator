let nb1 = null;
let nb2 = null;
let operator = null;
let resultDiv;
document.addEventListener("DOMContentLoaded",init);

//add event listeners to buttons and disable operators
function init()
{
    document.querySelectorAll(".nb").forEach(function(button)
    {
        button.addEventListener("click",changeNb);
    })
    resultDiv = document.querySelector(".result-display");

    operators = document.querySelectorAll("")
}

function changeNb(e)
{
    
}

function display()
{

}

function calc(nb1, nb2, operator)
{
    switch(operator)
    {
        case "add":
            return add(nb1,nb2);
        case "sub":
            return subtract(nb1,nb2);
        case "multiply":
            return multiply(nb1,nb2);
        case "divide":
            return divide(nb1, nb2);
    }
}

function add(nb1, nb2)
{
    return nb1 + nb2;
}

function subtract(nb1, nb2)
{
    return nb1-nb2;
}

function multiply(nb1, nb2)
{
    return nb1*nb2;
}

function divide(nb1, nb2)
{
    return nb1/nb2;
}