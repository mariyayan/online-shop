import { getTargetCategoryName } from './switchBtnsFuncs.js';
import { makeGetRequest } from './requestToServer.js';
import { setSlider } from './slider.js';
import { switchBtns } from './switchBtnsFuncs.js';

export function setCategories() {

    let categoriesCarousel = document.querySelector('#categories-carousel');
    categoriesCarousel.addEventListener('click', makeGetRequest);

    function setCategoriesBtns() {

        let slider = setSlider('categories-carousel').createNewSlider().createSliderForCarousel();
        let categoriesBtns = document.querySelector('#categories-btns');
        let categoriesContainer = document.querySelector('#categories');

        function switchCategoriesBtns(e) {

            switchBtns(e, categoriesBtns);
            let targetCategory = getTargetCategoryName(e);
            slider.switchSlider(targetCategory);
        }

        categoriesBtns.addEventListener('click', switchCategoriesBtns);
    }

    let categoriesContainer = setCategoriesBtns();
    setGetRequestes(categoriesCarousel);
}