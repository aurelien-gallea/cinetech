"use strict";
const btnToggler = document.querySelectorAll('.btnToggler');
const signInForm = document.querySelector("#signIn");
const signUpForm = document.querySelector("#signUp");
btnToggler.forEach(myToggler => {
    myToggler.addEventListener('click', () => {
        signInForm.classList.toggle("d-none");
        signUpForm.classList.toggle("d-none");
    });
});
