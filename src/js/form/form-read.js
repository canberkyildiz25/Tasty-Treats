//prettier-ignore
import {form, timeOptions, areaOptions, ingrOptions, searchInput, cancelBtn, resetBtn, timeTriggerText, areaTriggerText, ingrTriggerText,loader,pagination,} from './custom-form.js';
import { changePage } from '../pagination.js';
import { clearFormLocal } from './form-init.js';
import { displayRecipes, cardsList } from '../cards.js';

import debounce from 'lodash/debounce';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let queryUrl = `https://tasty-treats-backend.p.goit.global/api/recipes?category=&page=1&limit=9`;

//functions
//makes api call and calls displayRecipes function
export async function getQueryData(url) {
  try {
    cardsList.innerHTML = '';
    displayLoader();
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('An error occurred while fetching recipes');
    }
    const data = await response.json();
    localStorage.setItem('totalPage', data.totalPages ? data.totalPages : 1);
    changePage(1, 'form-read');
    displayRecipes(data.results);
  } catch (error) {
    iziToast.error({
      title: '',
      message: `Sorry! An error occurred while fetching recipes please try again!`,
      position: 'topRight',
    });
    console.log(error.message);
  } finally {
    hideLoader();
  }
}

//when click on select option it creates url and calls getQueryData function
function handleSelect(inputName, e) {
  if (e.target.tagName !== 'LI') return;

  const category = localStorage.getItem('category');
  const triggerText = document.getElementById(`${inputName}-trigger-text`);
  // const hiddenInput = document.getElementById(`${inputName}-hidden-input`);
  const options = document.getElementById(`${inputName}-options`);
  const queryValue = e.target.dataset[inputName];

  triggerText.textContent = e.target.textContent;
  localStorage.setItem(`${inputName}`, queryValue);

  //input verisini urlye ekleme
  queryUrl = queryUrl.includes(inputName)
    ? queryUrl.replace(
        new RegExp(`${inputName}=[^&]*`),
        `${inputName}=${queryValue}`
      )
    : `${queryUrl}&${inputName}=${queryValue}`;

  //localden gelen category verisini urlye ekleme
  queryUrl = queryUrl.includes('category')
    ? queryUrl.replace(/category=[^&]*/, `category=${category}`)
    : `${queryUrl}&category=${category}`;

  options.classList.add('hidden-dropdown');
  triggerText.classList.add('trigger-active');
  getQueryData(queryUrl);
}

//300ms after input stops it creates url calls getQueryData function
const handleInput = debounce(function () {
  //for display and hide cancel button
  if (searchInput.value !== '') {
    cancelBtn.classList.remove('hidden');
  } else {
    cancelBtn.classList.add('hidden');
  }

  const category = localStorage.getItem('category');
  const time = localStorage.getItem('time');
  const area = localStorage.getItem('area');
  const ingredient = localStorage.getItem('ingredient');
  const inputValue = searchInput.value.trim();

  queryUrl = `https://tasty-treats-backend.p.goit.global/api/recipes?category=${category}&page=1&limit=9&time=${time}&area=${area}&ingredient=${ingredient}&title=${inputValue}`;
  localStorage.setItem('title', searchInput.value ? inputValue : '');

  getQueryData(queryUrl);
}, 300);

//resets all filters on form
export function resetFilter() {
  queryUrl =
    'https://tasty-treats-backend.p.goit.global/api/recipes?category=&page=1&limit=9';

  [timeTriggerText, areaTriggerText, ingrTriggerText].forEach(trigger => {
    trigger.textContent = 'Select';
    trigger.classList.remove('trigger-active');
  });

  searchInput.value = '';

  const categoryBtns = document.querySelectorAll('.category-btn');
  categoryBtns.forEach(button => {
    button.style.color = '';
  });
  cancelBtn.classList.add('hidden');
  clearFormLocal();
  getQueryData(queryUrl);
}

//clears input value and hides cancel button
function clearInput() {
  searchInput.value = '';
  cancelBtn.classList.add('hidden');
  handleInput();
}

//displays loader on screen
export function displayLoader() {
  loader.classList.remove('hidden');
  pagination.classList.add('hidden-pagination');
}

//hides loader from screen
export function hideLoader() {
  loader.classList.add('hidden');
  pagination.classList.remove('hidden-pagination');
}

//hides options when clicked inside form but not on options
function hideOptions() {
  [timeOptions, areaOptions, ingrOptions].forEach(option =>
    option.classList.add('hidden-dropdown')
  );
}

//hide options when clicked outside form
function outsideClick(e) {
  if (form && !form.contains(e.target)) hideOptions();
}

//custom form functionality
function customForm(e) {
  let targetId = e.target.id;

  if (e.target.tagName === 'svg' || e.target.tagName === 'SPAN') {
    targetId = e.target.parentElement.id;
  }

  switch (targetId) {
    case 'time-trigger':
      timeOptions.classList.toggle('hidden-dropdown');
      break;
    case 'area-trigger':
      areaOptions.classList.toggle('hidden-dropdown');
      break;
    case 'ingredient-trigger':
      ingrOptions.classList.toggle('hidden-dropdown');
      break;
    default:
      if (e.target.tagName === 'LI') {
        const name = e.target.dataset.name;
        handleSelect(name, e);
      } else hideOptions();
  }
}

//event listeners
form.addEventListener('click', e => customForm(e));
searchInput.addEventListener('input', handleInput);
cancelBtn.addEventListener('click', clearInput);
resetBtn.addEventListener('click', resetFilter);
window.addEventListener('click', e => outsideClick(e));
