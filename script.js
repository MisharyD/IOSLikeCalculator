
function operator(nb1, nb2, operator)
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