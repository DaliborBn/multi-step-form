/* MJENJAMO GODIŠNJU I MJESEČNU CIJENU */
const infoPlans = document.querySelectorAll(".plan-info");

// Ovom petljom prolazimo kroz svaki element sa klasom .plan-info (petlja se izvršava odmah po učitavanju stranice)
infoPlans.forEach((infoPlan) => {
  const inputEl = document.querySelector(".input");
  let priceEl = infoPlan.querySelector(".price");
  let priceValue = priceEl.innerText;
  const monthFree = infoPlan.querySelector(".month-free");

  const monthToogle = document.querySelector(".month");
  const yearToogle = document.querySelector(".year");
  
  const start = priceValue.indexOf("$");
  const end = priceValue.indexOf("/");
  // Izdvaja deo između znakova "$" i "/"
  let price = priceValue.substring(start + 1, end);
  price = parseInt(price);
  let yearPrice = price * 10;

  // Funkcija 
  function updatePrice() {
    if (inputEl.checked) {
      monthFree.style.display = "block";
      priceEl.textContent = `$${yearPrice}/yr`;
      monthToogle.style.color = "white"
      yearToogle.style.color = "#FF9800"
    } else {
      monthFree.style.display = "none";
      priceEl.textContent = `$${price}/mo`
      monthToogle.style.color = "#FF9800"
      yearToogle.style.color = "white"
    }
  }

  // Funkcija
  function updateLocalStorage() {
    // Skladištenje trenutnog stanja checkbox-a u Local Storage
    localStorage.setItem("mode", JSON.stringify(inputEl.checked));
    // Pokretanje funkcije
    saveLastClickedPlan();
  }

  // Pri promjeni stanja checkbox-a (klikom na checkbox) pozivaju se funkcije...
  inputEl.addEventListener("change", () => {
    updatePrice();
    updateLocalStorage();
  });

  // Pri povratku na stranicu na osnovu stanja checkbox-a zapamćenog u Local Storage-u postavlja se cijena mo/yr
  inputEl.checked = JSON.parse(localStorage.getItem("mode"));
  if (inputEl.checked) {
    updatePrice();
  }
});

/* DA PO DEFAULT-U BUDE OZNAČEN PLAN -ARCADE- */
// Provjeravamo da li u Local Storage već postoji zapis o posljednje kliknutom planu
const existingLastClickedPlanId = localStorage.getItem('lastClickedPlan');
if (!existingLastClickedPlanId) {
  // Ako ne postoji zapis o posljednje kliknutom planu, postavljamo ga kao "arcade"
  localStorage.setItem('lastClickedPlan', 'arcade');

  // Postavljamo vrednosti za lastClickedPlanName i lastClickedPlanPrice na osnovu elementa sa id "arcade"
  const arcadePlan = document.getElementById('arcade');
  if (arcadePlan) {
    const planName = arcadePlan.querySelector('.plan-name').innerText;
    const price = arcadePlan.querySelector('.price').innerText;
    localStorage.setItem('lastClickedPlanName', planName);
    localStorage.setItem('lastClickedPlanPrice', price);
  }
}


/* POSTAVLJANJE STILA ZA KLIKNUTI PLAN */
const planElements = document.querySelectorAll('.plan');
const lastClickedPlanId = localStorage.getItem('lastClickedPlan');

// Ovom petljom prolazimo kroz svaki element sa klasom .plan (okidač je klik na bilo koji element sa klasom .plan)
planElements.forEach((plan) => {
  plan.addEventListener('click', () => {
    // Dobijamo ID kliknutog elementa
    const clickedPlanId = plan.id;

    // Uklanjanje klase "clicked" sa svih elemenata
    planElements.forEach((element) => {
      element.classList.remove('clicked');
    });

    // Dodavanje klase "clicked" samo kliknutom elementu
    plan.classList.add('clicked');

    // Skladištenje ID-a kliknutog plana u Local Storage (ovo iznad koristimo za const lastClickedPlanId)
    localStorage.setItem('lastClickedPlan', clickedPlanId);

    // Pokretanje funkcije za čuvanje sadržaja poslednjeg kliknutog plana u Local Storage
    saveLastClickedPlan();
  });
});

// Funkcija za čuvanje sadržaja poslednjeg kliknutog plana u Local Storage
function saveLastClickedPlan() {
  const clickedPlan = document.querySelector('.plan.clicked');
  // Ako clickedPlan postoji izvršiće se skladištenje u Local Storage
  if (clickedPlan) {
    const planName = clickedPlan.querySelector('.plan-name').innerText;
    const price = clickedPlan.querySelector('.price').innerText;
    localStorage.setItem('lastClickedPlanName', planName);
    localStorage.setItem('lastClickedPlanPrice', price);
  }
}


/* POSTAVLJANJE STILA ZA KLIKNUTI PLAN NAKON POVRATKA NA STRANICU */
function setClickedPlanStyle() {
  planElements.forEach((plan) => {
    // Elemenat klase .plan čiji ID (a imamo tri elementa sa id: arcade, advanced i pro) poklopi sa lastClickedPlanId dobiće klasu .clicked
    plan.classList.toggle('clicked', plan.id === lastClickedPlanId); 
  });
}

// Pokretanje funkcije nakon učitavanja stranice
window.addEventListener('load', () => {
  setClickedPlanStyle();
});


/* ODLAZAK NA PRETHODNU STRANICU */
let prevBtn = document.getElementById('go-to-page1');
prevBtn.addEventListener('click', () => {
  window.location.href = '../index.html';
});
/* ODLAZAK NA SLEDEĆU STRANICU */
let nextBtn = document.getElementById('go-to-page3');
nextBtn.addEventListener('click', () => {
  window.location.href = 'page_3.html';
});


