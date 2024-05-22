let nb1 = null;
let nb2 = null;
let currOperator = null;
let displayedResult = null;
let equalPressed = false;

let operators = document.querySelectorAll(".op");
let nbs = document.querySelectorAll(".nb");
let resultDiv;
document.addEventListener("DOMContentLoaded",init);

//add event listeners to buttons and disable operators
function init()
{
    nbs = document.querySelectorAll(".nb")
    nbs.forEach(function(button)
    {
        button.addEventListener("click",changeNb);
    })

    operators = document.querySelectorAll(".op");
    operators.forEach(function(button)
    {
        button.addEventListener("click",changeOp);
    })

    document.querySelector(".equal").addEventListener("click",equal);

    document.querySelector(".negative").addEventListener("click",negative);
    document.querySelector(".negative").disabled = true;

    document.querySelector(".reset").addEventListener("click",reset);

    document.querySelector(".undo").addEventListener("click",undo);
    document.querySelector(".undo").disabled = true;

    resultDiv = document.querySelector(".result-display");

}

function changeNb(e)
{
    number = e.target.value;

    //if this is the first input
    if(displayedResult == null)
    {
        displayedResult = number;
        operators.forEach(function(button)
        {
            button.disabled = false;
        })

        document.querySelector(".undo").disabled = false;
        document.querySelector(".negative").disabled = false;
    }

    //if an an operator was already chosen and it is the 
    //first input after choosing the operator
    else if(currOperator != null && nb2 ==null)
    {
        displayedResult = number;
        nb2 = number

        document.querySelector(".undo").disabled = false;
        document.querySelector(".negative").disabled = false;
        operators.forEach(function(button)
        {
            button.addEventListener("click",changeOp);
            button.disabled = false;
        })
        //operator.unglow
    }

    //equal button was pressed
    else if(equalPressed)
    {
        equalPressed = false;

        nb1 = null;
        displayedResult = number;

        document.querySelector(".undo").disabled = false;
        document.querySelector(".negative").disabled = false;
    }

    //if an operator was already choosen and and it is not
    //the first input after it was choosen
    else if(currOperator != null)
    {
        displayedResult += "" + number;
        nb2 += "" + number;
    }
    
    //if an operator was not choosen and it is not the 
    //first input
    else if (nb1 == null && currOperator == null)
        displayedResult += "" + number;

    displayResults(displayedResult);
}

function changeOp(e)
{
    //if an operator was not choosen before
    if(nb1 == null && displayedResult != null)
    {
        nb1 = displayedResult;
        currOperator = e.target.innerText

        document.querySelector(".undo").disabled = true;
        document.querySelector(".negative").disabled = true;
        operators.forEach(function(button)
        {
            button.addEventListener("click",changeOp);
            button.disabled = true;
        })
        //operator.glow
    }

    //if equal was just pressed
    else if(nb1 != null && equalPressed)
    {
        equalPressed = false

        currOperator = e.target.value;
        //new operator.glow
    }

    // if an operator was choosen before, calculate the previuos number
    // using the choosen operator from before then change the operator
    else if(nb1 != null && nb2 != null)
    {
        nb1 = calc(parseInt(nb1), parseInt(nb2), currOperator);
        nb2 = null;
        currOperator = e.target.value;

        document.querySelector(".undo").disabled = true;
        document.querySelector(".negative").disabled = true;
        //new operator.glow
        //oldoperator.unglow
        displayedResult = nb1;
    }

    if(displayedResult != null)
        displayResults(displayedResult);
}

function negative()
{
    resultArray = Array.from(displayedResult);
    console.log(resultArray)
    if(resultArray[0] != ("-"))
    {
        resultArray.unshift("-")
        displayedResult = resultArray.join("");

        if(nb2 != null)
            nb2 = displayedResult;
        else if(nb1 != null)
            nb1 = displayedResult;
        displayResults(displayedResult);
    }
        

}

function undo()
{
    displayedResult = displayedResult.toString().slice(0, -1);
    if(displayedResult == "" || isNaN(displayedResult) )
        displayedResult = 0;

    if(nb2 != null)
        nb2 = displayedResult;
    else if(nb1 != null)
        nb1 = displayedResult;
    displayResults(displayedResult);
}

function equal()
{
    if((nb1 != null && nb2 !=null))
    {
        nb1 = calc(parseInt(nb1), parseInt(nb2), currOperator);
        nb2 = null;
        displayedResult = nb1;
        currOperator = null;
        equalPressed = true;

        document.querySelector(".undo").disabled = true;
        document.querySelector(".negative").disabled = true;

        displayResults(displayedResult);
    }
}

function reset()
{
    nb1 = null;
    nb2 = null;
    currOperator = null;
    displayedResult = null;
    displayResults(0);
}

function displayResults(result)
{
    resultDiv.innerHTML = result; 
}

function calc(nb1, nb2, currOperator)
{
    switch(currOperator)
    {
        case "+":
            return add(nb1,nb2);
        case "-":
            return subtract(nb1,nb2);
        case "x":
            return multiply(nb1,nb2);
        case "÷":
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