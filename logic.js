let passPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
let emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

let firstName = document.querySelector("input[name='f-name']")
let lastName = document.querySelector("input[name='l-name']")
let email = document.querySelector("input[name='email']")
let phone = document.querySelector("input[name='ph-number']")
let pass1 = document.querySelector("input[name='password1']")
let pass2 = document.querySelector("input[name='password2']")
let remarques = document.querySelector('.remarques')

let minLen = document.createElement('p')
minLen.textContent = 'Enter more than 3 characters.'
let requiredField =  document.createElement('p')
requiredField.textContent = 'This field is required.'
let validEmail =  document.createElement('p')
validEmail.textContent = 'Enter a valid email.'
let validPassCase =  document.createElement('p')
validPassCase.textContent = 'Password should contain at least 1 uppercase letter.'
let validPassDigit = document.createElement('p')
validPassDigit.textContent = 'Password should contain at least 1 digit.'
let validPassPunctuation =document.createElement('p')
validPassPunctuation.textContent = 'Password should contain at least 1 ponctuation.'
let validPassLen = document.createElement('p')
validPassLen.textContent = 'Enter more than 8 characters'
let beforePassword2 = document.createElement('p')
beforePassword2.textContent = 'Enter the password first before confirming.'
let afterPassword2= document.createElement('p')
afterPassword2.textContent = 'Passwords should match.'

let shortLenElms = [firstName, lastName, phone, pass1]
let requiredElms = [firstName, lastName, email, pass1, pass2]
let allELms = [firstName, lastName, email, phone, pass1, pass2]

for (let elm of allELms){ 
    for (eventListener of ['focus', 'mouseenter']){
        elm.addEventListener(eventListener, (e)=>{
            if(requiredElms.includes(elm)) {
                remarques.append(requiredField);
            } 
            if(shortLenElms.includes(elm) && elm!=pass1){
                remarques.append(minLen);
                if (elm.textContent.length >= 3){minLen.style.color = 'green'} 
            }
            if(elm == email) {
                remarques.append(validEmail);
            }
            if (elm == pass1){
                remarques.append(validPassCase, validPassDigit, validPassPunctuation, validPassLen) ;
            } 
            (pass1.textContent=='' && elm==pass2) ? remarques.append(beforePassword2) : false;
            if (pass1.textContent!='' && pass1.textContent != pass2.textContent) {
                remarques.append(afterPassword2);
            };
        })
    } 


    for (eventListener of ['blur', 'mouseleave']){
        
        elm.addEventListener(eventListener, (e)=>{
            while (remarques.firstChild){
                remarques.removeChild(remarques.firstChild);
            }
        })
    }
    

}
