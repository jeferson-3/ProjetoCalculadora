
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class calc {
  constructor(previousOperationText, currentOperationText ){
  this.previousOperationText = previousOperationText;
  this.currentOperationText = currentOperationText;
  currentOperationText = "";
  }

  // add digit to calculator screen
addDigit(digit) {

  //check if current operation already has a dot
  if(digit === "." && this.currentOperationText.innerText.includes(".")){
    return;
  }


  this.currentOperation = digit;
  this.updateScreen();
  }

  // Process all calculator operation
  processOperation(operation){

    //check if current is empty
    if(this.currentOperationText.innerText === "" && operation !== "C") { 

      // change operation
      if(this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }
        // Get current an previuos value
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
      break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
      break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
      break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
      break;
      case "DEL":
        this.processDelOperation();
      break;
      case "CE":
        this.precessClearOperation();
      break;
      case "C":
        this.precessClearAllOperation();
      break;
      case "=":
        this.precessIqualOperation();
      break;
      default:
      return;
    }
  }

  // Change value of the calculator screen
  updateScreen(
    operationValue = null, 
    operation = null,
    current = null, 
    previous = null){
      console.log(operationValue, operation, current, previous)
      if(operationValue === null){
        this.currentOperationText.innerText +=this.currentOperation;
      } else{
        // Check if value is zero, if it is just add current value
        if(previous === 0){
          operationValue = current;
        }
        // Add current value to previous
        this.previousOperationText.innerText = `${operationValue} ${operation}`;
        this.currentOperationText.innerText = "";
      }
  }

  // change math operation
  changeOperation(operation) {
    const mathOperations = ["*", "/",  "+", "-"]

    if(!mathOperations.includes(operation)) {
      return
    }
    this.previousOperationText.innerText = 
    this.previousOperationText.innerText.slice(0, -1) + operation;

  }

  // Delete the last digit
  processDelOperation(){
    this.currentOperationText.innerText =
    this.currentOperationText.innerText.slice(0, -1);
  }

  // clear operation
  precessClearOperation() {
    this.currentOperationText.innerText = "";
  }

  //
  precessClearAllOperation() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }
  precessIqualOperation() {
    const operation = previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }

}


const cal = new calc(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if(+value >= 0 || value === "."){
       cal.addDigit(value);
    }else {
      cal.processOperation(value);
    }

  });
});