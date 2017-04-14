"use strict";
window.onload = function () {

    var totalString = "0";
    var lastInput = "0";
    var entryScreen = "0";

    var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var operators = ["/", "*", "+", "-"];

    //get final result turning totalString into its evaluation (without using eval)
    function getResult() {
        //            I cast to string in order to resize
        entryScreen = String(calculate(parseCalculationString(totalString)));
        totalString = String(calculate(parseCalculationString(totalString)));
    }
    //Update screen
    function update() {
        //put totalString into screen
        var screen = document.getElementById("steps");
        screen.innerHTML = entryScreen;

        //adapt font-size
        if (totalString.length <= 10)
            screen.setAttribute("style", "font-size: 50px");
        else if (totalString.length > 10 && totalString.length <= 75)
            screen.setAttribute("style", "font-size: 20px");
        else if (totalString.length > 75)
            screen.setAttribute("style", "font-size: 15px");
    }
    // manage input received
    function getValue(input) {
        // if input is a number
        if (numbers.includes(input) === true) { 
            // if last input is a number or "."
            if (numbers.includes(lastInput) === true || lastInput === ".") {
                totalString += input; 
                entryScreen += input;
                lastInput = input;
                update();
            }
            // if last input is an operator
            else if (operators.includes(lastInput) === true) {
                totalString += input;
                entryScreen = input;
                lastInput = input;
                update();
            }
            // if last input was equal sign
            else if (lastInput === "=") {
                totalString = input; 
                entryScreen = input;
                lastInput = input;
                update();
            }
            // if last input was AC
            else if (lastInput === "AC") {
                totalString += input; 
                entryScreen += input;
                lastInput = input;
                update();
            }
            // if last input was CE
            else if (lastInput === "CE") {
                //TODO
            }
        }
        // if input is an operator
        else if (operators.includes(input) === true) {
            // if last input was a number or "."
            if (numbers.includes(lastInput) === true || lastInput === ".") {
                totalString += input;
                lastInput = input;
                update();
            }
            // if last input was an operator
            else if (operators.includes(lastInput) === true) {
                ;//do nothing
            }
            // if last input was equal sign
            else if (lastInput === "=") {
                //use last results as first entry
                totalString += input;
                lastInput = input;
            }
            // if last input was AC
            else if (lastInput === "AC") {
                totalString += input;
                lastInput = input;
                update();
            }
            // if last input was CE
            else if (lastInput === "CE") {
                //TODO
            }
        }
        // if input is equal sign
        else if (input === "=") {
            // if last input was a number
            if (numbers.includes(lastInput) === true) {
                getResult();
                lastInput = input;
                update();
            }
            //if last it input is "."
            else if (lastInput === ".") {
                ;//do nothing
            }
            // if last input was an operator
            else if (operators.includes(lastInput) === true) {
                ;//do  nothing
            }
            // if last input was equal sign
            else if (lastInput === "=") {
                ;//do nothing
            }
            // if last input was AC
            else if (lastInput === "AC") {
                ;//do nothing
            }
            // if last input was CE
            else if (lastInput === "CE") {
                //TODO
            }
        }
        // if input is AC
        else if (input === "AC") {
            totalString = "0";
            entryScreen = "0";
            lastInput = input;
            update();
        }
        // if input is CE
        else if (input === "CE") {
            // TODO 
        }
    }

    //call getValue with the right arg when a button is clicked
    //(I use an IIFE to not pollute the scope)
    (function () {    
        var buttons = document.getElementsByClassName("button");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", function whenclicked(){
                console.log(this.id);
                getValue(this.id);
            });
        }
    })();
   

//----------------------------------------------------------------------------------------------   
//Code to avoid using eval; taken from:
//http://stackoverflow.com/questions/32292231/how-to-code-a-calculator-in-javascript-without-eval
    function parseCalculationString(s) {
    // --- Parse a calculation string into an array of numbers and operators
    var calculation = [],
        current = '';
    for (var i = 0, ch; ch = s.charAt(i); i++) {
        if ('^*/+-'.indexOf(ch) > -1) {
            if (current == '' && ch == '-') {
                current = '-';
            } else {
                calculation.push(new Decimal(current), ch);
                current = '';
            }
        } else {
            current += s.charAt(i);
        }
    }
    if (current != '') {
        calculation.push(new Decimal(current));
    }
    return calculation;
}

function calculate(calc) {
    // --- Perform a calculation expressed as an array of operators and numbers
    var ops = [{'^': (a, b) => a.pow(b)},
    	{'*': (a, b) => a.mul(b), '/': (a, b) => a.div(b)},
        {'+': (a, b) => a.add(b), '-': (a, b) => a.sub(b)}],
        newCalc = [],
        currentOp;
    for (var i = 0; i < ops.length; i++) {
        for (var j = 0; j < calc.length; j++) {
            if (ops[i][calc[j]]) {
                currentOp = ops[i][calc[j]];
            } else if (currentOp) {
                newCalc[newCalc.length - 1] = currentOp(newCalc[newCalc.length - 1], calc[j]);
                currentOp = null;
            } else {
                newCalc.push(calc[j]);
            }
        }
        calc = newCalc;
        newCalc = [];
    }
    if (calc.length > 1) {
        console.log('Error: unable to resolve calculation');
        return calc;
    } else {
        return calc[0];
    }
}
//end of code take from stackoverflow
//---------------------------------------------------------------------------------------------

};
