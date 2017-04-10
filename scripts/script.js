window.onload = function () {
    var totalString = "";
    var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var operators = ["/", "*", "+", "-"];
    //get final result turning totalString into its evaluation
    function getResult() {
        totalString = eval(totalString);
    }
    //Update screen
    function update() {
        var screen = document.getElementById("steps");
        screen.innerHTML = totalString;
    }
    //manage input received
    function getValue(input) {
        if (input === "=") { //if it's the equal sign
            console.log("getting result...");
            getResult();
            console.log(totalString);
            update();
        } else if (input == "AC"){ 
            totalString = "0";
            update();
        } else if (input === "Back") {
            totalString = totalString.slice(0, totalString.length-1);
            update();
        }else if ( (numbers.includes(input) === true) ||  (operators.includes(input) === true) || input == ".") { //if it's a num or an operator
            if (totalString.length === 1 && totalString[0] === "0") {
                totalString = input;
                update();
            } else {
                //update totalString
                totalString +=  input;
                //show into the screen
                update();
            }
        }
    }
    //call getValue with the right arg when a button is clicked
    var buttons = document.getElementsByClassName("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function whenclicked(){
            console.log(this.id);
            getValue(this.id);
        });
    }
};
