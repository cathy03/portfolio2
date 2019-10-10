// Carousel
var $carousel = $('.main-carousel').flickity({
  cellAlign: 'left',
  contain: false,
  pageDots: false,
  cellSelector: '.carousel-cell',
  prevNextButtons: false,
  wrapAround: false,
  hash: true,
  autoPlay: 3000,
  pauseAutoPlayOnHover: false      
});

var flkty = $carousel.data('flickity');


// update Index
function updateIndex(event, index){
  var cellNumber = flkty.selectedIndex + 1;
  $('.main-project-index').text( cellNumber + '/' + flkty.slides.length );
}
updateIndex();


// update Slider Animation
function updateSlide(event, index){
  $('.main-project-slide').css('width', '0%');
  $('.main-project-slide').css('transition', 'none');

  var slideTime = setInterval(function(){
    $('.main-project-slide').css('width', '100%');
    $('.main-project-slide').css('transition', 'all 2s ease');
    clearInterval(slideTime);
  }, 100)
}
updateSlide();


// update Bg Animation
function updateBg(event, index){

  $('.main-bg').css({"background-image":"url(img/Concept1_Perspective.jpg)"});
  $('.main-bg-container').css('transform', 'scale(1.1)');
  $('.main-bg-container').css('transition', 'none');

  var timer = setInterval(function(){
    $('.main-bg-container').css('transform', 'scale(1)');
    $('.main-bg-container').css('transition', 'all 2s ease');
    clearInterval(timer);
  }, 100)

  switch(index){
    case 0: 
      $('.main-bg').css({"background-image":"url(img/Concept1_Perspective.jpg)"});
      $('.main-bg-container').css('transform', 'scale(1.1)');
      break;
    case 1: 
      $('.main-bg').css({"background-image":"url(img/Concept2_Perspective.jpg)"});
      $('.main-bg-container').css('transform', 'scale(1.1)');
      break;
    case 2: 
      $('.main-bg').css({"background-image":"url(img/Concept3_Perspective.jpg)"}); 
      $('.main-bg-container').css('transform', 'scale(1.1)');
      break;
  }
}
updateBg();


function updateBgFade(event, index){
  $('.main-bg-container').css('opacity', '0');
  setInterval(function(){
    $('.main-bg-container').css('opacity', '1');
    $('.main-bg-container').css('transition', 'all 2s ease');
  }, 100)
}
updateBgFade();

$carousel.on('change.flickity', updateBgFade);
$carousel.on('change.flickity', updateIndex);
$carousel.on('select.flickity', updateBg);
$carousel.on('select.flickity', updateSlide);



