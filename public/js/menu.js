import { makePostRequest } from './requestToServer.js';
import { showNestedBlock } from './nestedBlock.js';
import { turnArrow } from './turnArrow.js';

function setMenuNestedBlock() {

    let userNavMenu = document.querySelector('#user-nav-menu');
    let productNavMenu = document.querySelector('#product-nav-menu');

    userNavMenu.addEventListener('click', showNestedBlock);
    productNavMenu.addEventListener('click', showNestedBlock);
    productNavMenu.addEventListener('click', turnArrow);
}

function setSearch() {

    let searchInput = document.querySelector('#search-input');
    let linkButton = document.querySelector('.search-btn');
    searchInput.addEventListener('blur', function(e) {
    let inputValue = e.currentTarget.value;

        if (!inputValue) {
            let errorField = document.querySelector('.search');
            errorField.classList.add('show-element');
            return;
        }
    linkButton.setAttribute('href', `/search/${inputValue}`);
    });
}

function hideByCrossClick(element, className) {
    element.classList.remove(className);
}

function setBurgerMenu() {

    let burger = document.querySelector('#burger');
    let menu = document.querySelector('#product-nav-menu');
    let menuCross = menu.querySelector('.cross');

    function openBurgerMenu() {
        menu.classList.add('open-menu');
    }

    burger.addEventListener('click', openBurgerMenu);
    menuCross.addEventListener('click', () => hideByCrossClick(menu, 'open-menu'));
}

function setCloseWindowByCrossClick() {

    let form = document.querySelector('#registration-authentication-form');
    let formCross = form.querySelector('.cross');

    function closeWindowByCrossClick() {

        hideByCrossClick(form, 'show-element');
        form.querySelectorAll('input').forEach(input => input.value = '');
        form.querySelectorAll('.form-error').forEach(field => field.classList.contains('show-element') ? field.classList.remove('show-element') : null);
    }
    formCross.addEventListener('click', closeWindowByCrossClick);
}

function setForms() {

    function setFormWindow(opt) {
        
        let data;
        if (opt === 'registration') {
            data = ['Registration', '/registration'];
        } else if (opt === 'authentication') {
            data = ['Authentication', '/authentication'];
        }
        let form = document.querySelector('#registration-authentication-form');
        let h1 = form.querySelector('h1');
        h1.textContent = data[0];
        let button = form.querySelector('button');
        button.setAttribute('id', data[1]);
        form.classList.add('show-element');
        return button;
    }

    let registrationBtn = document.querySelector('#registration-btn');
    let authenticationBtn = document.querySelector('#authentication-btn');

    if (registrationBtn && authenticationBtn) {
        registrationBtn.addEventListener('click', (e) => setFormHandler(e, 'registration'));
        authenticationBtn.addEventListener('click', (e) => setFormHandler(e, 'authentication'));

        function setFormHandler(e, opt) {
            let sendFormBtn = setFormWindow(opt);
            sendFormBtn.addEventListener('click', makePostRequest);
        }
    }
}

export function setMenuHandlers() {
    setMenuNestedBlock();
    setSearch();
    setBurgerMenu();
    setCloseWindowByCrossClick();
    setForms();
}