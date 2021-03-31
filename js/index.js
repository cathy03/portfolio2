// Carousel
var $carousel = $('.main-carousel').flickity({
  contain: false,
  pageDots: false,
  cellSelector: '.carousel-cell',
  prevNextButtons: false,
  wrapAround: true,
  hash: true,
  autoPlay: 5000,
  pauseAutoPlayOnHover: false,
  lazyLoad: true
});

var flkty = $carousel.data('flickity');
var $imgs = $('.carousel-cell img');

// update Index
function updateIndex(event, index) {
  var cellNumber = flkty.selectedIndex + 1;
  $('.main-project-index').text('0' + cellNumber);
  //$('.main-project-index').text( '0' + flkty.slides.length );
}
updateIndex();

// update Slider Animation
function updateSlide(event, index) {
  $('.main-project-slide').css('width', '0%');
  $('.main-project-slide').css('transition', 'none');

  var slideTime = setInterval(function () {
    $('.main-project-slide').css('width', '100%');
    $('.main-project-slide').css('transition', 'all 5s ease');
    clearInterval(slideTime);
  }, 100)
}
updateSlide();

// Parallax Animation
function imgParallax(event, progress) {
  flkty.slides.forEach(function (slide, i) {
    var img = $imgs[i];
    var x = (slide.target + flkty.x) * -1 / 3;
    img.style.transform = 'translateX( ' + x + 'px)';
  });
}
imgParallax();

// update Title & title Animation
function updateTitle(event, index) {

  $('.main-project-title span').removeClass('swipe-animate');
  $('.main-project-subtitle span').removeClass('swipe-animate');
  $('.main-project-date span').removeClass('swipe-animate');

  var slideTitleAnime = setInterval(function () {
    $('.main-project-title span').addClass('swipe-animate');
    $('.main-project-subtitle span').addClass('swipe-animate');
    $('.main-project-date span').addClass('swipe-animate');
    clearInterval(slideTitleAnime);
  }, 100)

  index = flkty.selectedIndex;

  var slideTitle = setInterval(function () {
    $('.main-project-title span').html(projectInfo[index].title);
    $('.main-project-subtitle span').html(projectInfo[index].subtitle);
    $('.main-project-date span').html(projectInfo[index].date);
    clearInterval(slideTitle);
  }, 1000)
}

updateTitle();

$carousel.on('settle.flickity', updateIndex);
$carousel.on('select.flickity', updateSlide);
$carousel.on('scroll.flickity', imgParallax);
$carousel.on('change.flickity', updateTitle);


$('.main-project-title').click(function () {
  linkPageIndex = 3 + flkty.selectedIndex;
  goDetail();
});


$(document).ready(function () {
  $('.main-carousel').css('opacity', '1');
  $('.main-carousel').css('transition', 'all .6s ease');
});

// Mousewheel interaction
$('.main-carousel').mousewheel(function (e) {
  e.preventDefault();
  var flkty = Flickity.data(this);

  if (!window.wheeling) {
    // console.log('start wheeling!');

    if (e.deltaX > 0 || e.deltaY < 0) {
      flkty.next();
    } else if (e.deltaX < 0 || e.deltaY > 0) {
      flkty.previous();
    }
  }

  clearTimeout(window.wheeling);
  window.wheeling = setTimeout(function () {
    // console.log('stop wheeling!');

    delete window.wheeling;

    // reset wheeldelta
    window.wheeldelta.x = 0;
    window.wheeldelta.y = 0;
  }, 50);

  window.wheeldelta.x += e.deltaFactor * e.deltaX;
  window.wheeldelta.y += e.deltaFactor * e.deltaY;
  if (window.wheeldelta.x > 500 || window.wheeldelta.y > 500 || window.wheeldelta.x < -500 || window.wheeldelta.y < -500) {
    window.wheeldelta.x = 0;
    window.wheeldelta.y = 0;

    if (e.deltaX > 0 || e.deltaY < 0) {
      flkty.next();
    } else if (e.deltaX < 0 || e.deltaY > 0) {
      flkty.previous();
    }
  }

});
