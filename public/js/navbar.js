$(document).ready(() => {
    const burger = $('.burger');
    const navMobile = $('#navMobile');
    const blocker = $('#blocker');
    
    const hideFunc = () => {
        navMobile.removeClass('displayShow');
        navMobile.addClass('displayHide');
        blocker.css('display', 'none');
    }
    
    const showFunc = () => {
        navMobile.removeClass('displayHide');
        navMobile.addClass('displayShow');
        blocker.css('display', 'block');
    }
    
    burger[0].addEventListener('click', showFunc);
    
    blocker.click(hideFunc);
    
    window.addEventListener('resize', () => {
        hideFunc();
    });
    
});
