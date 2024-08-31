const numbersTextArea = document.querySelector("#numbers");
const converters = document.querySelectorAll(".converter");

converters.forEach((converter) => {
  converter.addEventListener("click", () => {
    console.log(converter.textContent);
    const numbers = numbersTextArea.value.split("\n");

    const numbersFinal = numbers.filter((number) => number !== "");
    console.log(numbersFinal);
  });
});
