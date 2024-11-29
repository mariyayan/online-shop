export function setSlider(sliderId) {

    let sliderContainer = document.querySelector(`#${sliderId}`);
    let slider = sliderContainer.querySelector('.slides-wrapper');
    let slideWidth = slider.querySelector('.slide').offsetWidth; 
    let slideCount = 0;
    let translateWidth;
    let leftBtn = sliderContainer.querySelector('.left-btn');
    let rightBtn = sliderContainer.querySelector('.right-btn');
   let maxSlideCount = slider.querySelectorAll('.slide').length - 1; 

    function moveSlider() {

        if(slideCount < 0 || slideCount > maxSlideCount ){
            slideCount = 0;
        }
        translateWidth = -slideWidth * slideCount;
        slider.style.transform = 'translateX(' + translateWidth + 'px)';
    }

    function moveRight(){
         slideCount++;
         moveSlider();
    }

    function moveLeft() {
        slideCount--;
        moveSlider();
    }

    function calcMaxSlideCount(){
       maxSlideCount = Math.ceil((slider.offsetWidth - sliderContainer.offsetWidth) / slideWidth);
    }

    function createSlider(){

        leftBtn.addEventListener('click', moveLeft);
        rightBtn.addEventListener('click', moveRight);
    }

    function createCarouselSlider(){

        slideWidth += 80;
        calcMaxSlideCount();
    }

    function addNavBtns(){

        let navBtnsContainer = sliderContainer.querySelector('.nav-btns-slider');
        let navBtns = Array.from(navBtnsContainer.querySelectorAll('.slider-nav-btn'));

        function switchNavBtns(e) {
           
        if (e.target.classList.contains('slider-nav-btn')) {

            let targetNavBtnIndex = navBtns.indexOf(e.target);
            slideCount = targetNavBtnIndex;
            shiftNavBtns();
            moveSlider();
        }
    }

        function shiftNavBtns(){
            navBtnsContainer.querySelector('.nav-btn-active').classList.remove('nav-btn-active');
            navBtns[slideCount].classList.add('nav-btn-active');
        }

        navBtnsContainer.addEventListener('click', switchNavBtns);
        leftBtn.addEventListener('click', shiftNavBtns);
        rightBtn.addEventListener('click', shiftNavBtns);
}

    function addTextEffects(){

        let sliderTextArr = Array.from(slider.querySelectorAll('.slider-text'));
        let navBtnsContainer = sliderContainer.querySelector('.nav-btns-slider');

        function shiftText(){
        slider.querySelector('.text-active').classList.remove('text-active');
        sliderTextArr[slideCount].classList.add('text-active');
        }

        navBtnsContainer.addEventListener('click', shiftText);
        leftBtn.addEventListener('click', shiftText);
        rightBtn.addEventListener('click', shiftText);
    }


    function switchTargetSlider(targetCategory){

        slider.classList.remove('show-element');
        slideCount = 0;
        moveSlider();
        let targetSlider = sliderContainer.querySelector(`#${targetCategory}`);
         targetSlider.classList.add('show-element');
        slider = targetSlider;
        calcMaxSlideCount();
    }


    return {
        createNewSlider(){
            createSlider();
            return this;
        },
        addNavBtnsSupport(){
            addNavBtns()
            return this;
        },

        addTextEffectsSupport(){
            addTextEffects();
            return this;
        },
        createSliderForCarousel(){
        createCarouselSlider();
        return this;
    },
        switchSlider(targetCategory){
            switchTargetSlider(targetCategory);
            return this;
        }
    }

}