import { useState } from "react";
import "./styles.css";

function App() {
  const numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "<=", "0", "."];

  const [operandValue, setOperandValue] = useState("0");
  // const [operationSymbol, setOperationSymbol] = useState("")

  function setNumber(num) {
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
    setOperandValue(operandValue + operationString);

    // setOperationSymbol(operationString)
    console.log("operationString", operationString);
  };

  const clearScreen = () => {
    setOperandValue("0");
  };

  
  const splitOperandBySymbol = (operationSymbol) => {
    // splits left and right number by operation symbol
    const [str1, str2] = operandValue.split(operationSymbol);

    const num1 = parseFloat(str1);
    const num2 = parseFloat(str2);

    if (!num2) return [];

    console.log("num1", num1);
    console.log("num2", num2)

    //return an array of num1 and num2
    return [num1, num2];
  };

  function evaluate() {
    if (operandValue.includes("+")) {
      const nums = splitOperandBySymbol("+");

      setOperandValue((nums[0] + nums[1]).toString());
    }

    if (operandValue.includes("-")) {
      const nums = splitOperandBySymbol("-");

      setOperandValue((nums[0] - nums[1]).toString());
    }

    if (operandValue.includes("x")) {
      const nums = splitOperandBySymbol("x");

      setOperandValue((nums[0] * nums[1]).toString());
    }

    if (operandValue.includes("÷")) {
      const nums = splitOperandBySymbol("÷");

      setOperandValue((nums[0] / nums[1]).toString());
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
