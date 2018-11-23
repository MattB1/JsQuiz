/*global $:false*/
/*eslin-env browser*/

// jQuery onLoad function
$(function(){
  // run the updateImage function every 5000 ms
  setInterval("updateImage()", 2000);
})


// switch the current image in the image carousel using a 1 second fade animation.
// The currently active image will have the 'active' class
function updateImage() {

  // select the active image
  var $active = $('#img_animation img.hidden');

  // select the next element
  var $next = $active.next();

  // selecting 'next' on the last element results in a zero length object,
  // so set next to the first element, looping around
  if ($next.length === 0){
    $next = $('#img_animation img:first');
  }

  // Fade out current image, remove the 'active' class
  $active.fadeTo(1000, 0.0, function(){
    $active.removeClass('hidden');
  });
 
  // Fade in next image and add the 'active' class
  $next.fadeTo(1000, 1.0, function(){
    $next.addClass('hidden');
  });
}

