// Carousel
var $carousel = $('.main-carousel').flickity({
  contain: false,
  pageDots: false,
  cellSelector: '.carousel-cell',
  prevNextButtons: false,
  wrapAround: true,
  hash: true,
  autoPlay: 5000,
  selectedAttraction: 0.01,
  pauseAutoPlayOnHover: false      
});

var flkty = $carousel.data('flickity');
var $imgs = $('.carousel-cell img');


// update Index
function updateIndex(event, index){
  var cellNumber = flkty.selectedIndex + 1;
  $('.main-project-index').text( cellNumber + ' / ' + flkty.slides.length );
}
updateIndex();

// update Slider Animation
function updateSlide(event, index){
  $('.main-project-slide').css('width', '0%');
  $('.main-project-slide').css('transition', 'none');

  var slideTime = setInterval(function(){
    $('.main-project-slide').css('width', '100%');
    $('.main-project-slide').css('transition', 'all 5s ease');
    clearInterval(slideTime);
  }, 100)
}
updateSlide();


// Parallax Animation
function imgParallax( event, progress ) {
  flkty.slides.forEach( function( slide, i ) {
    var img = $imgs[i];
    var x = ( slide.target + flkty.x ) * -1/3;
    img.style.transform = 'translateX( ' + x  + 'px)';
  });
}
imgParallax();

// update Title & title Animation
function updateTitle(event, index){
  $('.main-project-title').css('opacity', '0');
  $('.main-project-title').css('transform', 'translate3d(0, -50px, 0');
  $('.main-project-title').css('transition', 'none');

  var slideTitle = setInterval(function(){
    $('.main-project-title').css('opacity', '1');
    $('.main-project-title').css('transform', 'translate3d(0, 0, 0');
    $('.main-project-title').css('transition', 'all .8s ease');
    clearInterval(slideTitle);
  }, 100)

  var index = flkty.selectedIndex;

  switch(index){
      case 0: 
        $('.main-project-title').text("Service Design for Smart Display : Kakao mini");
        break;
      case 1: 
        $('.main-project-title').text("Brand Identity for The Hungarian Fashion and Design");
        break;
      case 2: 
        $('.main-project-title').text("McDonald's x Spotify's Frieslist: Transform your fries into music");
        break;
      case 3: 
        $('.main-project-title').text("Animation video platform for blockchain and ICO's projects");
        break;
    }
}
updateTitle();

$carousel.on('change.flickity', updateIndex);
$carousel.on('select.flickity', updateSlide);
$carousel.on('scroll.flickity', imgParallax);
$carousel.on('change.flickity', updateTitle);



$('.main-project-title').click(function(){
  goDetail();
  linkPageIndex = 3;
});



// Mousewheel interaction
$(document).ready(function(){
  $('.main-carousel').css('opacity', '1');
  $('.main-carousel').css('transition', 'all .6s ease');
});

$('.main-carousel').mousewheel(function(e) {
    e.preventDefault();
    var flkty = Flickity.data(this);

    if (!window.wheeling) {
        // console.log('start wheeling!');

        if(e.deltaX > 0 || e.deltaY < 0){
            flkty.next();
        } else if(e.deltaX < 0 || e.deltaY > 0){
            flkty.previous();
        }
    }

    clearTimeout(window.wheeling);
    window.wheeling = setTimeout(function() {
        // console.log('stop wheeling!');

        delete window.wheeling;

        // reset wheeldelta
        window.wheeldelta.x = 0;
        window.wheeldelta.y = 0;
    }, 50);

    window.wheeldelta.x += e.deltaFactor * e.deltaX;
    window.wheeldelta.y += e.deltaFactor * e.deltaY;
    if(window.wheeldelta.x > 500 || window.wheeldelta.y > 500 || window.wheeldelta.x < -500 || window.wheeldelta.y < -500){
        window.wheeldelta.x = 0;
        window.wheeldelta.y = 0;

        if(e.deltaX > 0 || e.deltaY < 0){
            flkty.next();
        } else if(e.deltaX < 0 || e.deltaY > 0){
            flkty.previous();
        }
    }

});
