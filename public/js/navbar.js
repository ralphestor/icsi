$(document).ready(() => {
    const burger = $('#navBtn');
    const navMobile = $('#navMobile');
    const blocker = $('#blocker');
    
    const setIcon = () => {
        const isOn = navMobile.hasClass('displayShow');

        if(isOn) {
            burger.html('x');
            burger.toggleClass('xHover bHover');
        } else {
            burger.html('☰');
            burger.toggleClass('xHover bHover');
        }
    }

    setIcon();

    burger.click(() => {
        navMobile.toggleClass('displayShow displayHide');
        blocker.toggleClass('displayShow displayHide');
        setIcon();
    });

    blocker.click(() => {
        navMobile.toggleClass('displayShow displayHide');
        blocker.toggleClass('displayShow displayHide');
        setIcon();
    })

    $(function () {
        $(document).scroll(function () {
            var nav = $('nav');
            nav.toggleClass('scrolled', $(this).scrollTop() > nav.height());
        });
    });



});

