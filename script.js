const form = document.querySelector(".hero__form");
const inputs = document.querySelectorAll('.form__group input');
const formBtn = document.querySelector('.form__btn');
const formError = document.querySelectorAll('.form__error')

// This function checks and validates the inputs
function checkInputs(event) {
  event.preventDefault();
  const currentDate = new Date();
  inputs.forEach((input) => {
    const error = input.parentElement.querySelector('.form__error');

    if(input.validity.valueMissing) {
      event.preventDefault();
      showError(error, "This field is required")
    }  else {
      error.style.display = "none";
    };

    if(input.id === "day-input") {
      const day = parseInt(input.value);
      const month = parseInt(document.getElementById("month-input").value);
      const year = parseInt(document.getElementById("year-input").value);

      const maxDaysInMonth = new Date(year, month, 0 ).getDate();

      if (day < 1 || day > maxDaysInMonth)  {
        event.preventDefault();
        showError(error,'Must be a valid day');
      }
    };

    if(input.id === "month-input") {
      const month = parseInt(input.value);
      if (month < 1 || month > 12) {
        event.preventDefault();
        showError(error, 'Must be a valid Month')
      }
    };

    if(input.id === "year-input") {
      const year = parseInt(input.value);
      if (year > currentDate.getFullYear()) {
        event.preventDefault()
        showError(error, 'Must be in the past')
      } else {
        const month = parseInt(document.getElementById("month-input").value);
        const day = parseInt(document.getElementById('day-input').value);
        if (year === currentDate.getFullYear() && month === currentDate.getMonth() + 1 && day > currentDate.getDate()) {
          event.preventDefault();
          showError(error, "Please enter a date before today");
        }
      }
    }
  })

  if (document.querySelector('.form__error[style="display: block;"]') === null) {
    calculateAndShowAge();
  }

};

// This function shows the error message if any input is not valid.
function showError(error, message) {
   error.style.display = "block";
   error.textContent = message;;
}

function calculateAndShowAge() {
  const birthDay = parseInt(document.getElementById("day-input").value);
  const birthMonth = parseInt(document.getElementById("month-input").value) - 1;
  const birthYear = parseInt(document.getElementById("year-input").value);

  const birthDate = new Date(birthYear, birthMonth, birthDay);
  const currentDate = new Date();

  const ageInMilliseconds = currentDate - birthDate;
  const ageDate = new Date(ageInMilliseconds);
  const ageYears = ageDate.getUTCFullYear() - 1970;
  const ageMonths = ageDate.getUTCMonth();
  const ageDays = ageDate.getUTCDate() - 1;

  const resultYears = document.querySelector('.result__years .result__number');
  resultYears.textContent = ageYears;

  const resultMonths = document.querySelector('.result__month .result__number');
  resultMonths.textContent = ageMonths;

  const resultDays = document.querySelector('.result__day .result__number');
  resultDays.textContent = ageDays;
}

// Select the <form> element
form.addEventListener('submit', checkInputs)


