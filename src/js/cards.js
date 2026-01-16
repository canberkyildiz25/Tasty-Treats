import sprite from '../svg/sprite.svg';
import nothingGif from '../img/nothing.gif';
import iziToast from 'izitoast';
import { pagination } from './form/custom-form.js';
import { openModal, initModal, addModalFavListeners } from './modal.js';
import { add } from 'lodash';

export const cardsList = document.querySelector('.cards-list');
export let favArr = JSON.parse(localStorage.getItem('favArr')) || [];

// This is a comment line

// HTTP request for all recipes and display them
export async function fetchRecipes() {
    try {
        // Fetch recipe data from the API
        const response = await fetch(
            'https://tasty-treats-backend.p.goit.global/api/recipes?limit=9'
        );
        const data = await response.json();

        // Call the function to display recipes
        displayRecipes(data.results);
        return data.totalPages;
    } catch (error) {
        iziToast.error({
            title: '',
            message: `Sorry! An error occurred while fetching recipes. Please try again!`,
            position: 'topRight',
        });

        console.error('Error fetching API data:', error);
        return 'error';
    }
}

// Displaying recipes on the page
export function displayRecipes(recipes) {
    const favArr = localStorage.getItem('favArr')
        ? JSON.parse(localStorage.getItem('favArr'))
        : [];

    cardsList.innerHTML = '';
    if (recipes.length === 0) {
        cardsList.innerHTML = `
    <div class="no-results-container">
      <p class="no-results-text">Sorry! No results were found that match your filters.</p>
      <img class="no-results" src="${nothingGif}"></img>
    </div>`;
        pagination.classList.add('hidden');
    } else {
        pagination.classList.remove('hidden');
        recipes.forEach(recipe => {
            // Create stars for rating
            const filledStars = Math.round(recipe.rating);
            const emptyStars = 5 - filledStars;

            const cardHTML = `
      <li class="cards-listing" style="background-image: url(${recipe.preview
                });">
      <button class="heard-button add-to-fav" data-category="${recipe.category
                }" data-id="${recipe._id}" aria-label="like-btn">
         <svg class="svg-heard add-to-fav" data-id="${recipe._id
                }" width="22px" height="22px">
            <use class="add-to-fav svguse" href="${sprite}#${favArr.includes(recipe._id) ? 'icon-heart-filled' : 'icon-heart'
                }"></use>
        </svg></button>

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
              
            <button class="recipe-button" data-id="${recipe._id
                }">See recipe</button>
        </div>      
      </li>
    `;

            cardsList.insertAdjacentHTML('beforeend', cardHTML);
        });
        addRecipeButtonListeners();
    }
}

// Update the event listener for recipe buttons
function addRecipeButtonListeners() {
    const recipeButtons = document.querySelectorAll('.recipe-button');
    recipeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const recipeId = this.getAttribute('data-id');
            openModal(recipeId);
        });
    });
}

// Updates local storage for fav recipes
function updateLocalStorage() {
    localStorage.setItem('favArr', JSON.stringify(favArr));
}

// Add or remove a recipe from favArr and update localStorage
function addRemoveFav(e) {
    const favButton = e.target.closest('.heard-button');
    if (favButton) {
        const id = favButton.dataset.id;
        const emptyHeart = favButton.querySelector('.svguse');
        if (favArr.includes(id)) {
            favArr.splice(favArr.indexOf(id), 1);
            emptyHeart.setAttribute('href', `${sprite}#icon-heart`);
        } else {
            favArr.push(id);
            emptyHeart.setAttribute('href', `${sprite}#icon-heart-filled`);
        }
        localStorage.setItem('favArr', JSON.stringify(favArr)); // Update localStorage after changing favArr
    }
}

// Initialize the page only if it's not the favorites page
if (window.location.pathname !== '/tasty-treats/favorites.html') {
    document.addEventListener('DOMContentLoaded', () => {
        // Add event listener to cardsList for adding/removing favs
        if (cardsList) {
            cardsList.addEventListener('click', e => addRemoveFav(e));
        }

        setTimeout(() => {
            fetchRecipes().then(() => {
                addRecipeButtonListeners(); // Add listeners after recipes are loaded
                initModal(); // Initialize modal functionality
            });
        }, 100);

        // Initialize favArr from localStorage if it exists
        const storedFavArr = localStorage.getItem('favArr');
        if (storedFavArr) {
            favArr = JSON.parse(storedFavArr);
        }
    });
}
// EXPORT FAV PAGE FUNCTION
export function getCardHTML(recipe) {
    const filledStars = Math.round(recipe.rating);
    const emptyStars = 5 - filledStars;
    return `
    <li class="cards-listing" style="background-image: url(${recipe.preview})">
      <!-- ... (rest of the card HTML) ... -->
    </li>
  `;
} // to export fav page