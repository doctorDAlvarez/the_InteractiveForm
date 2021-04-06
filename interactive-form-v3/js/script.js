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
  e.target.value === "other" ? otherJobText.hidden = false :
                                otherJobText.hidden = true ;
});


// Color selector functionality.
const colorItems = document.querySelector("#color");
colorItems.disabled = true;

const designSelector = document.querySelector("#design");
designSelector.addEventListener("change", (e) => {
        colorItems.disabled = false;
        colorItems.children[0].selected = true;
        colorItems.children[0].textContent = "";
        for ( let i = 1; i < colorItems.children.length; i++) {
          colorItems.children[i].textContent =
            `${colorItems.children[i].textContent.replace(/\(.*\)/, "")}`;
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
        if ( e.target.checked ) {
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

function validateName(name){
  if (name === "" || /\s+/.test(name)) {
    return false;
  } else {
    return true;
  }
}
function validateEmail(email){
  (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) ?
    return true :
    return false;
}
}
function validateActivities(){

}
function validateCardNumber(number) {

}
function validateZip(zip) {

}
function validateCVV(cvv) {

}

const email = document.querySelector("#email");
const formElement = document.getElementsByTagName("form")[0];
formElement.addEventListener("submit", (e) => {
        if (!validateName(nameField.value)){
          e.preventDefault();
          document.querySelector("#name-hint").style.display = "inherit";
        }
        if (!validateEmail(email.value)) {
          e.preventDefault();
          document.querySelector("#email-hint").style.display = "inherit";
        } //format correctly
        //
        // validateActivities(); //at least one activity selected.
        //
        // if (credit-card) {
        //   validateCardNumber();
        //   validateZip();
        //   validateCVV();
        // }

});
