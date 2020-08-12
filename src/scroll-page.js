/**
 *  the function tracks the page scroll, changes color nav-menu, when it reaches the desired position
 *  and also switches nav-menu, when it reaches the desired position
 */
export function scroll_my() {
    'use strict';
    //if windows width < 799px function not working
    if (window.innerWidth <= 799) {
        return;
    }
    //find all the elements on page, who has class - js-page. There are our blocks
    let section         = document.querySelectorAll(".js-page");
    let sections        = {};
    let i               = 0;

    //determine the height of the blocks
    Array.prototype.forEach.call(section, function (e) {
        sections[e.id] = e.offsetTop;
    });

    //track the event scroll and change the color of the indicator when the scroll has reached the desired block
    window.onscroll = function () {
        let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

        for (i in sections) {

            /*if (sections[i] <= scrollPosition) {
                document.querySelector('.active').classList.remove('active');
                document.querySelector('a[href*=' + i + ']').previousElementSibling.classList.add('active');
            }*/
            //when nav-menu has reached block 'projects' change background nav-menu
            if (scrollPosition >= (sections.project - 100)) {
                document.querySelector('.js-page-nav').classList.add('add_background');
            } else {
                document.querySelector('.js-page-nav').classList.remove('add_background');
            }
        }
    };
};