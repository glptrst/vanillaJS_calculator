"use strict";
window.onload = function () {
    var totalString = '0'; // Total chain of operations to be calculated
    var lastInput = '0';
    var entryScreen = '0'; // What has to appear onto the screen

    var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var operators = ['/', '*', '+', '-'];

    var screenWidth = 350; //standard width. (check ../styles/style.css)
    var entryScreenTextSize = 50; //standard font size. (check ../styles/style.css)

    var screen = document.getElementById('steps');

    //Get final result turning totalString into its evaluation (without using eval)
    function getResult() {
        //            I cast to String in order to resize
        totalString = String(calculate(parseCalculationString(totalString)));
        entryScreen = totalString;
    }
    //Update screen with the value of entryScreen and resize text if necessary
    function update() {
        screen.innerHTML = entryScreen;

        // Resize entryScreen if it's too big for the screen
        // To do this I use the Range Object 
        // The insight comes from: http://stackoverflow.com/questions/16209153/how-to-get-the-position-and-size-of-a-html-text-node-using-javascript  
        var range = document.createRange(); 
        var textNode = screen.firstChild;
        range.selectNodeContents(textNode);
        var rects = range.getClientRects(); // Range.getClientRects is still an experimental API though. Alternatives?
        var entryScreenWidth = rects[0].width;

        if (entryScreenWidth > screenWidth-10) {
            while (entryScreenWidth > screenWidth-10) {
                entryScreenTextSize -= 2; 
                screen.setAttribute('style', 'font-size: ' + entryScreenTextSize + 'px');
                range.selectNodeContents(textNode);
                rects = range.getClientRects();
                entryScreenWidth = rects[0].width;
            }
        }
    }

    // Manage input received
    function getValue(input) {
        // If input is a number
        if (numbers.includes(input) === true) { 
            // If last input is a number or '.'
            if (numbers.includes(lastInput) === true || lastInput === '.') {
                // If it is the first operation overwrite the first zero 
                if (totalString === '0') {
                    totalString = input; 
                    entryScreen = input;
                    lastInput = input;
                    update();
                } else {
                    totalString += input; 
                    entryScreen += input;
                    lastInput = input;
                    update();
                }
            }
            // If last input is an operator
            else if (operators.includes(lastInput) === true) {
                totalString += input;
                entryScreen = input;
                // bring to normal font-size (since we are starting again from one digit)
                entryScreenTextSize = 50;
                screen.setAttribute('style', 'font-size: ' + entryScreenTextSize + 'px');
                lastInput = input;
                update();
            }
            // If last input was equal sign
            else if (lastInput === '=') {
                totalString = input; 
                entryScreen = input;
                lastInput = input;
                update();
            }
            // If last input was AC
            else if (lastInput === 'AC') {
                totalString = input; 
                entryScreen = input;
                lastInput = input;
                update();
            }
        }
        // If input is '.'
        else if (input === '.') {
            // If last input was a number
            if (numbers.includes(lastInput) === true) {
                if (entryScreen.indexOf('.') !== -1) { // If '.' has already been used in the current entry
                    ;// Do nothing
                } else {
                    totalString += input;
                    entryScreen += input;
                    lastInput = input;
                    update();
                }
            }
            // If last it input is '.'
            else if (lastInput === '.') {
                ;// Do nothing
            }
            // If last input was an operator
            else if (operators.includes(lastInput) === true) {
                ;// Do  nothing
            }
            // If last input was equal sign
            else if (lastInput === '=') {
                ;// Do nothing
            }
            // If last input was AC
            else if (lastInput === 'AC') {
                // In this case totalString and entryScren would be equal to "0"
                // so we put the dot after the 0
                totalString += input; 
                entryScreen += input;
                lastInput = input;
                update();
            }
        }
        // If input is an operator
        else if (operators.includes(input) === true) {
            // If last input was a number
            if (numbers.includes(lastInput) === true) {
                // Show result of previous calculation (if there is only a number then itself will be the result)
                getResult(); 
                totalString += input;
                lastInput = input;
                update();
            }
            // If last input was '.'
            if (lastInput === '.') {
                ; // Do nothing
            }
            // If last input was an operator
            else if (operators.includes(lastInput) === true) {
                ; // Do nothing
            }
            // If last input was equal sign
            else if (lastInput === '=') {
                // Use last result as first entry
                totalString += input;
                lastInput = input;
            }
            // If last input was AC
            else if (lastInput === 'AC') {
                totalString += input;
                lastInput = input;
                update();
            }
        }
        // If input is equal sign
        else if (input === '=') {
            // If last input was a number
            if (numbers.includes(lastInput) === true) {
                getResult();
                lastInput = input;
                update();
            }
            // If last it input is '.'
            else if (lastInput === '.') {
                ; // Do nothing
            }
            // if last input was an operator
            else if (operators.includes(lastInput) === true) {
                ; // Do  nothing
            }
            // if last input was equal sign
            else if (lastInput === '=') {
                ; // Do nothing
            }
            // if last input was AC
            else if (lastInput === 'AC') {
                ; //Do nothing
            }
        }
        // If input is AC
        else if (input === 'AC') {
            totalString = '0';
            // Bring to normal font size
            entryScreenTextSize = 50;
            screen.setAttribute('style', 'font-size: ' + entryScreenTextSize + 'px');
            entryScreen = '0';
            lastInput = input;
            update();
        }
        // If input is CE
        else if (input === 'CE') {
            // If last input was a number
            if (numbers.includes(lastInput) === true || lastInput === '.') {

                // Curn screen into '0' and bring to normal font-size
                entryScreenTextSize = 50;
                screen.setAttribute('style', 'font-size: ' + entryScreenTextSize + 'px');
                entryScreen = '0';
                update();

                // Cut last entry from totalString (if it is the first entry just bring everything to '0')
                var indexes = operators.map(function(operator) {
                    return totalString.lastIndexOf(operator);
                });
                if (indexes[0] === -1 && indexes[1] === -1 && indexes[2] === -1 && indexes[3] === -1) { // if there are no operators (it is the first entry)
                   totalString = '0'
                   lastInput = '0';
                } else {
                    var lastOperatorIndex = Math.max.apply(null, indexes);
                    totalString = totalString.slice(0, lastOperatorIndex+1);
                    // Set lastInput to last char in the totalString
                    lastInput = totalString[totalString.length-1];
                } 
            }
            // If last input was an operator
            else if (operators.includes(lastInput) === true) {
                ;//Do  nothing
            }
            // If last input was equal sign
            else if (lastInput === '=') {
                ;//Do nothing
            }
            // If last input was AC
            else if (lastInput === 'AC') {
                ;//Do nothing
            }
        }
    }

    //Call getValue with the right arg when a button is clicked
    (function () {    
        var buttons = document.getElementsByClassName('button');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function whenclicked(){
                getValue(this.id);
            });
        }
    })();
    //Do the same when a key is pressed
    window.addEventListener('keydown', function(event) {
        if (event.key === 'a') {
            event.preventDefault(); //prevent the key to do something else
            getValue('AC');
        } else if (event.key === 'e') {
            event.preventDefault();
            getValue('CE'); 
        }else if (event.key === '/') { 
            event.preventDefault(); 
            getValue(event.key);
        } else if (event.key === 'Enter') { // Make Enter act as '='
            event.preventDefault();
            getValue('=');
        } else {
            getValue(event.key);
        }
    });
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
//End of code taken from stackoverflow
//---------------------------------------------------------------------------------------------

};
