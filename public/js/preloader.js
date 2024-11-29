export function setPreLoader() {

    let preLoaderWrapper = document.querySelector('#preloader-wrapper');
    let preloader = document.querySelector('#preloader');

    function hidePreLoader() {
        preLoaderWrapper.classList.add('hide-preloader');
        preLoader.classList.add('stop-animation');
    }

    window.addEventListener('load', hidePreLoader);
}