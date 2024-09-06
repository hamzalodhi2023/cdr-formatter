// Select DOM elements
const numbersTextArea = document.querySelector("#numbers"); // Input textarea for mobile numbers
const converters = document.querySelectorAll(".converter"); // Converter buttons
const network = document.querySelector("#network"); // Element to display selected network
const output = document.querySelector("#output"); // Output element for converted numbers
const outputDiv = document.querySelector(".display-none"); // Output container (initially hidden)

const mobile_count = document.querySelector("#mbl-count"); // Element to display count of mobile numbers
const mobile_nums = document.querySelector("#mbl-nums"); // Element to display list of mobile numbers

const from = document.querySelector("#from"); // Input for start date
const to = document.querySelector("#to"); // Input for end date

const telenor = document.querySelector("#telenor"); // Telenor converter button
const mobilink = document.querySelector("#mobilink"); // Mobilink converter button
const zong = document.querySelector("#zong"); // Zong converter button
const ufone = document.querySelector("#ufone"); // Ufone converter button
const copyBtn = document.querySelector(".copy"); // Copy button
let numbersFinal; // Array to store processed mobile numbers

/**
 * Formats a date string into a custom format
 * @param {string} date - The date string in "YYYY-MM-DD" format
 * @param {string} separator - The separator to use between date components
 * @param {number} first - Index of the first date component (0: year, 1: month, 2: day)
 * @param {number} second - Index of the second date component
 * @param {number} third - Index of the third date component
 * @returns {string} The formatted date string
 */
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
    // Check if the input textarea is empty
    if (numbersTextArea.value === "") {
      alert("Please enter mobile numbers!");
      return;
    }

    // Show the output div
    outputDiv.classList.remove("display-none");
    // Clear previous results
    mobile_nums.innerHTML = "";
    network.textContent = "";
    mobile_count.textContent = "";
    output.innerHTML = "";

    // Process input numbers
    const numbers = numbersTextArea.value.split("\n");
    const trimmedNums = numbers.map((number) => number.trim());

    // Filter out empty lines and store the result
    numbersFinal = trimmedNums.filter((number) => number !== "");
    // Display the selected network
    network.textContent = converter.textContent;
    // Display the count of valid numbers
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
  // Check if the input textarea is empty
  if (numbersTextArea === "") {
    alert("Please enter numbers");
    return;
  }

  // Create a comma-separated string of numbers
  let csv = numbersFinal.reduce((total, num) => {
    return num + "," + total;
  });
  // Format the string for Telenor
  let telenorString =
    "tpn:" +
    csv +
    ":" +
    dateFormatter(from.value, "-") +
    ":" +
    dateFormatter(to.value, "-") +
    ":";
  output.innerHTML = telenorString;
});

// Mobilink converter
mobilink.addEventListener("click", () => {
  // Check if the input textarea is empty
  if (numbersTextArea === "") {
    alert("Please enter numbers");
    return;
  }

  // Check if date range is provided
  if (from.value === "" || to.value === "") {
    alert("Please enter date range!");
    return;
  }
  // Create an array of formatted strings for each number
  let ssv = numbersFinal.map((num) => {
    return (
      "A;" +
      num +
      ";" +
      dateFormatter(from.value, "/") +
      ";" +
      dateFormatter(to.value, "/") +
      ";"
    );
  });

  // Join the formatted strings with line breaks
  let mobilinkString = ssv.reduce((total, num) => {
    return num + "<br>" + total;
  });

  output.innerHTML = mobilinkString;
});

// Zong converter
zong.addEventListener("click", () => {
  // Check if the input textarea is empty
  if (numbersTextArea === "") {
    alert("Please enter numbers");
    return;
  }
  // Check if date range is provided
  if (from.value === "" || to.value === "") {
    alert("Please enter date range!");
    return;
  }
  // Create a comma-separated string of numbers
  let csv = numbersFinal.reduce((total, num) => {
    return num + ", " + total;
  });
  // Format the string for Zong
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
  // Check if the input textarea is empty
  if (numbersTextArea === "") {
    alert("Please enter numbers");
    return;
  }
  // Check if date range is provided
  if (from.value === "" || to.value === "") {
    alert("Please enter date range!");
    return;
  }
  // Create a colon-separated string of numbers
  let csv = numbersFinal.reduce((total, num) => {
    return num + ":" + total;
  });

  // Format the string for Ufone
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

// Add click event listener to the copy button
copyBtn.addEventListener("click", function () {
  // Get the text content of the output element
  const textToCopy = output.innerText;

  // Use the Clipboard API to copy the text
  navigator.clipboard.writeText(textToCopy);
  // Update the button text and color to indicate successful copy
  copyBtn.innerText = "Copied!";
  copyBtn.style.color = "#22c55e";

  // Reset the button text and color after 2 seconds
  setTimeout(() => {
    copyBtn.innerText = "Copy";
    copyBtn.style.color = "#fff";
  }, 2000);
});
