$(document).ready(() => {
    const burger = $('#navBtn');
    const navMobile = $('#navMobile');
    const blocker = $('#blocker');

    burger.click(() => {
        navMobile.toggleClass('displayShow displayHide');
        blocker.toggleClass('displayShow displayHide');
    });

    blocker.click(() => {
        navMobile.toggleClass('displayShow displayHide');
        blocker.toggleClass('displayShow displayHide');
    })
});

