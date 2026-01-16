import { openModal, initModal, closeModal } from './modal.js'; // Modal fonksiyonlarını import ediyoruz

document.addEventListener('DOMContentLoaded', () => {
  // initModal(); // Sayfa yüklendiğinde modal'ı başlatıyoruz
  fetchData(); // API'den veriyi çekiyoruz
});

async function fetchData() {
  try {
    const response = await fetch(
      'https://tasty-treats-backend.p.goit.global/api/recipes/popular'
    );
    const data = await response.json();

    const recipes = data;

    const popularRecipes = document.querySelector('#popular-recipes-gallery');
    popularRecipes.innerHTML = '';

    const fragment = document.createDocumentFragment();

    recipes.forEach((recipe, index) => {
      const li = document.createElement('li');

      const recipeContainer = document.createElement('div');
      recipeContainer.classList.add('recipe-container');

      // Üçüncü ve dördüncü recipe-container'a özel bir sınıf ekle
      if (index === 2 || index === 3) {
        recipeContainer.classList.add('mobile-special');
      }

      const image = document.createElement('img');
      image.src = recipe.preview || 'default-image.jpg';
      image.alt = recipe.title || 'Unknown Recipe';
      image.width = 64;
      image.height = 64;

      // Resimlere tıklanınca ilgili recipe _id ile modal açılıyor
      // image.addEventListener('click', () => {
      //   if (recipe._id) {
      //     openModal(recipe._id); // _id'yi gönderiyoruz
      //   } else {
      //     console.warn('Recipe ID is undefined!');
      //   }
      // });

      const contentDiv = document.createElement('div');
      contentDiv.classList.add('recipe-content');

      const title = document.createElement('h2');
      title.textContent = recipe.title || 'Unknown Recipe';
      title.classList.add('recipe-content-title');

      const instructions = document.createElement('p');
      instructions.textContent =
        recipe.description || 'No instructions provided';
      instructions.classList.add('recipe-content-instructions');

      contentDiv.appendChild(title);
      contentDiv.appendChild(instructions);
      recipeContainer.appendChild(image);
      recipeContainer.appendChild(contentDiv);

      li.appendChild(recipeContainer);
      fragment.appendChild(li);
    });

    popularRecipes.appendChild(fragment);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
