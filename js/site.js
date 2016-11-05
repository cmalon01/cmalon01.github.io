// Hide Header on on scroll down

// Thanks to : http://jsfiddle.net/mariusc23/s6mLJ/31/
// https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c

 var $header;
var $contactbar;



function loadPage(that, event)
{


}
$(document).ready (function() 
{
  

 $("a").click (function (event){

      event.preventDefault();
    event.stopPropagation();
  
 
  var target_href = $(this).attr("href");
  console.log("link clicked aha");
  if ( target_href.startsWith("/" ))
  {

    console.log("link clicked");
    var currentNav = $(".site-nav .active a").attr("href");

   // if (currentNav.length == undefined || !target_href.startsWith(currentNav.replace("index.html","")))
    if(true)
    {
      // we are not headed to the same pace
      $(".site-nav .active").removeClass("active");

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
      
      }
      else
      {
        $(".portfolio-nav").fadeOut();  

      }

  $('.page-content').fadeOut('slow', function() {
    

 


    $(".page-content").load(target_href + " .page-inner", function ()
    {
      $('title').text($(".page-inner").data("page-title"));
      $('.page-content').fadeIn('slow');



      if (target_href.endsWith('contact.html'))
      {

        
      (function(){var qs,js,q,s,d=document,gi=d.getElementById,ce=d.createElement,gt=d.getElementsByTagName,id='typef_orm',b='https://s3-eu-west-1.amazonaws.com/share.typeform.com/';if(!gi.call(d,id)){js=ce.call(d,'script');js.id=id;js.src=b+'widget.js';q=gt.call(d,'script')[0];q.parentNode.insertBefore(js,q)}})()

      }     
           // handle main nav
    
        history.pushState(null, null, target_href);

    });   
 
  // my own site URL
  });

    
  }
  else
  {

  }
 });
 
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


<!-- Hotjar Tracking Code for http://coreyux.com -->


    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:266373,hjsv:5};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');



 // SCRIPT FOR GOOGLE ANALYITICS
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-67002037-1', 'auto');
  ga('send', 'pageview');



// SCRIPT FOR ANIMATING IN ICONS

var loopCounter = 0;
var loopLength = 0;
var $loopObjects = null;
var effect = "fadeIn";
ani_1_inside = false;
ani_1_waiting = false;


function animateLoop()
{
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


