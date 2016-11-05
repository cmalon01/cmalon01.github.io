// Hide Header on on scroll down

// Thanks to : http://jsfiddle.net/mariusc23/s6mLJ/31/
// https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c

 var $header;
var $contactbar;



function loadPage(that, event)
{


}


function setupLinks(selector)
{



  if (selector == undefined)
  {
    selector = "a:not(.swipebox)";
  }

 $(selector).click (function (event){

   event.preventDefault();
 //alert("hiya");
  var target_href = $(this).attr("href");
  console.log("a clicked :" +  target_href);
  if ( target_href.startsWith("/" ))
  {
   // alert("hi");
   
   // event.stopPropagation();

    console.log("loading ajax page :" +  target_href);
    //var currentNav = $(".site-nav .active a").attr("href");

   // if (currentNav.length == undefined || !target_href.startsWith(currentNav.replace("index.html","")))
    if(true)
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
    }
    

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
    

//console.log("about to fade");
  
 // $('.page-content').fadeTo(0,0, function() {

  //  $('.page-content').css("visibility", "hidden");   
    
 


    $(".page-inner").load(target_href + " .page-inner", function ()
    {
      window.scrollTo(0,0);

      $('title').text($(".page-inner").data("page-title"));
    
      setupLinks(".page-inner a:not(.swipebox)")


      $('.page-content').css("visibility", "visible");   
      

      $('.page-content').fadeTo(0,100);

    /*  $('.page-content').fadeIn('slow'), function ()
      {
       //      $('.page-content').css("width" , "auto");
      }
      */


      if (target_href.endsWith('contact.html'))
      {

        
      (function(){var qs,js,q,s,d=document,gi=d.getElementById,ce=d.createElement,gt=d.getElementsByTagName,id='typef_orm',b='https://s3-eu-west-1.amazonaws.com/share.typeform.com/';if(!gi.call(d,id)){js=ce.call(d,'script');js.id=id;js.src=b+'widget.js';q=gt.call(d,'script')[0];q.parentNode.insertBefore(js,q)}})()

      }     
           // handle main nav
    
        history.pushState(null, null, target_href);

    });   
 
  // my own site URL

    
  }
  else
  {

  }
 });
 



}

$(document).ready (function() 
{

  setupLinks();


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
});



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

function scrollAnimate()
{
    if ($(".icon").length == 0)
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
   
  if ($(".icon").length == 0)
  {
    return;
  }

   $loopObjects = $(".icon");
   $(".icon").css("visibility","hidden");
  loopLength = $loopObjects.length;


  scrollAnimate();

 });


