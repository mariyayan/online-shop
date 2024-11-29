import { makeGetRequest } from './requestToServer.js';

export function setCartWishlistContainer() {

    let cartWishlistContainer = document.querySelector('.cart-wishlist');
    cartWishlistContainer.addEventListener('click', makeGetRequest);
}