import { areaOptions, ingrOptions, timeOptions } from './custom-form.js';

const AREA_URL = 'https://tasty-treats-backend.p.goit.global/api/areas';
const INGR_URL = 'https://tasty-treats-backend.p.goit.global/api/ingredients';

//http request to get areas
async function getInsertAreas() {
  try {
    const response = await fetch(AREA_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch areas');
    }

    const data = await response.json();
    insertArea(data);
  } catch (error) {
    insertArea([{ name: 'Sorry no region to select' }]); //if error, display error message on options
  }
}

//insert areas in options
function insertArea(data) {
  data.forEach(area => {
    const html = `<li data-area="${area.name}" data-name="area" class="option">${area.name}</li>`;
    areaOptions.insertAdjacentHTML('beforeend', html);
  });
}

//http request to get ingredients
async function getInsertIngr() {
  try {
    const response = await fetch(INGR_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch ingredients');
    }

    const data = await response.json();
    insertIngr(data);
  } catch (error) {
    insertIngr([{ name: 'Sorry no ingredients to select' }]); //if error, display error message on options
  }
}

//insert ingredients in options
function insertIngr(data) {
  data.forEach(ingr => {
    const html = `<li data-ingredient="${ingr._id}" data-name="ingredient" class="option">${ingr.name}</li>`;
    ingrOptions.insertAdjacentHTML('beforeend', html);
  });
}

function insertTime() {
  for (let i = 5; i <= 120; i += 5) {
    const html = `<li data-time="${i}" data-name="time" class="option">${i} min</li>`;
    timeOptions.insertAdjacentHTML('beforeend', html);
  }
}

//clear local storage for form
export function clearFormLocal() {
  localStorage.setItem('time', '');
  localStorage.setItem('area', '');
  localStorage.setItem('ingredient', '');
  localStorage.setItem('title', '');
  localStorage.setItem('totalPage', '');
  localStorage.setItem('category','');
}

//initialize form
document.addEventListener('DOMContentLoaded', () => {
  getInsertAreas();
  getInsertIngr();
  insertTime();
  clearFormLocal();
});
