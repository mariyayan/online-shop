export function showNestedBlock(e) {

    let containingBlock = e.target.closest('.containing-block');

    if (!containingBlock) return;

    let nestedBlock = containingBlock.querySelector('.nested-block');

    if (e.target.closest('.nested-block') === nestedBlock) return;

    if (nestedBlock.classList.contains('show-element')) {

        if (nestedBlock.querySelector('.nested-block')) {

            nestedBlock.querySelectorAll('.nested-block').forEach(element => element.classList.remove('show-element'));
        }

        return nestedBlock.classList.remove('show-element');
    }
    nestedBlock.classList.add('show-element');

}