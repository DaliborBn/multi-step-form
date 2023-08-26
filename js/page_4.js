/* UZIMANJE PODATAKA IZ LOCAL STORAGE I UPISIVANJE U ELEMENETE */
document.addEventListener('DOMContentLoaded', () => {
  const lastClickedPlanName = localStorage.getItem('lastClickedPlanName');
  const lastClickedPlanPrice = localStorage.getItem('lastClickedPlanPrice');
  const finishPlanName = document.querySelector('#plan-title');
  const finishPrice = document.querySelector('#plan-price');
  let periodElement = document.querySelector('#plan-title span');
  let totalPeriodElement = document.querySelector('#total-title span');

  // Uzimanje iz localStorage informacije o stanju polja
  const storedInputState = JSON.parse(localStorage.getItem("mode"));
  if (storedInputState) {
    // Kada jeste čekirano
    periodElement.textContent = 'Yearly';
    totalPeriodElement.textContent = '(per year)';
  } else {
    // Kada nije čekirano
    periodElement.textContent = 'Monthly'
    totalPeriodElement.textContent = '(per month)';
  }

  finishPlanName.textContent = `${lastClickedPlanName} (${periodElement.textContent})`;
  finishPrice.textContent = lastClickedPlanPrice;
});


/* KREIRANJE ELEMENTA ZA SVAKI ČEKIRANI ADD I IZRAČUNAVANJE UKUPNE CIJENE */
document.addEventListener('DOMContentLoaded', () => {
  // Preuzimanje sačuvanih podataka iz Local Storage
  const lastClickedPlanPrice = localStorage.getItem('lastClickedPlanPrice');
  const addFinishWrapper = document.querySelector('.add-finish-wrapper');
  const checkboxes = ['online', 'larger', 'customizable'];

  let anyCheckboxChecked = false; // Potrebno za vidljivost elementa hr

  checkboxes.forEach(checkboxId => {
    const isChecked = localStorage.getItem(checkboxId) === 'true';

    if (isChecked) {
      anyCheckboxChecked = true; // Ako je bilo koji checkbox čekiran, postavlja na true
      const storedTitle = localStorage.getItem(`${checkboxId}_title`);
      const storedPrice = localStorage.getItem(`${checkboxId}_price`);
      appendDataToFinishWrapper(storedTitle, storedPrice);
    }
  });

  // Upravljanje vidljivošću elementa <hr>
  const separator = document.getElementById('separator');
  if (anyCheckboxChecked) {
    separator.style.display = 'block'; // Vidljiv ako je bilo koji checkbox čekiran
  } else {
    separator.style.display = 'none';  // Nevidljiv ako nijedan checkbox nije čekiran
  }

  // Kreiranje elementa za svaki čekirani add
  function appendDataToFinishWrapper(title, price) {
    const addFinishElementDiv = document.createElement('div');
    addFinishElementDiv.classList.add('add-finish');
    addFinishElementDiv.classList.add('el-padding');

    const addTitleElement = document.createElement('h5');
    addTitleElement.classList.add('add-title');
    addTitleElement.textContent = title;

    const addPriceElement = document.createElement('h5');
    addPriceElement.classList.add('add-price');
    addPriceElement.textContent = price;

    addFinishElementDiv.appendChild(addTitleElement);
    addFinishElementDiv.appendChild(addPriceElement);

    addFinishWrapper.appendChild(addFinishElementDiv);
  }

  // Preuzimanje cijene plana iz Local Storage
  const start = lastClickedPlanPrice.indexOf("$");
  const end = lastClickedPlanPrice.indexOf("/");
  // Izdvaja deo između znakova "$" i "/"
  let planPrice = lastClickedPlanPrice.substring(start + 1, end);
  planPrice = parseInt(planPrice);

  // Preuzimanje cijene za svaki čekirani add
  checkboxes.forEach(checkboxId => {
    const isChecked = localStorage.getItem(checkboxId) === 'true';

    if (isChecked) {
      let storedPrice = localStorage.getItem(`${checkboxId}_price`);
      // Izračunavanje ukupne cene
      const start = storedPrice.indexOf("+");
      const end = storedPrice.indexOf("/");
      // Izdvaja deo između znakova "+" i "/"
      storedPrice = storedPrice.substring(start + 2, end);
      storedPrice = parseInt(storedPrice);
      planPrice += storedPrice;
    }
  });

  // Ispisivanja ukupne cijene
  const totalPrice = document.getElementById('total-price');
  // Uzimanje iz localStorage informacije o stanju polja
  const storedInputState = JSON.parse(localStorage.getItem("mode"));
  if (storedInputState) {
  // Kada jeste čekirano
  totalPrice.textContent = `$${planPrice}/yr`;
  } else {
  // Kada nije čekirano
  totalPrice.textContent = `$${planPrice}/mo`;
  }
});


/* ODLAZAK NA PRETHODNU STRANICU */
let prevBtn = document.getElementById('go-to-page3');
prevBtn.addEventListener('click', () => {
  window.location.href = 'page_3.html';
});
/* ODLAZAK NA SLEDEĆU STRANICU */
let nextBtn = document.getElementById('go-to-page5');
nextBtn.addEventListener('click', () => {
  window.location.href = 'page_5.html';
});
