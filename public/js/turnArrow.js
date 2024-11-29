export function turnArrow(e) {

    let arrowContainer = e.target.closest('.arrow-container');

    if (!arrowContainer) return;

    let arrow = arrowContainer.querySelector('.arrow-down');
    !arrow.classList.contains('turn-arrow-up') ? arrow.classList.add('turn-arrow-up') :
        arrowContainer.querySelectorAll('.arrow-down').forEach(arrow => arrow.classList.contains('turn-arrow-up') ? arrow.classList.remove('turn-arrow-up') : null);
}