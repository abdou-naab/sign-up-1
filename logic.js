let passPattern =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let firstName = document.querySelector("input[name='f-name']");
let lastName = document.querySelector("input[name='l-name']");
let email = document.querySelector("input[name='email']");
let phone = document.querySelector("input[name='ph-number']");
let pass1 = document.querySelector("input[name='password1']");
let pass2 = document.querySelector("input[name='password2']");
let remarques = document.querySelector(".remarques");
let minLen = document.createElement("p");
minLen.textContent = "Enter more than 3 characters.";
let requiredField = document.createElement("p");
requiredField.textContent = "This field is required.";
let validEmail = document.createElement("p");
validEmail.textContent = "Enter a valid email.";
let validPassCase = document.createElement("p");
validPassCase.textContent =
  "Password should contain at least 1 uppercase letter.";
let validPassDigit = document.createElement("p");
validPassDigit.textContent = "Password should contain at least 1 digit.";
let validPassPunctuation = document.createElement("p");
validPassPunctuation.textContent =
  "Password should contain at least 1 ponctuation.";
let validPassLen = document.createElement("p");
validPassLen.textContent = "Enter more than 8 characters";
let beforePassword2 = document.createElement("p");
beforePassword2.textContent = "Enter the password first before confirming.";
let afterPassword2 = document.createElement("p");
afterPassword2.textContent = "Passwords should match.";
let shortLenElms = [firstName, lastName, phone, pass1];
let requiredElms = [firstName, lastName, email, pass1, pass2];
let allELms = [firstName, lastName, email, phone, pass1, pass2];

function length3Vcheck(e) {
  if (e.target.validity.tooShort) {
    minLen.style.color = "red";
  } else if (e.target.value.length >= 3) {
    minLen.style.color = "green";
  } else {
    minLen.style.color = "";
  }
}
let firstNameIsValid = false;
let lastNameIsValid = false;
let phoneIsValid = false;
function requiredVcheck(e) {
  if (e.target != email && e.target != pass1) {
    if (
      e.target.validity.tooShort ||
      minLen.style.color == "red" ||
      e.target.value.length == 0
    ) {
      requiredField.style.color = "red";
      if (e.target == phone) {
        phoneIsValid = false;
      } else if (e.target == firstName) {
        firstNameIsValid = false;
      } else if (e.target == lastName) {
        lastNameIsValid = false;
      }
    } else if (e.target.value.length >= 3) {
      requiredField.style.color = "green";
      if (e.target == phone) {
        phoneIsValid = true;
      } else if (e.target == firstName) {
        firstNameIsValid = true;
      } else if (e.target == lastName) {
        lastNameIsValid = true;
      }
    } else {
      requiredField.style.color = "";
      if (e.target == phone) {
        phoneIsValid = false;
      } else if (e.target == firstName) {
        firstNameIsValid = false;
      } else if (e.target == lastName) {
        lastNameIsValid = false;
      }
    }
  }
}
let emailIsValid = false;
function emailVcheck(e) {
  if (e.target == email) {
    if (validEmail.style.color == "red" || e.target.value.length == 0) {
      requiredField.style.color = "red";
      emailIsValid = false;
    }
    if (e.target.value.match(emailPattern)) {
      validEmail.style.color = "green";
      requiredField.style.color = "green";
      emailIsValid = true;
    } else {
      validEmail.style.color = "red";
      requiredField.style.color = "red";
      emailIsValid = false;
    }
  }
}
let pass1IsValid = false;
function pass1Vcheck(e) {
  if (e.target == pass1) {
    if (!e.target.value.match(passPattern)) {
      requiredField.style.color = "red";
      pass1IsValid = false;
    } else {
      let checks = [
        validPassCase,
        validPassDigit,
        validPassPunctuation,
        validPassLen,
      ];
      requiredField.style.color = "green";
      pass1IsValid = true;
      for (c of checks) {
        c.style.color = "green";
      }
    }
    if (e.target.value.match(/[A-Z]/)) {
      validPassCase.style.color = "green";
    } else {
      validPassCase.style.color = "red";
    }

    if (e.target.value.match(/\d/)) {
      validPassDigit.style.color = "green";
    } else {
      validPassDigit.style.color = "red";
    }

    if (e.target.value.match(/[^A-Za-z0-9]/)) {
      validPassPunctuation.style.color = "green";
    } else {
      validPassPunctuation.style.color = "red";
    }

    if (!e.target.validity.tooShort && e.target.value.length != 0) {
      validPassLen.style.color = "green";
    } else {
      validPassLen.style.color = "red";
    }
  }
}
let pass2IsValid = false;
function pass2Vcheck(e) {
  if (e.target == pass2) {
    if (!pass1IsValid) {
      beforePassword2.style.color = "red";
      afterPassword2.style.color = "red";
      requiredField.style.color = "red";
      e.target.setAttribute("readonly", "");
      pass2IsValid = false;
    }
    if (pass1IsValid) {
      beforePassword2.style.color = "green";

      e.target.removeAttribute("readonly");
      if (pass1.value == e.target.value) {
        afterPassword2.style.color = "green";
        requiredField.style.color = "green";
        pass2IsValid = true;
      } else {
        afterPassword2.style.color = "red";
        requiredField.style.color = "red";
        pass2IsValid = false;
      }
    }
  }
}

