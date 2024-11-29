import { showNestedBlock } from './nestedBlock.js';
import { turnArrow } from './turnArrow.js';

export function setFooter() {
    let footer = document.querySelector('footer');
    footer.addEventListener('click', turnArrow);
    footer.addEventListener('click', showNestedBlock);
}