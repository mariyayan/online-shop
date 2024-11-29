import { makeGetRequest } from './requestToServer.js';
import { showNestedBlock } from './nestedBlock.js';
import { turnArrow } from './turnArrow.js';


export function setFullInfoInputArrows() {

    let productFullInfoContainer = document.querySelector('.product-full-info');
    let productQuantityBlock = document.querySelector('.product-quantity');
    let inputElement = productFullInfoContainer.querySelector('.quantity-input');
    let inputMaxValue = +inputElement.getAttribute('max');
    let inputMinValue = +inputElement.getAttribute('min');

    productFullInfoContainer.addEventListener('click', (e) => makeGetRequest(e, true));

    function chooseProductQuantity(e) {

        if (!e.target.classList.contains('quantity-arrow')) return;
        let inputValue = +inputElement.value;
        if (e.target.classList.contains('quantity-down')) {
            inputValue <= inputMinValue ? null : inputElement.value = inputValue - 1;
        } else if (e.target.classList.contains('quantity-up')) {
            inputValue >= inputMaxValue ? null : inputElement.value = inputValue + 1;
        }
    }
    productQuantityBlock.addEventListener('click', chooseProductQuantity);
    productFullInfoContainer.addEventListener('click', turnArrow);
    productFullInfoContainer.addEventListener('click', showNestedBlock);
}