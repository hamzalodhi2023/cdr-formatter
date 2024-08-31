// Select DOM elements
const numbersTextArea = document.querySelector("#numbers");
const converters = document.querySelectorAll(".converter");
const network = document.querySelector("#network");
const output = document.querySelector("#output");
const outputDiv = document.querySelector(".display-none");

const mobile_count = document.querySelector("#mbl-count");
const mobile_nums = document.querySelector("#mbl-nums");

const from = document.querySelector("#from");
const to = document.querySelector("#to");

const telenor = document.querySelector("#telenor");
const mobilink = document.querySelector("#mobilink");
const zong = document.querySelector("#zong");
const ufone = document.querySelector("#ufone");
let numbersFinal;

// Function to format date string
function dateFormatter(date, separator, first = 2, second = 1, third = 0) {
  let splittedDate = date.split("-");
  let formattedDate =
    splittedDate[first] +
    separator +
    splittedDate[second] +
    separator +
    splittedDate[third];

  return formattedDate;
}

// Add click event listeners to converter buttons
converters.forEach((converter) => {
  converter.addEventListener("click", () => {
    if (numbersTextArea.value === "") {
      alert("Please enter mobile numbers!");
      return;
    }

    outputDiv.classList.remove("display-none");
    // Clear previous results
    mobile_nums.innerHTML = "";
    network.textContent = "";
    mobile_count.textContent = "";
    output.innerHTML = "";

    // Process input numbers
    const numbers = numbersTextArea.value.split("\n");
    const trimmedNums = numbers.map((number) => number.trim());

    numbersFinal = trimmedNums.filter((number) => number !== "");
    network.textContent = converter.textContent;
    mobile_count.textContent = numbersFinal.length;

    // Display processed numbers
    numbersFinal.forEach((num, index) => {
      let number = index + 1 + ". " + num + "<br>";
      mobile_nums.innerHTML += number;
    });
  });
});

// Telenor converter
telenor.addEventListener("click", () => {
  if (numbersTextArea === "") {
    alert("Please enter numbers");
    return;
  }

  let csv = numbersFinal.reduce((total, num) => {
    return num + "," + total;
  });
  let telenorString = "tps:" + csv + ":";
  output.innerHTML = telenorString;
});

// Mobilink converter
mobilink.addEventListener("click", () => {
  if (numbersTextArea === "") {
    alert("Please enter numbers");
    return;
  }

  if (from.value === "" || to.value === "") {
    alert("Please enter date range!");
    return;
  }
  let ssv = numbersFinal.reduce((total, num) => {
    return num + ";" + total;
  });

  let mobilinkString =
    "A;" +
    ssv +
    ";" +
    dateFormatter(from.value, "/") +
    ";" +
    dateFormatter(to.value, "/") +
    ";";
  output.innerHTML = mobilinkString;
});

// Zong converter
zong.addEventListener("click", () => {
  if (numbersTextArea === "") {
    alert("Please enter numbers");
    return;
  }
  if (from.value === "" || to.value === "") {
    alert("Please enter date range!");
    return;
  }
  let csv = numbersFinal.reduce((total, num) => {
    return num + ", " + total;
  });
  let zongString =
    csv +
    " CALL & SMS Detailed Record " +
    dateFormatter(from.value, "-") +
    " TO " +
    dateFormatter(to.value, "-");
  output.innerHTML = zongString;
});

// Ufone converter
ufone.addEventListener("click", () => {
  if (numbersTextArea === "") {
    alert("Please enter numbers");
    return;
  }
  if (from.value === "" || to.value === "") {
    alert("Please enter date range!");
    return;
  }
  let csv = numbersFinal.reduce((total, num) => {
    return num + ":" + total;
  });

  const ufoneString =
    "MSISDN|" +
    (numbersFinal.length > 1 ? "BOTH" : "ALL") +
    "|" +
    dateFormatter(from.value, "/", 1, 2, 0) +
    "|" +
    dateFormatter(to.value, "/", 1, 2, 0) +
    "|" +
    csv;
  output.innerHTML = ufoneString;
});
