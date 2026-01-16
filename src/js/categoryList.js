const categoryList = document.querySelector('.category-items-list');
const allCategories = document.querySelector('.categories-button');
import { displayRecipes, cardsList } from './cards.js';
import { fetchRecipes } from './cards.js';
import { changePage } from './pagination.js';
import { loader } from './form/custom-form.js';
import { resetFilter, displayLoader, hideLoader } from './form/form-read.js';

async function fetchCategories() {
  const url = 'https://tasty-treats-backend.p.goit.global/api/categories';
  localStorage.setItem('category', '');
  try {
    const response = await fetch(url);
    const data = await response.json();
    const categories = data.map(category => category.name);
    createCategoryList(categories);
    categoryBtnClick();
  } catch (error) {
    console.log(error + 'fetching categories');
  }
}

async function fetchChosenCategory(categoryName) {
  const time = localStorage.getItem('time');
  const area = localStorage.getItem('area');
  const ingredient = localStorage.getItem('ingredient');
  const title = localStorage.getItem('title');

  const url = `https://tasty-treats-backend.p.goit.global/api/recipes?category=${categoryName}&page=1&limit=9&time=${time}&area=${area}&ingredient=${ingredient}&title=${title}`;
  try {
    cardsList.innerHTML = '';
    displayLoader();
    const response = await fetch(url);
    const data = await response.json();
    localStorage.setItem('totalPage', data.totalPages ? data.totalPages : 1);
    localStorage.setItem('category', categoryName);
    const recipes = data.results;
    displayRecipes(recipes);
  } catch (error) {
    console.log(error + 'fetching chosen category recipes');
  } finally {
    hideLoader();
    changePage(1, 'category-list');
  }
}

function categoryBtnClick() {
  const categoryBtns = document.querySelectorAll('.category-btn');
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      categoryBtns.forEach(button => {
        button.style.color = ''; //
      });
      e.target.style.color = 'var(--primary-color)';
      let categoryName = e.target.innerText;
      localStorage.setItem('category', categoryName);
      fetchChosenCategory(categoryName);
    });
  });
}

function createCategoryList(categories) {
  categories.forEach(category => {
    categoryList.innerHTML += `
            <li class="category-items"><button class="category-btn">${category}</button></li>
        `;
  });
}

// function resetMainCards() {
//   const cardList = document.querySelector('.cards-list');
//   const categoryBtns = document.querySelectorAll('.category-btn');
//   categoryBtns.forEach(button => {
//     button.style.color = '';
//   });
//   cardList.innerHTML = '';
//   localStorage.setItem('category', '');
//   fetchRecipes().then(data => {
//     localStorage.setItem('totalPage', data);
//   });
//   changePage(1);

//   resetFilter();
// }

allCategories.addEventListener('click', resetFilter);
document.addEventListener('DOMContentLoaded', fetchCategories);