for (let elm of allELms) {
  for (eventListener of ["focus", "mouseenter"]) {
    elm.addEventListener(eventListener, (e) => {
      if (requiredElms.includes(elm)) {
        remarques.append(requiredField);
        requiredVcheck(e);
      }
      if (shortLenElms.includes(elm) && elm != pass1) {
        remarques.append(minLen);
        length3Vcheck(e);
      }
      if (elm == email) {
        remarques.append(validEmail);
        emailVcheck(e);
      }
      if (elm == pass1) {
        remarques.append(
          validPassCase,
          validPassDigit,
          validPassPunctuation,
          validPassLen
        );
        pass1Vcheck(e);
      }
      if (elm == pass2) {
        remarques.append(beforePassword2);
        remarques.append(afterPassword2);
        pass2Vcheck(e);
      }
    });
  }

  for (eventListener of ["blur", "mouseleave"]) {
    elm.addEventListener(eventListener, (e) => {
      minLen.style.color = "";
      while (remarques.firstChild) {
        remarques.removeChild(remarques.firstChild);
      }
    });
  }

  elm.addEventListener("input", (e) => {
    length3Vcheck(e);
    requiredVcheck(e);
    emailVcheck(e);
    pass1Vcheck(e);
    pass2Vcheck(e);
    reset(e);
  });
}

document
  .querySelector(".form-m button")
  .addEventListener("click", function (e) {
    if (
      emailIsValid == false ||
      pass1IsValid == false ||
      pass2IsValid == false ||
      phoneIsValid == false ||
      lastNameIsValid == false ||
      firstNameIsValid == false
    ) {
      e.preventDefault();
      validityWhenSubmitting(emailIsValid, email);
      validityWhenSubmitting(pass1IsValid, pass1);
      validityWhenSubmitting(pass2IsValid, pass2);
      validityWhenSubmitting(phoneIsValid, phone);
      validityWhenSubmitting(firstNameIsValid, firstName);
      validityWhenSubmitting(lastNameIsValid, lastName);
    }
  });

function validityWhenSubmitting(validity, elm) {
  if (validity) {
    elm.style.cssText =
      "border: 2px solid green; box-shadow: 0px 1px 1px 1px rgb(106, 243, 158);";
  } else {
    if (elm != phone) {
      elm.style.cssText =
        "border: 2px solid red; box-shadow: 0px 1px 1px 1px rgb(228, 101, 101);";
    }
  }
}
function reset(e) {
  if (
    e.target.style.cssText ==
      "border: 2px solid red; box-shadow: rgb(228, 101, 101) 0px 1px 1px 1px;" &&
    ((emailIsValid && e.target == email) ||
      (pass1IsValid && e.target == pass1) ||
      (pass2IsValid && e.target == pass2) ||
      (phoneIsValid && e.target == phone) ||
      (firstNameIsValid && e.target == firstName) ||
      (lastNameIsValid && e.target == lastName))
  ) {
    e.target.style.cssText =
      "border: 2px solid green; box-shadow: 0px 1px 1px 1px rgb(106, 243, 158);";
  } else if (
    (e.target.style.cssText =
      "border: 2px solid green; box-shadow: rgb(106, 243, 158) 0px 1px 1px 1px;" ||
      e.target.style.cssText ==
        "border: 2px solid blue; box-shadow: rgb(127, 127, 200) 0px 1px 1px 1px;") &&
    ((!emailIsValid && e.target == email) ||
      (!pass1IsValid && e.target == pass1) ||
      (!pass2IsValid && e.target == pass2) ||
      (!phoneIsValid && e.target == phone) ||
      (!firstNameIsValid && e.target == firstName) ||
      (!lastNameIsValid && e.target == lastName))
  ) {
    e.target.style.cssText =
      "border: 2px solid red; box-shadow: 0px 1px 1px 1px rgb(228, 101, 101);";
  }
}
