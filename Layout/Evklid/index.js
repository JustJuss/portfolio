let burger = document.querySelector('.burger')
let menu = document.querySelector('.header__nav')
let menuLinks = menu.querySelectorAll('.header__nav__link')
let search = document.querySelector('.search__form')
let searchIcon = document.querySelector('.header__search__link')
let searchClose = document.querySelector('.header__search-close')
let tabsBtn = document.querySelectorAll('.tabs-nav__btn')
let tabsItem = document.querySelectorAll('.tabs-item')

burger.addEventListener('click',

    function () {

        burger.classList.toggle('burger--active');

        menu.classList.toggle('header__nav--active');

        document.body.classList.toggle('stop-scroll');

    })

menuLinks.forEach(function (element) {

    element.addEventListener('click',

        function () {

            burger.classList.remove('burger--active');

            menu.classList.remove('header__nav--active');

            document.body.classList.remove('stop-scroll');

        })
})

searchIcon.addEventListener('click', 

    function () {

            search.classList.toggle('search__form--active')

})

searchClose.addEventListener('click',
    function () {

        search.classList.remove('search__form--active')  

    }
)

searchClose.addEventListener('click',

    function() {

        searchClose.classList.remove('search__form--active')

})

tabsBtn.forEach(function(element){

    element.addEventListener('click', function(e) {
        const path = e.currentTarget.dataset.path;

        tabsBtn.forEach(function(btn) {
            btn.classList.remove('tabs-nav__btn--active')
        });
        e.currentTarget.classList.add('tabs-nav__btn--active');

        tabsItem.forEach(function(element) {
            element.classList.remove('tabs-item--active')
        });

        document.querySelectorAll(`[data-target="${path}"]`).forEach(function(data) {
            data.classList.add('tabs-item--active')
        });

    })
})

const swiper = new Swiper('.swiper', {
    loop: true,
      pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
          clickable: true
    }
  });

  new Accordion('.accordion-container');