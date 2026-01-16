import sprite from '../svg/sprite.svg';
import { favArr } from './cards';
// modal.js
export function initModal() {
  const modal = document.getElementById('recipeModal');
  const closeButton = modal.querySelector('.modal-close-button');

  closeButton.onclick = closeModal;

  window.onclick = function (event) {
    if (event.target === modal) {
      closeModal();
    }
  };

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
}

export async function openModal(recipeId) {
  const modal = document.getElementById('recipeModal');
  const modalContent = modal.querySelector('.modal-content');

  // Show loading state
  modalContent.innerHTML = '<p>Loading recipe details...</p>';
  modal.style.display = 'block';

  try {
    const response = await fetch(
      `https://tasty-treats-backend.p.goit.global/api/recipes/${recipeId}`
    );
    const recipe = await response.json();
    const instructions = recipe.instructions.split('.').join('<br>');
    const filledStars = Math.round(recipe.rating);
    const emptyStars = 5 - filledStars;

    // Update modal content with recipe details
    modalContent.innerHTML = `
        <div class= "modal-heading">
          <div style="flex: 1;">
            <iframe class="modal-iframe" src="https://www.youtube.com/embed/${new URL(
              recipe.youtube
            ).searchParams.get('v')}" frameborder="0" allowfullscreen></iframe>
          </div>
        <div class="modal-recipe-container" style="flex: 1;">
        <h2>${recipe.title}</h2>
        <div class="modal-rating-container">
        <div class="modal-star-container">
              <div class="rating-container">
                  <p class="rating-text">${recipe.rating.toFixed(1)}</p>
                  <div class="star-container">
                    ${`<svg class="card-star-svg">
                    <use href="${sprite}#icon-star"></use>
                      </svg>`.repeat(filledStars)}

                    ${`<svg class="card-star-svg modal-empty-star">
                    <use href="${sprite}#icon-emptystar-modal"></use>
                    </svg>`.repeat(emptyStars)}
                  </div>    
                </div>
        </div>
        <p class="cooking-time">${recipe.time} min</p>
        </div>
        <div class="modal-recipe-ingredients-container">
        <!-- <h3>Ingredients:</h3> -->
        <ul class="modal-recipe-ingredients">
          ${recipe.ingredients
            .map(
              ing =>
                `<li class="modal-recipe-ingredients-item"><p class="ingredient">${ing.name}</p><p class="ingredient-portion"> ${ing.measure}</p></li>`
            )
            .join('')}
        </ul>
        </div>
        </div>
        </div>
        <p class="modal-recipe-instructions">${instructions}</p>
        <div style="display: flex; gap: 20px; margin-top: 20px;">
          <button class="addToFavoriteButton">Add to Favorite</button>
          <button class="giveRatingButton">Give a Rating</button>
        </div>
        </div>
      `;
    addModalFavListeners(recipeId);
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    modalContent.innerHTML =
      '<p>Error loading recipe details. Please try again.</p>';
  }
}

export function closeModal() {
  const modal = document.getElementById('recipeModal');
  modal.style.display = 'none';
}

export function addModalFavListeners(recipeId) {
  const addToFavBtn = document.querySelector('.addToFavoriteButton');
  if (localStorage.getItem('favArr') === null) {
    localStorage.setItem('favArr', JSON.stringify([]));
  }
  if (favArr.includes(recipeId)) {
    addToFavBtn.textContent = 'Added to Favorites';
  } else {
    const addToFavorites = function () {
      const favButton = document.querySelector(`svg[data-id="${recipeId}"]`);
      const emptyHeart = favButton.querySelector('.svguse');
      emptyHeart.setAttribute('href', `${sprite}#icon-heart-filled`);
      favArr.push(recipeId);
      localStorage.setItem('favArr', JSON.stringify(favArr));
      addToFavBtn.textContent = 'Added to Favorites';
      addToFavBtn.removeEventListener('click', addToFavorites); // Remove the event listener
    };
    addToFavBtn.addEventListener('click', addToFavorites);
  }
}