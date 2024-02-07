import { useState } from "react";
import "./styles.css";

function App() {
  const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "<=", "0", "."];

  const [operandValue, setOperandValue] = useState("0");
  // const [operationSymbol, setOperationSymbol] = useState("")

  function setNumber(num) {
    
    if (operandValue.includes(".") && num === ".") {
      return;
    }

    if (operandValue[operandValue.length - 1] === "." && num === ".") {
      return;
    }
    setOperandValue(operandValue + num);

    if (operandValue === "." && num === ".") {
      setOperandValue(".");
    }

    if (operandValue === "0" && num === "0") {
      setOperandValue("0");
    }

    if (operandValue === "0") {
      setOperandValue(num);
    }
  }

  const setOperation = (operationString) => {
    if (
      operandValue[operandValue.length - 1] === "+" ||
      operandValue[operandValue.length - 1] === "-" ||
      operandValue[operandValue.length - 1] === "x" ||
      operandValue[operandValue.length - 1] === "÷"
    ) {
      console.log(operationString);
      return;
    }

    if (operandValue === "0" && operationString === "-") {
      console.log("operationString", operationString);
      setOperandValue(operationString + operandValue);
    } else {
      setOperandValue(operandValue + operationString);
    }

    console.log("operandValue", operandValue[operandValue.length - 1]);

    if (
      operandValue.includes("+") ||
      operandValue.includes("-") ||
      operandValue.includes("x") ||
      operandValue.includes("÷")
    ) {
      evaluate();

      console.log("operandValue", operandValue);
    }
  };

  const clearScreen = () => {
    setOperandValue("0");
  };

  const splitOperandBySymbol = (operationSymbol) => {

    if (operationSymbol === "-") {

    }
    // splits left and right number by operation symbol
    const [str1, str2] = operandValue.split(operationSymbol);

    const num1 = parseFloat(str1);
    const num2 = parseFloat(str2);

    if (!num2) return [];

    console.log("num1", num1);
    console.log("num2", num2);

    //return an array of num1 and num2
    return [num1, num2];
  };

  function evaluate() {
    if (operandValue.includes("+")) {
      const nums = splitOperandBySymbol("+");

      let total = (nums[0] + nums[1]).toFixed(2).toString();
      setOperandValue(total);
    }

    if (operandValue.includes("-")) {
      const nums = splitOperandBySymbol("-");

      let total = (nums[0] - nums[1]).toFixed(2).toString();
      setOperandValue(total);
    }

    if (operandValue.includes("x")) {
      const nums = splitOperandBySymbol("x");

      let total = (nums[0] * nums[1]).toFixed(2).toString();
      setOperandValue(total);
    }

    if (operandValue.includes("÷")) {
      const nums = splitOperandBySymbol("÷");

      let total = (nums[0] / nums[1]).toFixed(2).toString();
      setOperandValue(total);
    }
  }
  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="calculator-screen">{operandValue}</div>
        <div className="button-container">
          <div className="number-btn-container">
            {numbers.map((num) => (
              <button
                className="number-buttons"
                key={num}
                onClick={() => {
                  setNumber(num);
                }}
              >
                {num}
              </button>
            ))}
            <button className="backspace-button" onClick={clearScreen}>
              {" "}
              CLEAR
            </button>
          </div>
          <div className="operation-buttons-container">
            <button
              className="operation-buttons"
              onClick={() => {
                setOperation("+");
              }}
            >
              +
            </button>
            <button
              className="operation-buttons"
              onClick={() => {
                setOperation("-");
              }}
            >
              -
            </button>
            <button
              className="operation-buttons"
              onClick={() => {
                setOperation("x");
              }}
            >
              x
            </button>
            <button
              className="operation-buttons"
              onClick={() => {
                setOperation("÷");
              }}
            >
              ÷
            </button>
            <button
              className="operation-buttons"
              onClick={() => {
                evaluate();
              }}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;