/*===============================================
* fullStack techDegree Project 3.
* theInteractiveForm.
* by Diego Alvarez @doc on slack.
* April 2021.
================================================*/
//console.log("test"); - Testing html<-->js connection.

// 1) setting the focus on the name field of the form when page loads.
const nameField = document.querySelector('#name');
nameField.focus();

// 2) "Other" job role functionality -
const otherJobText = document.querySelector("#other-job-role");
otherJobText.hidden = true; // Other text input hidden by default.
const roleSelected = document.querySelector('#title');
roleSelected.addEventListener('change', e => {
  e.target.value === 'other' ? otherJobText.hidden = false : otherJobText.hidden =
    true;
}); //using ternary operator for simple branching.

// 3) Color selector functionality.
const colorItems = document.querySelector("#color");
const designSelector = document.querySelector("#design");
colorItems.disabled = true;
designSelector.addEventListener('change', e => {
  colorItems.disabled = false;
  if (e.target.value === "js puns") {
    colorItems.children[1].selected = true;
  } else {
    colorItems.children[4].selected = true;
  }
  /* for looping through all colors, cleaning with REGEX the textContent,
   *  and hidding colors that do not correspond to the selected design.
   */
  for (let i = 1; i < colorItems.children.length; i++) {
    colorItems.children[i].textContent =
      `${colorItems.children[i].textContent.replace(/\(.*\)/, "")}`;
    if (colorItems.children[i].dataset.theme === e.target.value) {
      colorItems.children[i].hidden = false;
    } else {
      colorItems.children[i].hidden = true;
    }
  }
});

// 4) Register for Activities functionality:
const sumActivities = document.querySelector("#activities-cost");
const activitiesField = document.querySelector("#activities");
const activitiesBox = document.querySelector("#activities-box");
let sumTotal = 0; // counter variable.
activitiesField.addEventListener('change', e => {
  if (e.target.checked) {
    for (let i = 1; i < activitiesBox.childElementCount; i++) {
      if (activitiesBox.children[i].firstElementChild.dataset.dayAndTime ===
        e.target.dataset.dayAndTime && activitiesBox.children[i].firstElementChild !==
        e.target) {
        activitiesBox.children[i].firstElementChild.disabled = true;
        activitiesBox.children[i].classList.add("disabled");
      }
    }
    sumTotal += parseInt(e.target.dataset.cost);
    sumActivities.textContent = `Total: ${sumTotal}`;
  } else {
    for (let i = 1; i < activitiesBox.childElementCount; i++) {
      if (activitiesBox.children[i].firstElementChild.dataset.dayAndTime ===
        e.target.dataset.dayAndTime && activitiesBox.children[i].firstElementChild !==
        e.target) {
        activitiesBox.children[i].firstElementChild.disabled = false;
        activitiesBox.children[i].classList.remove("disabled");
      }
    }
    sumTotal -= parseInt(e.target.dataset.cost);
    sumActivities.textContent = `Total: ${sumTotal}`;
  }
});

// create focus and blur events for each checkbox input.
for (let i = 0; i < activitiesBox.childElementCount; i++) {
  activitiesBox.children[i].firstElementChild.addEventListener("focus", e => {
    activitiesBox.children[i].className = "focus";
  });
  activitiesBox.children[i].firstElementChild.addEventListener("blur", e => {
    activitiesBox.children[i].removeAttribute("class");
  });
}

// 5) Payment info functionality:
const paymentMethod = document.querySelector("#payment");
const credit = document.querySelector("#credit-card");
const paypal = document.querySelector("#paypal");
const btc = document.querySelector("#bitcoin");
paymentMethod.children[1].selected = true; // Credit Card default method.
paypal.hidden = true;
btc.hidden = true;

