const calcButtons = document.querySelectorAll(".key-calc");
const calcInput = document.querySelector("#input");

function safeEval(expression) {
  // Only allow numbers and basic operators
  const validChars = /^[0-9+\-*/().\s]*$/;
  if (!validChars.test(expression)) {
    throw new Error("Invalid characters in expression");
  }

  // Use the Function constructor to create a function for calculation
  return Function('"use strict"; return (' + expression + ")")();
}

// Update your event listener
calcButtons.forEach(button => {
  button.addEventListener("click", e => {
    const buttonText = button.textContent.trim();

    if (button.hasAttribute("data-number")) {
      // Handle numbers and operators (based on data-number)
      const keyValue = e.target.dataset.number;
      calcInput.value += keyValue;
    } else {
      switch (buttonText) {
        case "C":
          calcInput.value = "";
          break;
        case "=":
          try {
            calcInput.value = safeEval(calcInput.value); // Use safeEval for calculation
          } catch (e) {
            calcInput.value = "Error";
          }
          break;
        default:
          // Handle other buttons like operators
          calcInput.value += buttonText;
          break;
      }
    }
  });
});
