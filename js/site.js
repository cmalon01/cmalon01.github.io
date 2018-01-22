// Hide Header on on scroll down

// Thanks to : http://jsfiddle.net/mariusc23/s6mLJ/31/
// https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c

 var $header;
var $contactbar;

/*
window.onpopstate = function(event) 
{
  //alert("location: " + document.location.pathname + ", state: " + JSON.stringify(event.state));
  
  target_href = document.location.pathname;

  ajaxPageLoadHandleNavigation(target_href);
  
    $(".page-inner").load(target_href + " .page-inner", function ()
    {
        ajaxPageLoad(target_href);
        //history.pushState(null, null, target_href);
    });       

};


function ajaxPageLoadHandleNavigation(target_href)
{

  
      // we are not headed to the same pace
      if ($(".site-nav .active").length != 0)
      {
        $(".site-nav .active").removeClass("active");
      }
  
      
      
      $( ".site-nav li a" ).each(function( index ) {
          if (target_href.startsWith($(this).attr("href").replace("index.html","")))
          {
            $(this).parent().addClass("active");
            return false;
          }
        });
  

    // handle sub nav
      if (target_href.startsWith('/portfolio/') && target_href != "/portfolio/index.html")
      {
        $(".portfolio-nav").fadeIn();
      
        $(".portfolio-nav li.active").removeClass("active");
      
        $( ".portfolio-nav li a" ).each(function( index ) {
          if (target_href == $(this).attr("href"))
          {
            $(this).parent().addClass("active");
            return false;
          }
        });
      }
      else
      {
        $(".portfolio-nav").fadeOut();  

      }

}
function ajaxPageLoad(target_href)
{

      window.scrollTo(0,0);

      $('title').text($(".page-inner").data("page-title"));
    
      setupLinks(".page-inner a:not(.swipebox)")

      if (target_href.endsWith('contact.html'))
      {        
        (function(){var qs,js,q,s,d=document,gi=d.getElementById,ce=d.createElement,gt=d.getElementsByTagName,id='typef_orm',b='https://s3-eu-west-1.amazonaws.com/share.typeform.com/';if(!gi.call(d,id)){js=ce.call(d,'script');js.id=id;js.src=b+'widget.js';q=gt.call(d,'script')[0];q.parentNode.insertBefore(js,q)}})()
      }     

    
}

function setupLinks(selector)
{



  if (selector == undefined)
  {
    selector = "a:not(.swipebox)";
  }

 $(selector).click (function (event){

  event.preventDefault();
  var target_href = $(this).attr("href");
  
  var URLChanged = (document.location.pathname != target_href);
  
  console.log("a clicked :" +  target_href);
  if ( target_href.startsWith("/" ))
  {

    console.log("loading ajax page :" +  target_href);
    ajaxPageLoadHandleNavigation(target_href);
    $(".page-inner").load(target_href + " .page-inner", function ()
    {
        ajaxPageLoad(target_href);
        if (URLChanged)
        {
          // if they click on the same link agian, don't push it again
          history.pushState(null, null, target_href);
        }
    });       
  }
  else
  {

  }
 });
 



}
*/

$(document).ready (function() 
{

//  setupLinks();


$(".swipebox:not(.swipebox-custom)").swipebox({hideBarsDelay : 1500});


$( '#personasEspresso' ).click( function( e ) {
  e.preventDefault();
  $.swipebox(   [ 
    { href:'/img/portfolio/persona-1.jpg'}, 
    { href:'/img/portfolio/persona-2.jpg'}
  ] );
} );


 $header = $('header');
 $contactbar= $('#contact-bar');

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();
if ($("body").height() < 1000)
{
  $header.addClass('stay-there');
    //alert('hi');
}


$(window).scroll(function(event){
    didScroll = true;

});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        scrollAnimate();
        didScroll = false;
    }
}, 250);



