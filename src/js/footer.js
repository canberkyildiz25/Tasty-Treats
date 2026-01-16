document.addEventListener('DOMContentLoaded', function () {
  function openModal() {
    let modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  function closeModal() {
    let modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  // Modal dışına tıklama ile kapatma
  window.addEventListener('click', function (event) {
    let modal = document.getElementById('myModal');
    if (modal && event.target === modal) {
      closeModal();
    }
  });

  // Esc tuşuna basıldığında modalı kapatma
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {  // Esc tuşu
      closeModal();
    }
  });

  let openModalBtn = document.getElementById('openModalBtn');
  let closeModalBtn = document.getElementById('closeModalBtn'); // closeModelBtn to modal :p

  if (openModalBtn) {
    openModalBtn.addEventListener('click', openModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
});


