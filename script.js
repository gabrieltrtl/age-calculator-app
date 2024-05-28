const form = document.querySelector(".hero__form");
const inputs = document.querySelectorAll('.form__group input');
const formBtn = document.querySelector('.form__btn');
const formError = document.querySelectorAll('.form__error')

function checkInputs(event) {
  const currentDate = new Date();

  inputs.forEach((input) => {
    const error = input.parentElement.querySelector('.form__error');

    if(input.validity.valueMissing) {
      event.preventDefault()
      showError(error, "This field is required")
    }  else {
      error.style.display = "none";
    };

    if(input.id === "day-input") {
      const day = parseInt(input.value);
      if (day < 1 || day > 31)  {
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
        if (month > currentDate.getMonth() + 1 || (month === currentDate.getMonth() + 1 && day > currentDate())) {
          event.preventDefault();
          showError(error, "Please enter a date before today")
        }
      }
    }
  })
};

function showError(error, message) {
   error.style.display = "block";
   error.textContent = message;;
}

form.addEventListener('submit', checkInputs)


