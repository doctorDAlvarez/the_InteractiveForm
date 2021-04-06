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
	colorItems.children[0].selected = true;
	colorItems.children[0].textContent = "";
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
	} else {
		document.querySelector("#name-hint").style.display = "none";
	}
	if (!validateEmail(email.value)) {
		e.preventDefault();
		document.querySelector("#email-hint").style.display = "inherit";
	} else {
		document.querySelector("#email-hint").style.display = "none";
	}
	if (!validateActivities()) {
		e.preventDefault();
		document.querySelector("#activities-hint").style.display = "inherit";
	} else {
		document.querySelector("#activities-hint").style.display = "none";
	}

  if (credit.hidden === false) {
    if (!validateCardNumber(card.value)) {
      e.preventDefault();
      card.nextElementSibling.style.display = "inherit";
    } else {
      card.nextElementSibling.style.display = "none";
    }

    if (!validateZip(zip.value)) {
      e.preventDefault();
      zip.nextElementSibling.style.display = "inherit";
    } else {
      zip.nextElementSibling.style.display = "none";
    }

    if (!validateCVV(cvv.value)) {
      e.preventDefault();
      cvv.nextElementSibling.style.display = "inherit";
    } else {
      cvv.nextElementSibling.style.display = "none";
    }

  }
});
