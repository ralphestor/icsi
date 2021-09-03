const burger = document.querySelectorAll('.burger');
const navMobile = document.querySelector('#navMobile');
const blocker = document.querySelector('#blocker');

const hideFunc = () => {
    navMobile.classList.remove('displayShow');
    navMobile.classList.add('displayHide');
    blocker.style.display = "none";
}

const showFunc = () => {
    navMobile.classList.remove('displayHide');
    navMobile.classList.add('displayShow');
    blocker.style.display = "block";
}

burger[0].addEventListener('click', () => {
    showFunc();
});
burger[1].addEventListener('click', hideFunc);

blocker.addEventListener('click', hideFunc);

document.addEventListener('scroll', () => {
    if (navMobile.classList.contains('displayShow')) {
        hideFunc();
    }
});

window.addEventListener('resize', () => {
    hideFunc(0);
});
