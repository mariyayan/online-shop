import { setCartWishlistContainer } from './cart-wishlist.js';
import { setCategories } from './categories.js';
import { setFooter } from './footer.js';
import { setFullInfoInputArrows } from './productFullInfo.js';
import { setIndexPageFunctions } from './index.js';
import { setMenuHandlers } from './menu.js';
import { setSalesBtns } from './sales.js';
import { setPreLoader } from './preloader.js';

try {
    setPreLoader();
} catch (e) {
    console.log(e);
}
try {
    setMenuHandlers();
} catch (e) {
    console.log(e);
}

try {
    setFooter();
} catch (e) {
    console.log(e);
}

try {
    setIndexPageFunctions();
} catch (e) {
    console.log(e);
}

try {
    setCartWishlistContainer();
} catch (e) {
    console.log(e);
}

try {
    setCategories();
} catch (e) {
    console.log(e);
}

try {
    setFullInfoInputArrows();
} catch (e) {
    console.log(e);
}

try {
    setSalesBtns();
} catch (e) {
    console.log(e);
}