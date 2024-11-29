import { getTargetCategoryName } from './switchBtnsFuncs.js';
import { makeGetRequest } from './requestToServer.js';
import { switchBtns } from './switchBtnsFuncs.js';

export function setSalesBtns() {

    let salesBtns = document.querySelector('#sales-btns');
    let salesCardsContainer = document.querySelector('#sales-cards-container');
    let salesCards = Array.from(salesCardsContainer.querySelectorAll('.product-card'));

    function switchSalesBtns(e) {
        switchBtns(e, salesBtns);
        let targetCategory = getTargetCategoryName(e);
        salesCards.forEach((card) => {
            if (card.classList.contains(targetCategory) && !card.classList.contains('show-element')) {
                card.classList.add('show-element');
            } else if (!card.classList.contains(targetCategory) && card.classList.contains('show-element')) {
                card.classList.remove('show-element');
            }
        });
    }

    salesBtns.addEventListener('click', switchSalesBtns);
    salesCardsContainer.addEventListener('click', makeGetRequest);
}