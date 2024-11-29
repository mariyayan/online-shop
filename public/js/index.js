import { makeGetRequest } from './requestToServer.js';
import { setSlider } from './slider.js';

export function setIndexPageFunctions() {

    setSlider('main-slider').createNewSlider().addNavBtnsSupport().addTextEffectsSupport();
    setSlider('testimonials').createNewSlider().addNavBtnsSupport();
    setSlider('popular-carousel').createNewSlider().createSliderForCarousel();

    let popularCarousel = document.getElementById('popular-carousel');
    popularCarousel.addEventListener('click', makeGetRequest);
}