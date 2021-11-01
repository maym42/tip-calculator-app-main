/*inputs fields */
let inputPeople = document.getElementById("input-people");
let inputBill = document.getElementById("input-bill");
let inputCustomPrecent = document.getElementById("input-precent");

/*btns*/
let btnsPrecent = document.querySelectorAll(".btn-precent");
let btnReset = document.getElementById("reset");

let btnPressed = null;
let prev = null;

let flagReset = false;

let bill = 0;
let precent;
let numPeople = 0;

/*when user click on one of the precents btns */
btnsPrecent.forEach((btn) =>
  btn.addEventListener("click", function () {
    bill = parseFloat(inputBill.value);
    precent =
      parseFloat(btn.innerHTML.substring(0, btn.innerHTML.length - 1)) / 100;
    numPeople = parseInt(inputPeople.value);

    inputCustomPrecent.value = "";

    if (prev != null) {
      prev.classList.remove("btn-precent-pressed");
    }

    btn.classList.add("btn-precent-pressed");
    btnPressed = btn;
    prev = btn;

    if (numPeople > 0 && bill > 0) {
      tipCalculator(bill, precent, numPeople);

      btnReset.classList.add("btn-reset-on");
      flagReset = true;
    } else {
      addWarning(numPeople, bill);
    }
  })
);

inputCustomPrecent.addEventListener("change", inputHasChanged);
inputPeople.addEventListener("change", inputHasChanged);
inputBill.addEventListener("change", inputHasChanged);

/*when user change one of the inputs */
function inputHasChanged() {
  bill = parseFloat(inputBill.value);
  numPeople = parseInt(inputPeople.value);

  if (inputCustomPrecent.value.length > 0) {
    if (btnPressed !== null) {
      btnPressed.classList.remove("btn-precent-pressed");
    }
    precent = parseFloat(inputCustomPrecent.value) / 100;
  }

  if (precent >= 0 && numPeople > 0 && bill > 0) {
    tipCalculator(bill, precent, numPeople);
    btnReset.classList.add("btn-reset-on");
    flagReset = true;
  } else {
    addWarning(numPeople, bill);
  }
  removeWarning(numPeople, bill);
}

/*compute tip*/
function tipCalculator(bill, precent, numPeople) {
  var tip = (bill * precent) / numPeople;
  var total = bill / numPeople + tip;

  tip = parseFloat(tip).toFixed(2);
  total = parseFloat(total).toFixed(2);

  document.getElementById("tip-Amount").innerHTML = "$" + tip;
  document.getElementById("price-person").innerHTML = "$" + total;
}

/*add warning zero */
function addWarning(numPeople, bill) {
  if (isNaN(numPeople) || numPeople == 0) {
    document.getElementById("warning-people").innerHTML = "can't be zero";
    inputPeople.classList.add("warning-border");
    /*turn on reset btn */
    flagReset = true;
    btnReset.classList.add("btn-reset-on");
  }
  if (isNaN(bill) || bill == 0) {
    document.getElementById("warning-bill").innerHTML = "can't be zero";
    inputBill.classList.add("warning-border");
    /*turn on reset btn */
    flagReset = true;
    btnReset.classList.add("btn-reset-on");
  }
}

/*remove warning zero*/
function removeWarning(numPeople, bill) {
  if (isNaN(numPeople) == false && numPeople > 0) {
    document.getElementById("warning-people").innerHTML = "";
    inputPeople.classList.remove("warning-border");
  }
  if (isNaN(bill) == false && bill > 0) {
    document.getElementById("warning-bill").innerHTML = "";
    inputBill.classList.remove("warning-border");
  }
}

/*reset form*/
btnReset.addEventListener("click", function () {
  if (flagReset) {
    /*clean input */
    inputBill.value = "";
    inputPeople.value = "";
    inputCustomPrecent.value = "";
    /*clean result */
    document.getElementById("tip-Amount").innerHTML = "$0.00";
    document.getElementById("price-person").innerHTML = "$0.00";
    /*clean warning zero */
    document.getElementById("warning-people").innerHTML = "";
    document.getElementById("warning-bill").innerHTML = "";
    inputPeople.classList.remove("warning-border");
    inputBill.classList.remove("warning-border");

    /*turn off reset btn */
    btnReset.classList.remove("btn-reset-on");

    if (btnPressed !== null) {
      btnPressed.classList.remove("btn-precent-pressed");
    }
    flagReset = false;
  }
});

/*any change on dom turn on the reset btn*/
document.addEventListener("change", function () {
  flagReset = true;
  btnReset.classList.add("btn-reset-on");
});
