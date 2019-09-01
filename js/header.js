var linkPageIndex;
var linkPage = [
  "index.html",
  "work.html",
  "about.html",
  "test.html"
]

var contentsBg = [
  "#3A467C",
  "#9263CD",
  "#90B0EE",
  "#D3D097"
]

// open Header Animation
function goMenu(){
  $('.revealer').css('opacity','1');
  $('.revealer__layer').addClass('revealer--animate--tobottom');
}

// open Detail Animation
function goDetail(){
  $('.revealer').css('opacity','1');
  $('.revealer__layer').addClass('revealer--animate--totop');
  $('.revealer--animate--totop:nth-child(3)').css('background-color', contentsBg[flkty.selectedIndex]);
};


$('.header-title').click(function(){
  goMenu();
  linkPageIndex = 0;
});

$('.header-work').click(function(){
  goMenu();
  linkPageIndex = 1;
});

$('.header-about').click(function(){
  goMenu();
  linkPageIndex = 2;
});

// open html 
$('.revealer__layer').one("animationend", function(){
  window.location.href = linkPage[linkPageIndex];
});
