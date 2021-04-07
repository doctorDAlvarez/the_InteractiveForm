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
roleSelected.addEventListener( 'change', e => {
	e.target.value === 'other' ?
  otherJobText.hidden = false : otherJobText.hidden = true;
}); //using ternary operator for simple branching.

// 3) Color selector functionality.
const colorItems = document.querySelector("#color");
const designSelector = document.querySelector("#design");
colorItems.disabled = true;
designSelector.addEventListener( 'change', e => {
	colorItems.disabled = false;
  if ( e.target.value === "js puns" ) {
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
    if ( colorItems.children[i].dataset.theme === e.target.value ) {
			colorItems.children[i].hidden = false;
		} else {
			colorItems.children[i].hidden = true;
		}
	}
});

// 4) Register for Activities functionality:
const sumActivities = document.querySelector("#activities-cost");
const activitiesField = document.querySelector("#activities");
let sumTotal = 0; // counter variable.
activitiesField.addEventListener( 'change', e => {
	if ( e.target.checked ) {
		sumTotal += parseInt( e.target.dataset.cost );
		sumActivities.textContent = `Total: ${sumTotal}`;
	} else {
		sumTotal -= parseInt(e.target.dataset.cost);
		sumActivities.textContent = `Total: ${sumTotal}`;
	}
});

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
paymentMethod.addEventListener( 'change', e => {
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

// 6) form validation. using regex and custom helper functions.
//======================
// Validation arrow functions
//======================

const validateName = name => (name === "" || /^\s+$/.test(name));

const validateEmail = email => !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email));

const validateCardNumber = number => !(/^\d{13,16}$/.test(number));

const validateZip = zip => !(/^\d{5}$/.test(zip));

const validateCVV = cvv => !(/^\d{3}$/.test(cvv));

function errorStatus(element) {
  element.nextElementSibling.style.display = "inherit";
  element.parentElement.classList.add("not-valid");
  element.parentElement.classList.remove("valid");
}
function validStatus(element) {
  element.nextElementSibling.style.display = "none";
  element.parentElement.classList.add("valid");
  element.parentElement.classList.remove("not-valid");
}

function validation(func, element, e) {
  if ( func(element.value) ) {
    e.preventDefault();
    errorStatus(element);
  } else {
    validStatus(element);
  }
}
//form validation when submitted.
const email = document.querySelector("#email");
const card = document.querySelector("#cc-num");
const zip = document.querySelector("#zip");
const cvv = document.querySelector("#cvv");
const formElement = document.getElementsByTagName("form")[0];

formElement.addEventListener("submit", e => {
  validation(validateName, nameField, e);
  validation(validateEmail, email, e);
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
    validation(validateCardNumber, card, e);
    validation(validateZip, zip, e);
    validation(validateCVV, cvv, e);
  }
});


// create focus and blur events for each checkbox input.
const activitiesBox = document.querySelector("#activities-box");
for ( let i = 0; i < activitiesBox.childElementCount; i++) {
  activitiesBox.children[i].firstElementChild.addEventListener("focus", e => {
        activitiesBox.children[i].className = "focus";
  });
  activitiesBox.children[i].firstElementChild.addEventListener("blur", e => {
        activitiesBox.children[i].removeAttribute("class");
  });
}
