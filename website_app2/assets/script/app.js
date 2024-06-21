const logregBox = document.querySelector('.logreg-box');
const logLink = document.querySelector('.log-link');
const regLink = document.querySelector('.reg-link');

regLink.addEventListener('click', () => {
    logregBox.classList.add('active')
});

logLink.addEventListener('click', () => {
    logregBox.classList.remove('active')
});