const scrollBtn = document.getElementById('scrollBtn');

//display or hide back to top button
function displayHideBackToTop() {
  if (window.scrollY > 300) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
}

//scroll to top
function backToTop(event) {
  event.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

window.addEventListener('scroll', displayHideBackToTop);

scrollBtn.addEventListener('click', e => backToTop(e));
