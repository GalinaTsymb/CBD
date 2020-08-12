import {scroll_my} from './scroll-page';
import './scss/style.scss';
import 'slick-carousel/slick/slick.min.js';
import * as $ from 'jquery';


/*import ('lodash').then(_=>{
console.log('lodash', _.random(0, 42, true));
})
const post = new ScrollPage('webpack post title');
console.log('post to string', post.toString());*/


$(document).ready(function () {

    $('.js-slider-featured').slick({
        infinity: true,
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 1,
       // arrows: true,
        appendArrows: $('.featuredProducts__arrows'),
        prevArrow: "<div class='featuredProducts__arrows-wrapper'><img src='images/Right.svg' class='prev' alt='1'></div>",
        nextArrow: "<div class='featuredProducts__arrows-wrapper'><img src='images/Left.svg' class='next' alt='2'></div>",
        centerPadding: "40px",
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    //arrows: false,
                    variableWidth: true,
                }
            }]
    });
});


$(document).ready(function () {

    $('.js-slider-testimonials').slick({
        infinity: true,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,

        appendArrows: $('.testimonials__arrows'),

        nextArrow: "<div class='arrow-wrapper'><img src='images/Left.png' class='test-next' alt='2'></div>",
        prevArrow: "<div class='arrow-wrapper'><img src='images/Right.png' class='test-prev' alt='1'></div>",
        speed: 500,
        fade: true,
        cssEase: 'linear',
    });
});


