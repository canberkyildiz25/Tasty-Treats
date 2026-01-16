// Gerekli DOM elementlerini seçiyoruz
import { displayRecipes, cardsList } from './cards.js';
import { displayLoader, hideLoader } from './form/form-read.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const pagination = document.querySelector('.pagination');
const pageButtons = document.querySelectorAll('.page-number');
const singleLeft = document.getElementById('singleLeft');
const singleRight = document.getElementById('singleRight');
const doubleLeft = document.getElementById('doubleLeft');
const doubleRight = document.getElementById('doubleRight');

let currentPage = 1;
let totalPages = 1;
let allPages = null;
// Sayfa yüklendiğinde çalışacak fonksiyon
async function initPagination() {
  totalPages = await fetchRecipes();
  allPages = totalPages;
  updatePageButtons();
}
async function getRecipesOnPage(url) {
  cardsList.innerHTML = '';
  displayLoader();
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('An error occurred while fetching recipes');
    }
    const data = await response.json();
    displayRecipes(data.results);
  } catch (error) {
    iziToast.error({
      title: '',
      message: `Sorry! An error occurred while fetching recipes please try again!`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
// Toplam sayfa sayısını almak için API'ye istek gönderen fonksiyon
async function fetchRecipes() {
  try {
    const response = await fetch(
      'https://tasty-treats-backend.p.goit.global/api/recipes?limit=9'
    );
    const data = await response.json();
    return data.totalPages;
  } catch (error) {
    console.error('API verisi alınırken hata oluştu:', error);
    return 1; // Hata durumunda varsayılan olarak 1 sayfa döndür
  }
}

// Sayfa butonlarını güncelleyen fonksiyon
function updatePageButtons() {
  let balance = -1;
  if (currentPage == totalPages && totalPages != 1) {
    balance = -2;
  }
  if (currentPage != totalPages && currentPage == 1) {
    balance = 0;
  }
  pageButtons.forEach((button, index) => {
    const pageNum = currentPage + balance + index;
    button.textContent = pageNum;
    button.classList.toggle('active-page', pageNum == currentPage);
    button.style.display =
      pageNum > 0 && pageNum <= totalPages ? 'inline-block' : 'none';
  });

  // Navigasyon butonlarının durumunu güncelle
  singleLeft.disabled = currentPage == 1;
  doubleLeft.disabled = currentPage == 1;
  singleRight.disabled = currentPage == totalPages;
  doubleRight.disabled = currentPage == totalPages;
}

// Sayfa değiştirme fonksiyonu
function changePage(newPage, from) {
  totalPages = localStorage.getItem('totalPage')
    ? Number(localStorage.getItem('totalPage'))
    : allPages;

  if (newPage >= 1 && newPage <= totalPages) {
    currentPage = newPage;
    updatePageButtons();
  }
  if (from == 'page-number') {
    requestPage(newPage);
  }
}
export { changePage };
// Yeni sayfa için istek gönderen fonksiyon
function requestPage(page) {
  const time = localStorage.getItem('time');
  const category = localStorage.getItem('category')
    ? localStorage.getItem('category')
    : '';
  const area = localStorage.getItem('area');
  const ingredient = localStorage.getItem('ingredient');
  const title = localStorage.getItem("title");
  getRecipesOnPage(
    `https://tasty-treats-backend.p.goit.global/api/recipes?category=${category}&page=${page}&limit=9&time=${time}&area=${area}&ingredient=${ingredient}&title=${title}`
  );
}

// Event listener'ları ayarlama
pagination.addEventListener('click', e => {
  if (e.target.classList.contains('page-number')) {
    changePage(parseInt(e.target.textContent), 'page-number');
  } else if (e.target.id === 'singleLeft') {
    changePage(currentPage - 1, 'page-number');
  } else if (e.target.id === 'singleRight') {
    changePage(currentPage + 1, 'page-number');
  } else if (e.target.id === 'doubleLeft') {
    changePage(1, 'page-number');
  } else if (e.target.id === 'doubleRight') {
    changePage(totalPages, 'page-number');
  }
});

// Sayfalama başlatma
document.addEventListener('DOMContentLoaded', initPagination);
