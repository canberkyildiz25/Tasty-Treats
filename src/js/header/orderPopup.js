const orderForm = document.getElementById('orderForm');
const order = document.querySelector('.order');
const closeButton = document.querySelector('.close-button');
order.addEventListener('click',_=> openPopup());
closeButton.addEventListener('click',_=> closePopup());
orderForm.addEventListener('submit',_=>{
    closePopup();
})
function openPopup() {
    document.getElementById('popupOverlay').style.display = 'block';
    orderForm.reset();
}

function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
}


