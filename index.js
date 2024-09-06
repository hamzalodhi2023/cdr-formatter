// Select DOM elements
const numbersTextArea = document.querySelector("#numbers"); // Input textarea for mobile numbers
const converters = document.querySelectorAll(".converter"); // Converter buttons for different networks
const network = document.querySelector("#network"); // Element to display selected network name
const output = document.querySelector("#output"); // Output element for converted number formats
const outputDiv = document.querySelector(".display-none"); // Output container (initially hidden)

const mobile_count = document.querySelector("#mbl-count"); // Element to display count of valid mobile numbers
const mobile_nums = document.querySelector("#mbl-nums"); // Element to display list of processed mobile numbers

const from = document.querySelector("#from"); // Input for start date of the desired period
const to = document.querySelector("#to"); // Input for end date of the desired period

const telenor = document.querySelector("#telenor"); // Telenor network converter button
const mobilink = document.querySelector("#mobilink"); // Mobilink network converter button
const zong = document.querySelector("#zong"); // Zong network converter button
const ufone = document.querySelector("#ufone"); // Ufone network converter button
const copyBtn = document.querySelector(".copy"); // Button to copy converted output
let numbersFinal; // Array to store processed and validated mobile numbers

/**
 * Formats a date string into a custom format
 * @param {string} date - The date string in "YYYY-MM-DD" format
 * @param {string} separator - The separator to use between date components
 * @param {number} first - Index of the first date component (0: year, 1: month, 2: day)
 * @param {number} second - Index of the second date component
 * @param {number} third - Index of the third date component
 * @returns {string} The formatted date string in the specified order with the given separator
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

// Add click event listeners to network converter buttons
converters.forEach((converter) => {
  converter.addEventListener("click", () => {
    // Check if the input textarea is empty
    if (numbersTextArea.value === "") {
      alert("Please enter mobile numbers!");
      return;
    }
    // Check if date range is provided
    if (from.value === "" || to.value === "") {
      alert("Please enter date range!");
      return;
    }
    // Show the output div
    outputDiv.classList.remove("display-none");
    // Clear previous results
    mobile_nums.innerHTML = "";
    network.textContent = "";
    mobile_count.textContent = "";
    output.innerHTML = "";

    // Process and validate input numbers
    const numbers = numbersTextArea.value.split("\n");
    const trimmedNums = numbers.map((number) => number.trim());

    // Filter out empty lines and store the result
    numbersFinal = trimmedNums.filter((number) => number !== "");
    // Display the selected network name
    network.textContent = converter.textContent;
    // Display the count of valid mobile numbers
    mobile_count.textContent = numbersFinal.length;
    // Display processed numbers with index
    numbersFinal.forEach((num, index) => {
      let number = index + 1 + ". " + num + "<br>";
      mobile_nums.innerHTML += number;
    });
  });
});
// Telenor converter: Format numbers for Telenor network
telenor.addEventListener("click", () => {
  // Create a comma-separated string of numbers
  let csv = numbersFinal.reduce((total, num) => {
    return num + "," + total;
  });
  // Format the string for Telenor with date range
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
// Mobilink converter: Format numbers for Mobilink network
mobilink.addEventListener("click", () => {
  // Create an array of formatted strings for each number with date range
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

// Zong converter: Format numbers for Zong network
zong.addEventListener("click", () => {
  // Create a comma-separated string of numbers
  let csv = numbersFinal.reduce((total, num) => {
    return num + ", " + total;
  });
  // Format the string for Zong with date range
  let zongString =
    csv +
    " CALL & SMS Detailed Record " +
    dateFormatter(from.value, "-") +
    " TO " +
    dateFormatter(to.value, "-");
  output.innerHTML = zongString;
});
// Ufone converter: Format numbers for Ufone network
ufone.addEventListener("click", () => {
  // Create a colon-separated string of numbers
  let csv = numbersFinal.reduce((total, num) => {
    return num + ":" + total;
  });
  // Format the string for Ufone with date range and request type
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
  // Use the Clipboard API to copy the text to clipboard
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
