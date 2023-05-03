const btnToggler = document.querySelectorAll('.btnToggler');
const signInForm = document.querySelector("#signIn") as HTMLTableSectionElement;
const signUpForm = document.querySelector("#signUp") as HTMLTableSectionElement;

btnToggler.forEach(myToggler => {
    
    myToggler.addEventListener('click', () => {
        signInForm.classList.toggle("d-none");
        signUpForm.classList.toggle("d-none");
    });
});