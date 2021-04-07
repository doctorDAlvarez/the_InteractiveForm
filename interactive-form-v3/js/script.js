/*===============================================
* fullStack techDegree Project 3.
* theInteractiveForm.
* by Diego Alvarez @doc on slack.
* April 2021.
================================================*/
//console.log("test"); - Testing html-js connection.

// setting the focus on the name field of the form when page loads.
const nameField = document.querySelector('#name');
nameField.focus();

// job role functionality - Other text input hidden by default.
const otherJobText = document.querySelector("#other-job-role");
otherJobText.hidden = true;
const titleSelected = document.querySelector("#title");
titleSelected.addEventListener("change", (e) => {
	e.target.value === "other" ? otherJobText.hidden = false : otherJobText.hidden = true;
});

// Color selector functionality.
const colorItems = document.querySelector("#color");
colorItems.disabled = true;
const designSelector = document.querySelector("#design");
designSelector.addEventListener("change", (e) => {
	colorItems.disabled = false;
  if (e.target.value === "js puns") {
    colorItems.children[1].selected = true;
  } else {
    colorItems.children[4].selected = true;
  }
	for (let i = 1; i < colorItems.children.length; i++) {
		colorItems.children[i].textContent = `${colorItems.children[i].textContent.replace(/\(.*\)/, "")}`;
		if (colorItems.children[i].dataset.theme === e.target.value) {
			colorItems.children[i].hidden = false;
		} else {
			colorItems.children[i].hidden = true;
		}
	}
});

// Register for Activities section
const sumActivities = document.querySelector("#activities-cost");
const activitiesField = document.querySelector("#activities");
let sumTotal = 0;
activitiesField.addEventListener("change", (e) => {
	if (e.target.checked) {
		sumTotal += parseInt(e.target.dataset.cost);
		sumActivities.textContent = `Total: ${sumTotal}`;
	} else {
		sumTotal -= parseInt(e.target.dataset.cost);
		sumActivities.textContent = `Total: ${sumTotal}`;
	}
});

// Payment info section
const paymentMethod = document.querySelector("#payment");
const credit = document.querySelector("#credit-card");
const paypal = document.querySelector("#paypal");
const btc = document.querySelector("#bitcoin");
paymentMethod.children[1].selected = true;
paypal.hidden = true;
btc.hidden = true;
paymentMethod.addEventListener("change", (e) => {
	if (e.target.value === "credit-card") {
		credit.hidden = false;
		paypal.hidden = true;
		btc.hidden = true;
	} else if (e.target.value === "paypal") {
		credit.hidden = true;
		paypal.hidden = false;
		btc.hidden = true;
	} else if (e.target.value === "bitcoin") {
		credit.hidden = true;
		paypal.hidden = true;
		btc.hidden = false;
	}
});

function validateName(name) {
	if (name === "" || /^\s+$/.test(name)) {
		return false;
	} else {
		return true;
	}
}

function validateEmail(email) {
	return (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email));
}

function validateActivities() {
	if (sumTotal) {
		return true;
	} else {
		return false;
	}
}

function validateCardNumber(number) {
  return (/^\d{13,16}$/.test(number));
}
function validateZip(zip) {
  return (/^\d{5}$/.test(zip));
}

function validateCVV(cvv) {
  return (/^\d{3}$/.test(cvv));
}


//form validation when submitted.
const email = document.querySelector("#email");
const card = document.querySelector("#cc-num");
const zip = document.querySelector("#zip");
const cvv = document.querySelector("#cvv");
const formElement = document.getElementsByTagName("form")[0];

formElement.addEventListener("submit", (e) => {
	if (!validateName(nameField.value)) {
		e.preventDefault();
		document.querySelector("#name-hint").style.display = "inherit";
    nameField.parentElement.classList.add("not-valid");
    nameField.parentElement.classList.remove("valid");
	} else {
		document.querySelector("#name-hint").style.display = "none";
    nameField.parentElement.classList.add("valid");
    nameField.parentElement.classList.remove("not-valid");
	}
	if (!validateEmail(email.value)) {
		e.preventDefault();
		document.querySelector("#email-hint").style.display = "inherit";
    email.parentElement.classList.add("not-valid");
    email.parentElement.classList.remove("valid");
	} else {
		document.querySelector("#email-hint").style.display = "none";
    email.parentElement.classList.add("valid");
    email.parentElement.classList.remove("not-valid");
	}
	if (!validateActivities()) {
		e.preventDefault();
		document.querySelector("#activities-hint").style.display = "inherit";
    activitiesField.classList.add("not-valid");
    activitiesField.classList.remove("valid");
	} else {
		document.querySelector("#activities-hint").style.display = "none";
    activitiesField.classList.add("valid");
    activitiesField.classList.remove("not-valid");

  }


  if (credit.hidden === false) {
    if (!validateCardNumber(card.value)) {
      e.preventDefault();
      card.nextElementSibling.style.display = "inherit";
      card.parentElement.classList.add("not-valid");
      card.parentElement.classList.remove("valid");
    } else {
      card.nextElementSibling.style.display = "none";
      card.parentElement.classList.add("valid");
      card.parentElement.classList.remove("not-valid");
    }

    if (!validateZip(zip.value)) {
      e.preventDefault();
      zip.nextElementSibling.style.display = "inherit";
      zip.parentElement.classList.add("not-valid");
      zip.parentElement.classList.remove("valid");
    } else {
      zip.nextElementSibling.style.display = "none";
      zip.parentElement.classList.add("valid");
      zip.parentElement.classList.remove("not-valid");
    }

    if (!validateCVV(cvv.value)) {
      e.preventDefault();
      cvv.nextElementSibling.style.display = "inherit";
      cvv.parentElement.classList.add("not-valid");
      cvv.parentElement.classList.remove("valid");
    } else {
      cvv.nextElementSibling.style.display = "none";
      cvv.parentElement.classList.add("valid");
      cvv.parentElement.classList.remove("not-valid");
    }

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
