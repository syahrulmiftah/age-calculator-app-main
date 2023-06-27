const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const dayError = document.getElementById("days");
const monthError = document.getElementById("months");
const yearError = document.getElementById("years");

const calculateButton = document.getElementById("calculate-button");

function isDay(day) {
  if (isNaN(day) || day < 1 || day > 31) {
    if (isNaN(day)) {
      dayInput.classList.add("error");
      dayError.textContent = "This field is required.";
      redText("day", true);
      eraseOutput();
    } else {
      dayInput.classList.add("error");
      dayError.textContent = "Must be a valid day";
      redText("day", true);
      eraseOutput();
    }
  } else {
    dayInput.classList.remove("error");
    dayError.textContent = "";
    redText("day", false);
    return true;
  }
}

function isMonth(month) {
  if (isNaN(month) || month < 1 || month > 12) {
    if (isNaN(month)) {
      monthInput.classList.add("error");
      monthError.textContent = "This field is required.";
      redText("month", true);
      eraseOutput();
    } else {
      monthInput.classList.add("error");
      monthError.textContent = "Must be a valid month";
      redText("month", true);
      eraseOutput();
    }
  } else {
    monthInput.classList.remove("error");
    monthError.textContent = "";
    redText("month", false);
    return true;
  }
}

function isYear(year) {
  if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
    if (isNaN(year)) {
      yearInput.classList.add("error");
      yearError.textContent = "This field is required.";
      redText("year", true);
      eraseOutput();
    } else if (year < 1900) {
      yearInput.classList.add("error");
      yearError.textContent = "Must be a valid year";
      redText("year", true);
      eraseOutput();
    } else {
      yearError.textContent = "Must be in the past";
      redText("year", true);
      eraseOutput();
    }
  } else {
    yearInput.classList.remove("error");
    yearError.textContent = "";
    redText("year", false);
    return true;
  }
}

calculateButton.addEventListener("click", (event) => {
  event.preventDefault();
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value); // months are zero-based in JavaScript Date object
  const year = parseInt(yearInput.value);
  console.log("test");

  isDay(day);
  isMonth(month);
  isYear(year);
  if (isDay(day)) {
    if (isMonth(month)) {
      if (isYear(year)) {
        if (!isValidDate(day, month, year)) {
          dayError.textContent = "Must be a valid date";
          dayInput.classList.add("error");
          monthInput.classList.add("error");
          yearInput.classList.add("error");
          eraseOutput();
          redText("day", true);
          redText("month", true);
          redText("year", true);
        } else {
          dayInput.classList.remove("error");
          dayError.textContent = "";
          monthInput.classList.remove("error");
          monthError.textContent = "";
          yearInput.classList.remove("error");
          yearError.textContent = "";
          redText("day", false);
          redText("month", false);
          redText("year", false);
          calculateAge(day, month, year);
        }
      }
    }
  }
});

function calculateAge(day, month, year) {
  const currentDate = new Date();

  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  let ageDays = currentDay - day;
  let ageMonths = currentMonth - month;
  let ageYears = currentYear - year;

  if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
    ageYears--;
    ageMonths += 12;
  }

  if (ageDays < 0) {
    const daysInLastMonth = new Date(
      currentYear,
      currentMonth - 1,
      0
    ).getDate();
    ageDays += daysInLastMonth;
    ageMonths--;
  }

  if (isNaN(ageDays) || isNaN(ageMonths) || isNaN(ageYears)) {
    return;
  }

  document.getElementById("result-years").textContent = ageYears;
  document.getElementById("result-months").textContent = ageMonths;
  document.getElementById("result-days").textContent = ageDays;
}

function eraseOutput() {
  document.getElementById("result-years").textContent = "--";
  document.getElementById("result-months").textContent = "--";
  document.getElementById("result-days").textContent = "--";
}

function isValidDate(day, month, year) {
  // Create a new Date object using the provided inputs
  const date = new Date(year, month - 1, day);

  // Check if the year, month, and day values are valid
  const isValidYear = date.getFullYear() === year;
  const isValidMonth = date.getMonth() === month - 1;
  const isValidDay = date.getDate() === day;

  // Check if all the date components are valid
  if (isValidYear && isValidMonth && isValidDay) {
    return true;
  } else {
    return false;
  }
}

function redText(element, flag) {
  if (flag) {
    document.getElementById(`label-${element}`).style.color = "red";
  } else {
    document.getElementById(`label-${element}`).style.color =
      "var(--neutral-smokeygrey)";
  }
}

/*
code from chat GPT


const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const dayError = document.getElementById("days");
const monthError = document.getElementById("months");
const yearError = document.getElementById("years");

const calculateButton = document.getElementById("calculate-button");

calculateButton.addEventListener("click", (event) => {
  event.preventDefault();
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  validateInput(day, month, year);
});

function validateInput(day, month, year) {
  resetErrors();
  
  if (!isValidNumber(day) || !isValidDay(day)) {
    showError(dayInput, dayError, "day", "Invalid day input.");
    return;
  }

  if (!isValidNumber(month) || !isValidMonth(month)) {
    showError(monthInput, monthError, "month", "Invalid month input.");
    return;
  }

  if (!isValidNumber(year) || !isValidYear(year)) {
    showError(yearInput, yearError, "year", "Invalid year input.");
    return;
  }

  if (!isValidDate(day, month, year)) {
    showError(dayInput, dayError, "day", "Invalid date.");
    showError(monthInput, monthError, "month", "Invalid date.");
    showError(yearInput, yearError, "year", "Invalid date.");
    return;
  }

  calculateAge(day, month, year);
}

function isValidNumber(value) {
  return !isNaN(value);
}

function isValidDay(day) {
  return day >= 1 && day <= 31;
}

function isValidMonth(month) {
  return month >= 1 && month <= 12;
}

function isValidYear(year) {
  const currentYear = new Date().getFullYear();
  return year >= 1900 && year <= currentYear;
}

function isValidDate(day, month, year) {
  const date = new Date(year, month - 1, day);
  return (
    date.getDate() === day &&
    date.getMonth() === month - 1 &&
    date.getFullYear() === year
  );
}

function showError(inputElement, errorElement, labelElement, errorMessage) {
  inputElement.classList.add("error");
  errorElement.textContent = errorMessage;
  redText(labelElement, true);
  eraseOutput();
}

function resetErrors() {
  dayInput.classList.remove("error");
  monthInput.classList.remove("error");
  yearInput.classList.remove("error");
  dayError.textContent = "";
  monthError.textContent = "";
  yearError.textContent = "";
  redText("day", false);
  redText("month", false);
  redText("year", false);
}

function calculateAge(day, month, year) {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  let ageDays = currentDay - day;
  let ageMonths = currentMonth - month;
  let ageYears = currentYear - year;

  if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
    ageYears--;
    ageMonths += 12;
  }

  if (ageDays < 0) {
    const daysInLastMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
    ageDays += daysInLastMonth;
    ageMonths--;
  }

  if (isValidNumber(ageDays) && isValidNumber(ageMonths) && isValidNumber(ageYears)) {
    document.getElementById("result-years").textContent = ageYears;
    document.getElementById("result-months").textContent = ageMonths;
    document.getElementById("result-days").textContent = ageDays;
  }
}

function eraseOutput() {
  document.getElementById("result-years").textContent = "--";
  document.getElementById("result-months").textContent = "--";
  document.getElementById("result-days").textContent = "--";
}

function redText(element, flag) {
  const labelElement = document.getElementById(`label-${element}`);
  labelElement.style.color = flag ? "red" : "var(--neutral-smokeygrey)";
}


*/