// arrow fx to show the correct payment method selected.
const showPayMethod = element => element.hidden = false;
paymentMethod.addEventListener('change', e => {
  const payArr = [credit, paypal, btc];
  for (let i of payArr) {
    i.hidden = true;
  }
  if (e.target.value === "credit-card") {
    showPayMethod(credit);
  } else if (e.target.value === "paypal") {
    showPayMethod(paypal);
  } else if (e.target.value === "bitcoin") {
    showPayMethod(btc);
  }
});

/* 6) Form validation. using regex, custom helper functions and
 *     a principal validation fx.
 * ============================================================
 * Validation arrow functions and helper function declaration.
 * ============================================================
 */
 const email = document.querySelector("#email");
 const card = document.querySelector("#cc-num");
 const zip = document.querySelector("#zip");
 const cvv = document.querySelector("#cvv");

const isValidName = name => !(name === "" || /^\s+$/.test(name));
const isValidEmail = email => (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
  email));
const isValidCard = number => (/^\d{13,16}$/.test(number));
const isValidZip = zip => (/^\d{5}$/.test(zip));
const isValidCvv = cvv => (/^\d{3}$/.test(cvv));

// [exceeds] Conditional error message. Creating the new span error message.
const new_error = document.createElement("span");
new_error.textContent = "Email field cannot be blank, add an Email address";
new_error.className = "email-hint hint";
new_error.style.display = "none";
email.parentElement.appendChild(new_error);

/**
* Declaring Status helper functions.
* this functions change the status of the validated field.
* @param {element} element - input field to change.
**/
function validStatus(element) {
  email.parentElement.lastElementChild.style.display = "none";
  element.nextElementSibling.style.display = "none";
  element.parentElement.classList.add("valid");
  element.parentElement.classList.remove("not-valid");
}
function errorStatus(element) {
  email.parentElement.lastElementChild.style.display = "none";
  element.nextElementSibling.style.display = "inherit";
  element.parentElement.classList.add("not-valid");
  element.parentElement.classList.remove("valid");
  if (email.value === "") {
    email.nextElementSibling.style.display = "none";
    email.parentElement.lastElementChild.style.display = "inherit";
  }
}
/**
* Main helper validation function:
* validates the field and branch to a valid / error status respective.
* @param {function} func - individual field helper function.
* @param {element} element - input element to validate.
* @param {event object} e - passing from the listener to call preventDefault().
**/
function validation(func, element, e) {
  if ( func(element.value) ) {
    validStatus( element );
  } else {
      e.preventDefault();
      errorStatus( element );
    }
}

/**
* Adding listener to form element:
* the callback use a helper <validation()> fx for the required fields.
* the "activity registry" is validated directly with the value of the SUM.
* @param {event} submit - listen when the form is submitted.
* @param {arrow_function}  - callback event handler.
**/
const formElement = document.getElementsByTagName("form")[0];
formElement.addEventListener( 'submit', e => {
  validation( isValidName, nameField, e );
  validation( isValidEmail, email, e );
  if ( !sumTotal ) {
    e.preventDefault();
    activitiesField.lastElementChild.style.display = "inherit";
    activitiesField.classList.add("not-valid");
    activitiesField.classList.remove("valid");
  } else {
    activitiesField.lastElementChild.style.display = "none";
    activitiesField.classList.add("valid");
    activitiesField.classList.remove("not-valid");
  }
  if (credit.hidden === false) {
    validation(isValidCard, card, e);
    validation(isValidZip, zip, e);
    validation(isValidCvv, cvv, e);
  }
});
/**
* Real-time error message feature:
* declaring an arrow function to add the INPUT
* listener to the required fields
* @param {element} field - input element to validate.
* @param {function} valid_func - callback validation function.
**/
const createDynamicValidate = (field, valid_func) => {
  field.addEventListener("input", e => {
    validation(valid_func, field, e);
  });
}
// calling the helper function on each required field.
createDynamicValidate(nameField, isValidName);
createDynamicValidate(email, isValidEmail);
createDynamicValidate(card, isValidCard);
createDynamicValidate(zip, isValidZip);
createDynamicValidate(cvv, isValidCvv);
