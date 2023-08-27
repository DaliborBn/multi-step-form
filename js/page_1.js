/* VALIDACIJA INPUTA */
const validateInput = (input, pattern, errorId) => {
  const message = document.getElementById(errorId);
  if (input.value.trim() === '') {
    // Ako je input prazan i nije prošao validaciju
    message.textContent = "This field is required!";
    input.style.border = '1px solid #ed3548';
    return false; // Validacija nije prošla, vraćamo false
  } else if (pattern.test(input.value)) {
    // Ako nije prazan i prošao je validaciju
    message.textContent = "";
    input.style.border = '1px solid #9699ab';
    return true; // Validacija je prošla, vraćamo true
  } else {
    // Ako nije prazan i nije prošao validaciju
    message.textContent = `Check your ${input.getAttribute('id').split('-')[1]}!`;
    message.style.color = '#ed3548';
    input.style.border = '1px solid #ed3548';
    return false; // Validacija nije prošla, vraćamo false
  }
};

const nameInput = document.getElementById('input-name');
const emailInput = document.getElementById('input-email');
const phoneInput = document.getElementById('input-phone');
const nextBtn = document.getElementById('go-to-page2');

// Validacija prilikom kucanja (keyup)
nameInput.addEventListener('keyup', () => validateInput(nameInput, /^[a-zA-ZžšđčćŽŠĐČĆ]{3,15} [a-zA-ZžšđčćŽŠĐČĆ]{3,15}$/, 'name-error'));
emailInput.addEventListener('keyup', () => validateInput(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'email-error'));
phoneInput.addEventListener('keyup', () => validateInput(phoneInput, /^\+\d{3}\s\d{2}\s\d{3}\s\d{3,}$/, 'phone-error'));

// Validacija prilikom klika na dugme
nextBtn.addEventListener('click', () => {
  // Provera svih inputa
  const isNameValid = validateInput(nameInput, /^[a-zA-ZžšđčćŽŠĐČĆ]{3,20} [a-zA-ZžšđčćŽŠĐČĆ]{3,20}$/, 'name-error');
  const isEmailValid = validateInput(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'email-error');
  const isPhoneValid = validateInput(phoneInput, /^\+\d{3}\s\d{2}\s\d{3}\s\d{3,}$/, 'phone-error');

  // Provera da li su svi inputi validni
  if (isNameValid && isEmailValid && isPhoneValid) {
    // Čuvanje unetih vrednosti u Local Storage
    localStorage.setItem('name', nameInput.value);
    localStorage.setItem('email', emailInput.value);
    localStorage.setItem('phone', phoneInput.value);
    
    // Svi inputi su validni, prelazimo na stranicu page_2.html
    window.location.href = 'html/page_2.html';
  }
});


/* KADA SE SA STRANICE 2 VRATIMO NA STRANICU 1, POPUNJAVAMO INPUT POLJA IZ LOCAL STORAGE-A*/
document.addEventListener('DOMContentLoaded', function () {
  nameInput.value = localStorage.getItem('name');
  emailInput.value = localStorage.getItem('email');
  phoneInput.value = localStorage.getItem('phone');
});
