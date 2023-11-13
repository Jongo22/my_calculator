import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

type OperationSymbol = "+" | "-" | "*" | "/" | ".";

function App() {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const [operandStr, setOperandStr] = useState("");

  const operationMap = {
    "+": true,
    "-": true,
    "*": true,
    "/": true,
    ".": true,
  };
  function setNumber(numStr: string) {
    setOperandStr(operandStr + numStr);
  }

  function getLastOperandChar() {
    const operandStrLength = operandStr.length;
    const lastSymbol = operandStr.substring(
      operandStrLength - 1,
      operandStrLength
    ) as OperationSymbol;

    return lastSymbol;
  }

  function setOperation(operationStr: string) {
    let newOperandStr = operandStr;
    const lastSymbol = getLastOperandChar();

    if (lastSymbol !== "." && operationStr === ".") {
      setOperandStr(newOperandStr + operationStr);
      return;
    }

    if (
      operandStr.includes("+") 
      operandStr.includes("-") 
      operandStr.includes("*") ||
      operandStr.includes("/")
    ) {
      evaluate();
      return;
    }

    if (operationMap[lastSymbol]) {
      newOperandStr = operandStr.substring(0, operandStr.length - 1);
    }

    setOperandStr(newOperandStr + operationStr);
  }

  function evaluate() {
    function extractNums(operationStr: string) {
      const [str1, str2] = operandStr.split(operationStr);
      const num1 = parseFloat(str1);
      const num2 = parseFloat(str2);

      if (!num2) return [];

      return [num1, num2];
    }

    if (operandStr.includes("+")) {
      const nums = extractNums("+");
      if (nums.length === 0) return;

      setOperandStr((nums[0] + nums[1]).toString());
    }

    if (operandStr.includes("-")) {
      const nums = extractNums("-");
      if (nums.length === 0) return;

      setOperandStr((nums[0] - nums[1]).toString());
    }

    if (operandStr.includes("*")) {
      const nums = extractNums("*");
      if (nums.length === 0) return;

      setOperandStr((nums[0] * nums[1]).toString());
    }

    if (operandStr.includes("/")) {
      const nums = extractNums("/");
      if (nums.length === 0) return;

      setOperandStr((nums[0] / nums[1]).toString());
    }
  }

  return (
    <>
      <p>total:</p>
      <p>Current value: {operandStr}</p>

      <div>
        {numbers.map((num) => (
          <button onClick={() => setNumber(num)}>{num}</button>
        ))}
      </div>

      <div>
        <button onClick={() => setOperation("+")}>+</button>
      </div>
      <div>
        <button onClick={() => setOperation("-")}>-</button>
      </div>
      <div>
        <button onClick={() => setOperation("*")}>*</button>
      </div>
      <div>
        <button onClick={() => setOperation("/")}>/</button>
      </div>
      <div>
        <button onClick={() => setOperation(".")}>.</button>
      </div>
      <div>
        <button onClick={() => setOperandStr("")}>CLEAR</button>
      </div>
      <div>
        <button onClick={() => evaluate()}>=</button>
      </div>
    </>
  );
}

export default App;