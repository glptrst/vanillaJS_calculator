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
        if (input === "=") {
            console.log("getting result...");
            getResult();
            console.log(totalString);
            update();
        }
        //if input is a number or a operator
        if ( (numbers.includes(input) === true) ||  (operators.includes(input) === true) || input == ".") {
            //update totalString
            totalString +=  input;
            //show into the screen
            update();
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
