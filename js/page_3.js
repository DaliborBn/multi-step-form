/* KLIK NA CHECKBOX-A */
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Funkcija koja reaguje na promenu stanja checkbox-a, pokreće funkciju updateAddBorder 
function onCheckboxChange(event) {
  // Pomoću 'event' dobijamo na koji checkbox je kliknuto
  const checkbox = event.target;
  updateAddBorder(checkbox);
}

// Petlja kojom prolazimo kroz svaki checkbox kada se klikne na neki od tri checkbox-a
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', onCheckboxChange);
});

// Klikom na checkbox mjenja se boja elementa sa klasom .add
function updateAddBorder(checkbox) {
  const parentAdd = checkbox.closest('.add');
  if (checkbox.checked) {
    parentAdd.style.borderColor = '#473dff'; // Ako je checkbox čekiran
    parentAdd.style.background = '#d7d7d75c'; 
  } else {
    parentAdd.style.borderColor = ''; // Ako checkbox nije čekiran
    parentAdd.style.background = '#fff';
  }
}


/* PROMJENA CIJENE MO/YR */
// Promjena cijene u zavisnosti da li je checkbox na page_2.html čekiran ili ne
function handleInputState() {
  const addElements = document.querySelectorAll(".add");
    // Petljom prolazimo kroz sve elemente sa klasom .add
    addElements.forEach((addElement) => {
    let addPriceEl = addElement.querySelector(".add-price");
    let addPriceValue = addPriceEl.innerText;
    
    const start = addPriceValue.indexOf("+");
    const end = addPriceValue.indexOf("/");
    // Izdvaja deo između znakova "$" i "/"
    let addPrice = addPriceValue.substring(start + 2, end);
    addPrice = parseInt(addPrice);

    let yearPrice = addPrice * 10;
    
    // Uzimanje iz localStorage informacije o stanju checkbox-a na page_2.html
    const storedInputState = JSON.parse(localStorage.getItem("mode"));
    if (storedInputState) {
      // Kada jeste čekiran
      addPriceEl.textContent = `+$${yearPrice}/yr`;
    } else {
      // Kada nije čekiran
      addPriceEl.textContent = `+$${addPrice}/mo`;
    }
  });
}

// Funkcija kojom se mjenja cijena pokreće se pri učitavanju stranice 
window.addEventListener('load', () => {
  handleInputState();
});


/* SKLADIŠTENJE PODATAKA U LOCAL STORAGE, I ODLAZAK NA PRETHODNU I SLEDEĆU STRANICU */
// Funkcija koja ažurira Local Storage na temelju stanja checkbox-a
function updateLocalStorage(checkbox) {
  const parentAdd = checkbox.closest('.add');
  const parentId = parentAdd.id;
  const addTitle = parentAdd.querySelector('.add-title').textContent;
  const addPrice = parentAdd.querySelector('.add-price').textContent;

  localStorage.setItem(parentId, checkbox.checked);
  if (checkbox.checked) {
    localStorage.setItem(`${parentId}_title`, addTitle);
    localStorage.setItem(`${parentId}_price`, addPrice);
  }
}

/* ODLAZAK NA PRETHODNU STRANICU */
let prevBtn = document.getElementById('go-to-page2');
prevBtn.addEventListener('click', () => {
  checkboxes.forEach(checkbox => {
    updateLocalStorage(checkbox);
  });
  window.location.href = 'page_2.html';
});
/* ODLAZAK NA SLEDEĆU STRANICU */
let nextBtn = document.getElementById('go-to-page4');
nextBtn.addEventListener('click', () => {
  checkboxes.forEach(checkbox => {
    updateLocalStorage(checkbox);
  });
  window.location.href = 'page_4.html';
});


/* UZIMANJE STANJA IZ LOCAL STORAGE PRI UČITAVANJU STRANICE */
// Pozivanje funkcije za postavljanje stanja čekiranja i boje okvira iz Local Storage-a kada se stranica učita
document.addEventListener('DOMContentLoaded', () => {
  checkboxes.forEach(checkbox => {
    const parentId = checkbox.closest('.add').id;
    // Ako je vrednost iz Local Storage-a za dati ključ (parentId) 'true', onda će checkbox.checked biti postavljen na true i checkbox će biti čekiran
    checkbox.checked = localStorage.getItem(parentId) === 'true';
    updateAddBorder(checkbox);
  });
});