var stayThere = false;
function hasScrolled() 
{

    if ($("body").height() < 1300)
    {
        $header.removeClass('nav-up').removeClass('nav-down');
        $contactbar.removeClass('up');
        $header.addClass('stay-there');
        stayThere = true;
        //alert('ya');
        return;
    }
    if (stayThere)  
    {
        $header.removeClass('stay-there');
        stayThere = false;
    }
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $header.removeClass('nav-down').addClass('nav-up');
        $contactbar.removeClass('up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $header.removeClass('nav-up').addClass('nav-down');
            $contactbar.addClass('up');
        }
    }

    if (st == 0)
    {
        $header.removeClass('nav-down');
        $contactbar.removeClass('up');
    }
    
    lastScrollTop = st;
}



var owl = $('.owl-carousel.owl-whatotherssay').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    items:1,
    URLhashListener:true,
    autoplayHoverPause:true,
    startPosition: 'URLHash'
});

$('.owl-carousel.owl-inspirations').owlCarousel({
    loop: false,
    nav:false,
    items:6,
    margin:0,
    autoWidth:true
});


owl.on('changed.owl.carousel', function(event) {
  var target_url = event.currentTarget.baseURI.split("#")[1];
  updateCarouselHash ("#" + target_url);
});

if (window.location.hash != "") updateCarouselHash(window.location.hash);

});

function updateCarouselHash(hash)
{
  
  $( ".btn-owl" ).each(function( index ) {
    if ($(this).attr("href") ==  hash) 
    { 
      $(this).addClass("active");

    }
    else
    {
      $(this).removeClass("active");
    }
  });

}

// SCRIPT FOR ANIMATING IN ICONS

var loopCounter = 0;
var loopLength = 0;
var $loopObjects = null;
var effect = "fadeIn";
ani_1_inside = false;
ani_1_waiting = false;


function animateLoop()
{
    if ($loopObjects[loopCounter] == undefined)  return;

    $($loopObjects[loopCounter]).addClass(effect);

    loopCounter = loopCounter + 1;
    if (loopCounter >= loopLength)
    {
     loopCounter = 0;
         ani_1_waiting = false;
    }
    else
    {
      setTimeout(animateLoop, 600);
    }
}


function animateFinishLoop()
{
    $($loopObjects[loopCounter]).removeClass(effect);
    loopCounter = loopCounter + 1;
    if (loopCounter >= loopLength )
    {
       ani_1_waiting = false;
     
    }
    else
    {
       setTimeout(animateFinishLoop, 600);
      // all done stop waiting
    }
}
var animate_icon = false;
function scrollAnimate()
{
    if ($(".icon:not(.no-animate)").length == 0 || !animate_icon)
    {
       return;
    }
      var scrollPos = $(window).scrollTop();
      var imagePos = $(".icon").first().offset().top;// + $(".icon").first().height();
      var winHeight = $(window).height();
      //var inside = (scrollPos > (imagePos -  $(window).height() )) && (scrollPos < ( imagePos) 
      var inside = (scrollPos + winHeight > imagePos + 20); // see if it below the image
      var inside = inside && (  imagePos + winHeight > scrollPos     );
      if (inside && ani_1_inside)
      {
        // we are already inside so do nothing.
      }
      else if (!ani_1_waiting && inside)
      {
        // we are inside and we aren't waiting
          //$(".icon").addClass("floating");
         ani_1_inside = true;
         ani_1_waiting = true;
         loopCounter = 0;
         animateLoop();
      }
      else if (!inside)
      {
         ani_1_inside = false;
      }
}

$( document ).ready(function() 
{
  // smooth scroll anchor links
  $(document).on('click', 'a[href^="#"].scrollSmooth', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 100
    }, 500);
  });
   window.dropdownHide = true;

   $(".modal-toggle").click (function (e)
   {
      window.toggleModal();
      e.preventDefault();
   });

    $(".modal-content,.modal-overlay").click (function (e)
   {
      window.toggleModal();
   });


   window.toggleModal = function ()
   {
      $(".modal-content,.modal-overlay").fadeToggle();
   } 

  if ($(".what-i-like .icon:not(.no-animate)").length == 0 || !animate_icon)
  {
    return;
  }

   $loopObjects = $(".what-i-like .icon");
   $(".what-i-like .icon").css("visibility","hidden");
  loopLength = $loopObjects.length;


  scrollAnimate();

 });


