import racoon from '../img/raccoon-sad-fav.png';
import sprite from '../svg/sprite.svg';

const messageContainer = document.getElementById('message-container'); // to select message container
let currentCategory = 'All Categories';
let previousSelectedButton = null;
let currentPage = 1;
const recipesPerPage = 12;
import { openModal, initModal } from './modal.js';

// to fetch ids from local storage
function getFavoriteIds() {
  const favArrString = localStorage.getItem('favArr');
  return favArrString ? JSON.parse(favArrString) : [];
}

// async function to fetch data
async function fetchById(id) {
  try {
    const response = await fetch(
      `https://tasty-treats-backend.p.goit.global/api/recipes/${id}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const recipe = await response.json();
    return recipe;
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    return null;
  }
}

// to fetch all recipes that user selected as favorite
async function fetchFavorites() {
  const favoriteIds = getFavoriteIds();
  try {
    const recipes = await Promise.all(favoriteIds.map(id => fetchById(id)));
    return recipes.filter(recipe => recipe !== null);
  } catch (error) {
    console.error('Error fetching favorite recipes:', error);
    return [];
  }
}

function addRecipeButtonListeners() {
  const recipeButtons = document.querySelectorAll('.recipe-button');
  recipeButtons.forEach(button => {
    button.addEventListener('click', function () {
      const recipeId = this.getAttribute('data-id');
      openModal(recipeId);
    });
  });
}

// to display recipes
async function renderFavoriteRecipes(page = 1) {
  const recipes = await fetchFavorites();
  currentPage = page;

  if (recipes.length === 0) {
    // Display a message if no favorite recipes are found
    messageContainer.innerHTML = `
        <div class="fav-message-container">
            <img src="${racoon}" class="fav-raccoon">
            <p class="fav-message">It appears that you haven't added any recipes to your favorites yet. To get started, you can add recipes that you like to your favorites for easier access in the future.</p>
            <img src="${racoon}" class="fav-chefs-hat">
        </div>
        `;
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';
  } else {
    // Extract categories from recipes and store in local storage
    const categories = [...new Set(recipes.map(recipe => recipe.category))];
    localStorage.setItem('favArrCategory', JSON.stringify(categories));

    renderCategoryNames();
    renderRecipes(recipes, page);
    renderPaginationControls(recipes.length, page);
    addRecipeButtonListeners();
  }
}

function renderRecipes(recipes, page) {
  const favoriteCards = document.querySelector('.favorite-cards');
  favoriteCards.innerHTML = '';

  const start = (page - 1) * recipesPerPage;
  const end = start + recipesPerPage;
  const recipesToDisplay = recipes.slice(start, end);

  recipesToDisplay.forEach(recipe => {
    const filledStars = Math.round(recipe.rating);
    const emptyStars = 5 - filledStars;
    const cardHTML = `
        <li class="cards-listing" style="background-image: url(${
          recipe.preview
        });">
            <button class="heard-button" data-category="${
              recipe.category
            }" data-id="${recipe._id}" aria-label="like-btn">
                <svg class="svg-heard add-to-fav" data-id="${
                  recipe._id
                }" width="22px" height="22px">
                    <use href="${sprite}#icon-heart-filled"></use>
                </svg>
            </button>
            <div class="card-content-container">
                <div class="text-container">
                    <h3 class="card-title">${recipe.title}</h3>
                    <p class="specification-text">${recipe.description}</p>
                </div>
                <div class="card-rating-container">
                    <div class="rating-container">
                        <p class="rating-text">${recipe.rating.toFixed(1)}</p>
                        <div class="star-container">
                            ${`<svg class="card-star-svg">
                            <use href="${sprite}#icon-star"></use>
                            </svg>`.repeat(filledStars)}
                            ${`<svg class="card-star-svg">
                            <use href="${sprite}#icon-emptystar"></use>
                            </svg>`.repeat(emptyStars)}
                        </div>    
                    </div>
                    <button class="recipe-button" data-id="${
                      recipe._id
                    }">See recipe</button>
                </div>      
            </div>
        </li>
        `;
    favoriteCards.innerHTML += cardHTML;
  });

  favoritesHeartBtn();
  addHeartButtonListeners();
}

function renderPaginationControls(
  totalRecipes,
  currentPage,
  category = 'All Categories'
) {
  const totalPages = Math.ceil(totalRecipes / recipesPerPage);
  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = `
        <div class="left-arrow-container">
            <button id="doubleLeft" class="pagination-btn left-end" ${
              currentPage === 1 ? 'disabled' : ''
            }>
                &laquo;
            </button>
            <button id="singleLeft" class="pagination-btn left-one" ${
              currentPage === 1 ? 'disabled' : ''
            }>
                &lsaquo;
            </button>
        </div>
        <div class="number-container">
        </div>
        <div class="right-arrow-container">
            <button id="singleRight" class="right-one pagination-btn" ${
              currentPage === totalPages ? 'disabled' : ''
            }>
                &rsaquo;
            </button>
            <button id="doubleRight" class="right-end pagination-btn" ${
              currentPage === totalPages ? 'disabled' : ''
            }>
                &raquo;
            </button>
        </div>
    `;

  const numberContainer =
    paginationContainer.querySelector('.number-container');

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.classList.add('pagination-btn', 'page-number');
    if (i === currentPage) {
      pageButton.classList.add('active-page');
    }
    pageButton.addEventListener('click', () => {
      if (category === 'All Categories') {
        renderFavoriteRecipes(i);
      } else {
        filterRecipesByCategory(category, i);
      }
    });
    numberContainer.appendChild(pageButton);
  }

  // Add event listeners for the arrow buttons
  paginationContainer
    .querySelector('#doubleLeft')
    .addEventListener('click', () => {
      if (category === 'All Categories') {
        renderFavoriteRecipes(1);
      } else {
        filterRecipesByCategory(category, 1);
      }
    });

  paginationContainer
    .querySelector('#singleLeft')
    .addEventListener('click', () => {
      if (category === 'All Categories') {
        renderFavoriteRecipes(currentPage - 1);
      } else {
        filterRecipesByCategory(category, currentPage - 1);
      }
    });

  paginationContainer
    .querySelector('#singleRight')
    .addEventListener('click', () => {
      if (category === 'All Categories') {
        renderFavoriteRecipes(currentPage + 1);
      } else {
        filterRecipesByCategory(category, currentPage + 1);
      }
    });

  paginationContainer
    .querySelector('#doubleRight')
    .addEventListener('click', () => {
      if (category === 'All Categories') {
        renderFavoriteRecipes(totalPages);
      } else {
        filterRecipesByCategory(category, totalPages);
      }
    });
}
function favoritesHeartBtn() {
  const likeButtons = document.querySelectorAll('.heard-button');
  likeButtons.forEach(button => {
    button.addEventListener('click', async function () {
      const recipeId = button.dataset.id;
      const recipeCategory = button.dataset.category;
      const favArrString = localStorage.getItem('favArr');
      let favArr = favArrString ? JSON.parse(favArrString) : [];

      if (favArr.includes(recipeId)) {
        favArr.splice(favArr.indexOf(recipeId), 1);
        localStorage.setItem('favArr', JSON.stringify(favArr));
      }

      // Fetch all favorite recipes to check categories
      const recipes = await fetchFavorites();

      // Check if there are any remaining recipes of the same category
      const remainingRecipes = recipes.filter(
        recipe => recipe.category === recipeCategory
      );

      if (remainingRecipes.length === 0) {
        const favArrCategoryString = localStorage.getItem('favArrCategory');
        let favArrCategory = favArrCategoryString
          ? JSON.parse(favArrCategoryString)
          : [];

        if (favArrCategory.includes(recipeCategory)) {
          favArrCategory.splice(favArrCategory.indexOf(recipeCategory), 1);
          localStorage.setItem(
            'favArrCategory',
            JSON.stringify(favArrCategory)
          );
        }

        // Switch to "All Categories" if the current category becomes empty
        currentCategory = 'All Categories';
        if (previousSelectedButton) {
          previousSelectedButton.style.backgroundColor = '';
          previousSelectedButton.style.color = '';
          previousSelectedButton.style.border = '';
        }
        const allCategoriesButton = document.querySelector(
          '.fav-categories-list button:first-child'
        );
        allCategoriesButton.style.backgroundColor = 'var(--primary-color)';
        allCategoriesButton.style.color = '#fff';
        allCategoriesButton.style.border = '1px solid var(--primary-color)';
        previousSelectedButton = allCategoriesButton;
      }

      renderCategoryNames();
      if (currentCategory === 'All Categories') {
        renderFavoriteRecipes();
      } else {
        filterRecipesByCategory(currentCategory);
      }
    });
  });
}
function addHeartButtonListeners() {
  const likeButtons = document.querySelectorAll('.heard-button');
  let favCategoryArr = [];
  likeButtons.forEach(button => {
    if (!favCategoryArr.includes(button.dataset.category)) {
      favCategoryArr.push(button.dataset.category);
    }
  });
  favCategoryArr.sort();
}

function renderCategoryNames() {
  const favCategoriesList = document.querySelector('.fav-categories-list');
  const favArrCategoryString = localStorage.getItem('favArrCategory');
  let favArrCategory = favArrCategoryString
    ? JSON.parse(favArrCategoryString)
    : [];
  favCategoriesList.innerHTML = '';

  const allCategoriesLi = document.createElement('li');
  const allCategoriesButton = document.createElement('button');
  allCategoriesButton.textContent = 'All Categories';
  allCategoriesButton.classList.add('category-button');
  allCategoriesButton.addEventListener('click', () => {
    currentCategory = 'All Categories';
    if (previousSelectedButton) {
      previousSelectedButton.style.backgroundColor = '';
      previousSelectedButton.style.color = '';
      previousSelectedButton.style.border = '';
    }
    allCategoriesButton.style.backgroundColor = 'var(--primary-color)';
    allCategoriesButton.style.color = '#fff';
    allCategoriesButton.style.border = '1px solid var(--primary-color)';
    previousSelectedButton = allCategoriesButton;
    renderFavoriteRecipes();
  });
  allCategoriesLi.appendChild(allCategoriesButton);
  favCategoriesList.appendChild(allCategoriesLi);

  favArrCategory.forEach(category => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = category;
    button.classList.add('category-button');
    button.addEventListener('click', () => {
      currentCategory = category;
      if (previousSelectedButton) {
        previousSelectedButton.style.backgroundColor = '';
        previousSelectedButton.style.color = '';
        previousSelectedButton.style.border = '';
      }
      button.style.backgroundColor = 'var(--primary-color)';
      button.style.color = '#fff';
      button.style.border = '1px solid var(--primary-color)';
      previousSelectedButton = button;
      filterRecipesByCategory(category);
    });
    li.appendChild(button);
    favCategoriesList.appendChild(li);
  });
}

async function filterRecipesByCategory(category, page = 1) {
  const recipes = await fetchFavorites();
  const filteredRecipes = recipes.filter(
    recipe => recipe.category === category
  );
  renderRecipes(filteredRecipes, page);
  renderPaginationControls(filteredRecipes.length, page, category);
}
document.addEventListener('DOMContentLoaded', () =>
  renderFavoriteRecipes().then(() => {
    initModal();
  })
);
