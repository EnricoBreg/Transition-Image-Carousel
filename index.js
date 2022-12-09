/* --------------------------
ELEMENTI DI INTERESSE DEL DOM
--------------------------- */
const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;

/* --------------------------
FUNZIONI
--------------------------- */

// Funzione che dispone le slide una di fianco all'altra
function setSlidePosition(slide, index) {
  slide.style.left = `${slideWidth * index}px`;
}

// Funzione per spostare le slide
function moveToSlide(currentSlide, targetSlide) {
  // 1. mi muovo alla slide successiva
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  // 2. Rimuovo la classe current-slide dalla slide corrent
  currentSlide.classList.remove("current-slide");
  // 3. Aggiungo la classe current-slide alla slide successiva
  targetSlide.classList.add("current-slide");
}

// Funzione per aggiornare i pulsanti
function updateDots(currentDot, targetDot) {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
}

// Funzione per mostrare o meno le frecce per muovere le slide
// Mostra le frecce in base alla slide corrente
function toggleArrows(targetIndex) {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
}

// Dispongo le slide una di fianco all'altra
slides.forEach(setSlidePosition);

// Quando clicco a sinistra, muovo la slide a sinistra
prevButton.addEventListener("click", (e) => {
  // 1. trovo la slide corrente e il pulsante corrente
  const currentSlide = track.querySelector(".current-slide");

  // 2. trovo la slide precedente
  const prevSlide = currentSlide.previousElementSibling;

  // 3. trovo i pulsanti da aggiornare successivamente
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;

  // 4. trovo l'indice della slide precedente
  const prevIndex = slides.findIndex((slide)=> slide === prevSlide);

  // 5. muovo la slide
  moveToSlide(currentSlide, prevSlide);
  // 6. aggiorno i pulsanti
  updateDots(currentDot, prevDot);
  // 7. faccio vedere o meno i pulsanti next e prev
  toggleArrows(prevIndex);
});

// Quando clicco a destra, muovo la slide a destra
nextButton.addEventListener("click", (e) => {
  // 1. trovo la slide corrent
  const currentSlide = track.querySelector(".current-slide");

  // 2. trovo quale è la slide successiva
  const nextSlide = currentSlide.nextElementSibling;

  // 3. trovo i pulsanti da aggiornare successivamente
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;

  // 4. trovo l'indice della slide successiva
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  // 5. muovo la slide
  moveToSlide(currentSlide, nextSlide);
  // 6. aggiorno i pulsanti
  updateDots(currentDot, nextDot);
  // 7. faccio vedere o meno i pulsanti next e prev
  toggleArrows(nextIndex);
});

// Quando clicco sull'indicatore, mi muovo fino a quella slide
dotsNav.addEventListener("click", (e) => {
  // 1. quale indicatore è stato premuto?
  const targetDot = e.target.closest("button");

  // quando clicco su qualcosa che non è il bottone fermo la funzione
  if (!targetDot) return;

  // 2. trovo la slide corrente
  const currentSlide = track.querySelector(".current-slide");

  // 3. trovo il pulsate che indica la slide corrente
  const currentDot = dotsNav.querySelector(".current-slide");

  // 4. trovo quale pulsate è stato premuto
  const targetIndex = dots.findIndex((dot) => dot === targetDot);

  // 5. stabilisco la slide a cui mi devo muovere
  const targetSlide = slides[targetIndex];

  // 6. mi muovo alla slide voluta
  moveToSlide(currentSlide, targetSlide);
  // 7. aggiorno i pulsanti
  updateDots(currentDot, targetDot);
  // 8. faccio vedere o meno i pulsanti next e prev
  toggleArrows(targetIndex);
});
