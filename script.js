'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1  = document.querySelector('#section--1');

const headerLinks = document.querySelector('.nav__links')
const headerLink = document.querySelectorAll('.nav__link')

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});




btnScrollTo.addEventListener('click', function(e){
    // let s1coods = section1.getBoundingClientRect();
    // console.log(s1coods);
    // window.scrollTo({
    //     left: s1coods.left + window.pageXOffset,
    //     top: s1coods.top + window.pageYOffset,
    //     behavior: 'smooth'
    // })

    section1.scrollIntoView({behavior: 'smooth'})
});


// headerLink.forEach(el => el.addEventListener('click' , function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})    
// }))


headerLinks.addEventListener('click', function(e){
    e.preventDefault();
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior: 'smooth'})
    }
})

//=====Hover effects for header links

const hoverHandler = function(e){
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;

        const sibling = e.target.closest('.nav').querySelectorAll('.nav__link');
        const logo = e.target.closest('nav').querySelector('img');

        sibling.forEach(el =>{
            if(el !== link) el.style.opacity = this;
        })

        logo.style.opacity = this
    }
}

headerLinks.addEventListener('mouseover', hoverHandler.bind(0.5))

headerLinks.addEventListener('mouseout',  hoverHandler.bind(1))


//====header Sticky 

const header = document.querySelector('.header');
const nav = document.querySelector('.nav');


// window.addEventListener('scroll' , function(){
//    if(window.scrollY >= 150){
//        header.classList.add('sticky')
//    }
//    else{
//        header.classList.remove('sticky')
//    }
// })

const stickyNav = function(entries) {
    const [entry] = entries;
    if(!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky')
}
const observer  = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: '-90px'
})

observer.observe(header)


//=====Reveal sections

const sections = document.querySelectorAll('.section');

const revealSectin = function(entries, observer){
    
    const [entry] = entries;
    if(!entry.isIntersecting) return
    entry.target.classList.remove('section--hidden');

    observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSectin , {
    root: null,
    threshold: 0.15,
});

sections.forEach(sec => {
    sectionObserver.observe(sec) 
    sec.classList.add('section--hidden')
})


//Reveal proper image & filter

const targetImages = document.querySelectorAll('img[data-src]');

const revealImage = function(entries, observer){
    
    const [entry] = entries;

    if(!entry.isIntersecting) return

    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function(){
        entry.target.classList.remove('lazy-img')
    })
    observer.unobserve(entry.target)
}

const ImageObserver = new IntersectionObserver(revealImage , {
    root: null,
    threshold: 0,
    rootMargin: '-200px'
});

targetImages.forEach(img => {
    ImageObserver.observe(img) 
})

//====Slider

const slides = document.querySelectorAll('.slide')
const leftBtn = document.querySelector('.slider__btn--left')
const rightBtn = document.querySelector('.slider__btn--right')
const dotsContainer = document.querySelector('.dots');


let currentSlide = 0 ;
const maxSlide = slides.length;

function createDot(){
    slides.forEach((_ , i) => {
        dotsContainer.insertAdjacentHTML('beforeend',  `<button class="dots__dot" data-slide="${i}"></button>`)
    })
}

createDot();


const activeDot = function(slide){
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}


dotsContainer.addEventListener('click' , function(e){
    if(e.target.classList.contains('dots__dot')){
        const {slide} = e.target.dataset
        goSlider(slide);
        activeDot(slide);
    }
})
const goSlider = function(slide) {
    slides.forEach((s , i) => s.style.transform = `translateX(${100 * (i - slide)}%)`)
}

goSlider(0);


const nextSlide = function(){
    if(currentSlide === maxSlide - 1){
        currentSlide = 0
    }
    else{
        currentSlide++
    }
    goSlider(currentSlide);
    activeDot(currentSlide);

}

const previousSlide = function(){
    if(currentSlide === 0 ){
        currentSlide = maxSlide -1
    }
    else{
        currentSlide--
    }
    goSlider(currentSlide)
    activeDot(currentSlide);

}

rightBtn.addEventListener('click', nextSlide)

leftBtn.addEventListener('click', previousSlide)


///======Capturing and bubbling

// const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () => `rgb(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)})`

// const link = document.querySelector('.nav__link')
// const nav = document.querySelector('.nav__links')
// const header = document.querySelector('.nav')


// link.addEventListener('click' , function(e){
//     this.style.backgroundColor = randomColor();

//     console.log("link",e.currentTarget);

// }, true)

// nav.addEventListener('click' , function(e){
//     this.style.backgroundColor = randomColor();
//     console.log("nav",e.currentTarget);

// }, true)

// header.addEventListener('click' , function(e){
//     this.style.backgroundColor = randomColor();

//     console.log("header",e.currentTarget);

// }, true)


//=====Event Delegation for tabs

const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContent= document.querySelectorAll('.operations__content');


tabContainer.addEventListener('click' , function(e){
    const clicked =  e.target.closest('.operations__tab');

    if(!clicked) return;

    //Remove active class from other tabs
    tabs.forEach(el => el.classList.remove('operations__tab--active'))

    tabContent.forEach(el => el.classList.remove('operations__content--active'))
    
    //Adding active class for clicked tab
    clicked.classList.add('operations__tab--active')

    //Showing current content for particalar tab
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

})