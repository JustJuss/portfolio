let tabsBtn = document.querySelectorAll('.guests__tabs-btn')
let tabsItem = document.querySelectorAll('.guests__tabs-item')
let Account = document.querySelector('.header__account')
let Login = document.querySelector('.modal-win')
let LoginClose = document.querySelector('.modal-win__close-btn')
let SearchBtn = document.querySelector('.header__search')
let SearchForm = document.querySelector('.header__search-form')
let playBtnAc = document.querySelectorAll('.play-btn')
let pauseBtnAc = document.querySelectorAll('.pause-btn')
let burger = document.querySelector('.header__burger')
let menu = document.querySelector('.header__nav')
let menuLinks = document.querySelectorAll('.nav-link')
let secondMenu = document.querySelector('.header__second-nav')
let actual = document.querySelector('.header__actual-block')
let actualBtn = document.querySelector('.header__actual-320-btn')
let headerBottom = document.querySelector('.header__bottom')
let radioBtn = document.querySelectorAll('.playlists__radio-btn')

radioBtn.forEach(function (el) {
    el.addEventListener('click',
        function (e) {

            radioBtn.forEach(function (elem) {

                elem.classList.remove('playlists__radio-btn--active');

            })

            e.currentTarget.classList.toggle('playlists__radio-btn--active');
        })
})

actualBtn.addEventListener('click',

    function () {

        if (actualBtn.classList.contains('header__actual-320-btn--active')) {
            setTimeout(() => headerBottom.classList.remove('header__bottom--active'), 300);
        } else {
            headerBottom.classList.add('header__bottom--active')
        };

        actual.classList.toggle('header__actual-block--disabled');

        actualBtn.classList.toggle('header__actual-320-btn--active');

        actual.classList.toggle('header__actual-block--active');

        setTimeout(() => actual.classList.toggle('header__actual-block--display'), 200);

    }
)

burger.addEventListener('click',

    function () {

        burger.classList.toggle('header__burger--active');

        menu.classList.toggle('header__nav--active');

        menu.classList.toggle('header__nav--disabled');

        setTimeout(() => menu.classList.toggle('header__nav--display'), 300);

        secondMenu.classList.toggle('header__second-nav--active');

        secondMenu.classList.toggle('header__second-nav--disabled');

        setTimeout(() => secondMenu.classList.toggle('header__second-nav--display'), 300);

        document.body.classList.toggle('stop-scroll');

        actual.classList.remove('header__actual-block--active');

        headerBottom.classList.remove('header__bottom--active');

        actual.classList.add('header__actual-block--disabled');

        actual.classList.add('header__actual-block--display');

        actualBtn.classList.remove('header__actual-320-btn--active');

    })

menuLinks.forEach(function (element) {

    element.addEventListener('click',

        function () {

            burger.classList.remove('header__burger--active');

            menu.classList.remove('header__nav--active');

            secondMenu.classList.remove('header__second-nav--active');

            document.body.classList.remove('stop-scroll');

        })
})

playBtnAc.forEach(function (e) {
    e.addEventListener('click', function (el) {
        const path = el.currentTarget.dataset.path;

        playBtnAc.forEach(function (elem) {
            elem.classList.remove('play-btn--disabled')
        })

        el.currentTarget.classList.add('play-btn--disabled')

        pauseBtnAc.forEach(function (elem) {
            elem.classList.remove('pause-btn--active')
        })

        document.querySelector(`[data-target="${path}"]`).classList.add('pause-btn--active')

    })
})

pauseBtnAc.forEach(function (e) {
    e.addEventListener('click', function (el) {

        el.currentTarget.classList.remove('pause-btn--active')

        playBtnAc.forEach(function (elem) {
            elem.classList.remove('play-btn--disabled')
        })
    })
})

SearchBtn.addEventListener('click',
    function () {

        SearchForm.classList.toggle('header__search-form--active');

    }
)

Account.addEventListener('click',

    function () {

        Login.classList.remove('modal-win--disabled');

        Login.classList.remove('modal-win--display');

        Login.classList.toggle('modal-win--active');

        document.body.classList.toggle('stop-scroll');

    }
)

LoginClose.addEventListener('click',
    function () {

        Login.classList.toggle('modal-win--disabled');

        Login.classList.remove('modal-win--active');

        setTimeout(() => Login.classList.toggle('modal-win--display'), 300);

        document.body.classList.toggle('stop-scroll');

    }
)

tabsBtn.forEach(function (element) {

    element.addEventListener('click', function (e) {
        const path = e.currentTarget.dataset.path;

        tabsBtn.forEach(function (btn) {
            btn.classList.remove('guests__tabs-btn--active')
        });
        e.currentTarget.classList.add('guests__tabs-btn--active');

        tabsItem.forEach(function (element) {
            element.classList.remove('guests__tabs-item--active')
        });

        document.querySelectorAll(`[data-target="${path}"]`).forEach(function (data) {
            data.classList.add('guests__tabs-item--active')
        });

    })
});

const element = document.querySelector('.select')
const choices = new Choices(element, {
    searchEnabled: false,
    position: 'bottom'
});

new Accordion('.accordion-container');

const swiper = new Swiper('.swiper', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    slidesPerView: 4,
    spaceBetween: 30,

    breakpoints: {

        0: {
            slidesPerView: 2,
            spaceBetween: 20,
        },

        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },

        1140: {
            slidesPerView: 4,
        },

    }
});

const swiper2 = new Swiper('.swiper-2', {

    breakpoints: {

        320: {
            // freeMode: {
            //     enabled: true,
            // },
            slidesPerView: 'auto',
            spaceBetween: 15,
            // width: null,
            // loop: true,
        }
    }
});

const swiperPrev = document.getElementById('swiperPrev')
const swiperNext = document.getElementById('swiperNext')

swiperPrev.addEventListener('click', () => {
    swiper.slidePrev();
});

swiperNext.addEventListener('click', () => {
    swiper.slideNext();
})

new JustValidate('.form-js-1', {
    rules: {

        login: {
            required: true,
            minLength: 4,
            maxLength: 25
        },

        password: {
            required: true,
            minLength: 6,
            maxLength: 25
        }
    },

    messages: {

        login: {
            required: "Ошибка",
            minLength: "Ошибка",
            maxLength: "Ошибка"
        },

        password: {
            required: "Ошибка",
            minLength: "Ошибка",
            maxLength: "Ошибка"
        }
    }

})

new JustValidate('.form-js-2', {
    rules: {
        name: {
            required: true,
            minLength: 2,
            maxLength: 25
        },

        mail: {
            required: true,
            email: true
        },

        comment: {
            required: true
        },

        checkbox: {
            required: true
        },

    },

    messages: {
        name: {
            required: "Ошибка",
            minLength: "Ошибка",
            maxLength: "Ошибка"
        },

        mail: {
            required: "Ошибка",
            email: "Ошибка"
        },

        comment: {
            required: "Ошибка"
        },

        checkbox: {
            required: "Ошибка"
        },

    }

})

const btnMore = document.querySelector('.podcasts__btn-more')
const podcastsCard = document.querySelectorAll('.podcasts__card')

btnMore.addEventListener('click', () => {
    podcastsCard.forEach(el => { el.classList.add('podcasts__card--active') });
    btnMore.classList.add('podcasts__btn--invisible')
})
