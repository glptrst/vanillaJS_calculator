"use strict";
window.onload = function () {
    var totalString = "0";
    var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var operators = ["/", "*", "+", "-"];
    //flag to check if "=" has been the last input; If so the screen has to be cleared before inserting new characters.
    var equalFlag = false;
    //get final result turning totalString into its evaluation
    function getResult() {
        // old easy method
        //totalString = String(eval(totalString));
        
        //without eval
        //            I cast to string in order to resize
        totalString = String(calculate(parseCalculationString(totalString)));
    }
    //Update screen
    function update() {
        var screen = document.getElementById("steps");

        screen.innerHTML = totalString;

        //adapt font-size
        if (totalString.length <= 10)
            screen.setAttribute("style", "font-size: 50px");
        else if (totalString.length > 10 && totalString.length <= 75)
            screen.setAttribute("style", "font-size: 20px");
        else if (totalString.length > 75)
            screen.setAttribute("style", "font-size: 15px");
    }
    //manage input received
    function getValue(input) {
        if (input === "=") { //if it's the equal sign
            equalFlag = true;
            console.log("getting result...");
            getResult();
            console.log(totalString);
            update();
        } else if (input == "AC"){ 
            equalFlag = false;
            totalString = "0";
            update();
        } else if (input === "CE") {
            if (totalString === "0") {
                ; //do nothing
            } else {
                totalString = totalString.slice(0, totalString.length-1);
                update();
            }
        }else if (input === "."){
            //Puttin a dot after a dot or after an operator is not allowed
            if ( (totalString[totalString.length-1] === ".") || (operators.includes(totalString[totalString.length-1]) === true) ) {
                ;//do nothing
            } else {
                totalString += input; 
                update();
            }
        }else if (numbers.includes(input) === true) { //if input is a num 
            if (totalString === "0" || equalFlag === true) { //if the screen shows just one zero or the result of an operation
                totalString = input;                         //clear the screen before pushing characters
                update();
                equalFlag = false;
            } else {
                //update totalString
                totalString +=  input;
                //show into the screen
                update();
            }
        } else if (operators.includes(input) === true) { //if input is an operator 
            if ((operators.includes(totalString[totalString.length-1]) === true) || totalString[totalString.length-1] === "." || equalFlag === true) { //if last char is another operator or a dot or the screen is showing a result
                ;//do nothing
            } else {
                totalString +=  input;
                //show into the screen
                update();
            }
        }
    }
    //call getValue with the right arg when a button is clicked
    //(I use an IIFE to not pollute the scope with i)
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
