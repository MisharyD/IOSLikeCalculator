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
        button.addEventListener("click",changeNbPointBackground);
    })

    operators = document.querySelectorAll(".op");
    operators.forEach(function(button)
    {
        button.addEventListener("click",changeOp);
    })

    document.querySelector(".equal").addEventListener("click",equal);
    document.querySelector(".equal").addEventListener("click",changeEqualBackground);

    document.querySelector(".point").addEventListener("click",addPoint)
    document.querySelector(".point").addEventListener("click",changeNbPointBackground);
    document.querySelector(".point").disabled = true;

    document.querySelector(".negative").addEventListener("click",negative);
    document.querySelector(".negative").disabled = true;
    document.querySelector(".negative").addEventListener("click",changeResetNegativeUndoBackground);

    document.querySelector(".reset").addEventListener("click",reset);
    document.querySelector(".reset").addEventListener("click",changeResetNegativeUndoBackground);

    document.querySelector(".undo").addEventListener("click",undo);
    document.querySelector(".undo").addEventListener("click",changeResetNegativeUndoBackground);
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

        toggleUndoNegativePointButtons(false);
    }

    //if an an operator was already chosen and it is the 
    //first input after choosing the operator
    else if(currOperator != null && nb2 ==null)
    {
        displayedResult = number;
        nb2 = number
        removeOpGlow(false);
        toggleUndoNegativePointButtons(false);;
        //operator.unglow
    }

    //equal button was pressed
    else if(equalPressed)
    {
        equalPressed = false;

        nb1 = null;
        displayedResult = number;
        
        toggleUndoNegativePointButtons(true);
    }

    //if an operator was already choosen and and it is not
    //the first input after it was choosen
    else if(currOperator != null)
    {
        result = displayedResult + "" + number

        //this is needed when an undo happens and the only character remaining is a '0' 
        //therefore after adding another number it result a leading 0
        result = result.replace(/^0+/, '');

        displayedResult = result;
        nb2 = result;
    }
    
    //if an operator was not choosen and it is not the first input
    else if (nb1 == null && currOperator == null)
    {
        result = displayedResult + "" + number

        //this is needed when an undo happens and the only character remaining is a '0' 
        //therefore after adding another number it result a leading 0
        result = result.replace(/^0+/, '');
        
        displayedResult = result;
    }

    displayResults(displayedResult);
}

function changeOp(e)
{
    //if an operator was not choosen before
    if(nb1 == null && displayedResult != null)
    {
        nb1 = displayedResult;
        currOperator = e.target.innerText

        toggleUndoNegativePointButtons(true);
        e.target.classList.add("selected-operator");
    }

    //if equal was just pressed
    else if(nb1 != null && equalPressed)
    {
        equalPressed = false

        currOperator = e.target.value;
        e.target.classList.add("selected-operator");
    }

    // if an operator was choosen before, calculate the previuos number
    // using the choosen operator from before then change the operator
    else if(nb1 != null && nb2 != null)
    {
        nb1 = calc(parseFloat(nb1), parseFloat(nb2), currOperator);
        nb2 = null;
        currOperator = e.target.value;

        toggleUndoNegativePointButtons(true);
        e.target.classList.add("selected-operator");
        removeOpGlow(true);
        displayedResult = nb1;
    }

    //if second number was not yet choosen (wants to change the previously selected operator)
    else if(nb1 != null && currOperator != null)
    {
        currOperator = e.target.innerText;
        e.target.classList.add("selected-operator");
        
        removeOpGlow(true);
    }


    if(displayedResult != null)
        displayResults(displayedResult);
}

function removeOpGlow(keepNew) {
    let allOps = document.querySelectorAll(".op");

    //keep the glow of currently selected operator
    if(keepNew)
    {
        allOps.forEach(op => {
            let opClassList = op.classList;
            if (opClassList.contains("selected-operator") && op.innerText != currOperator)
                op.classList.remove("selected-operator");
        });
    }
    //remove any operator glow
    else
    {
        allOps.forEach(op => {
            let opClassList = op.classList;
            if (opClassList.contains("selected-operator"))
                op.classList.remove("selected-operator");
        });
    }
}

function changeNbPointBackground(e) 
{
    var button = e.target
    button.classList.add('temp-nb-background');

    setTimeout(function() 
    {
        button.classList.add('original-nb-background');  
        button.classList.remove('temp-nb-background');
    }, 200);
    button.classList.remove('original-nb-background');
}

function changeResetNegativeUndoBackground(e)
{
    var button = e.target
    button.classList.add('temp-ResetNegativeUndo-background');

    setTimeout(function() 
    {
        button.classList.add('original-ResetNegativeUndo-background');  
        button.classList.remove('temp-ResetNegativeUndo-background');
    }, 200);
    button.classList.remove('original-ResetNegativeUndo-background');
}

function changeEqualBackground(e)
{
    var button = e.target
    button.classList.add('temp-equal-background');

    setTimeout(function() 
    {
        button.classList.add('original-equal-background');  
        button.classList.remove('temp-equal-background');
    }, 200);
    button.classList.remove('original-equal-background');
}

function negative()
{
    resultArray = Array.from(displayedResult);

    //check if there is already a negative sign
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

function addPoint()
{
    //check if there is already a point
    if(!displayedResult.includes("."))
    {
        displayedResult += ".";

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
    {
        displayedResult = null;
        toggleUndoNegativePointButtons(true);
    }

    result = displayedResult == null? 0: displayedResult

    if(nb2 != null)
        nb2 = result;
    else if(nb1 != null)
        nb1 = result;
    displayResults(result);
}

function equal()
{
    if((nb1 != null && nb2 !=null))
    {
        nb1 = calc(parseFloat(nb1), parseFloat(nb2), currOperator);
        nb2 = null;
        displayedResult = nb1;
        currOperator = null;
        equalPressed = true;

        toggleUndoNegativePointButtons(true);
        removeOpGlow(false);
        displayResults(displayedResult);
    }
}

function reset()
{
    document.querySelector(".negative").disabled = true;
    document.querySelector(".undo").disabled = true;

    nb1 = null;
    nb2 = null;
    currOperator = null;
    displayedResult = null;
    equalPressed = false;
    removeOpGlow();

    displayResults(0);

}


function toggleUndoNegativePointButtons(toggleValue)
{
    if(toggleValue == true)
    {
        document.querySelector(".undo").disabled = true;
        document.querySelector(".negative").disabled = true;
        document.querySelector(".point").disabled = true;
    }
    else if(toggleValue == false)
    {
        document.querySelector(".undo").disabled = false;
        document.querySelector(".negative").disabled = false;
        document.querySelector(".point").disabled = false;
    }
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