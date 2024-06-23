let controller = new ScrollMagic.Controller();

let photos = document.querySelectorAll(".img-container");
photos=Array.from(photos);//convert NodeList to Array
photos.pop();//remove last element, make it stay at the end

let duration = 1000;//how long the animation should take

let textContainer = document.getElementById("text-1");


//set the z-index of the photos through scrolling
photos.forEach((photo, index) => {
  photo.style.zIndex = parseInt(photos.length - index);

  //create a tween for each photo
  let tween = new TimelineMax()
    .add([
      TweenMax.to(photo, 1, { className: "+=zoom", ease: Power4.easeIn }),
      TweenMax.to("#titel", 1, { opacity: 0 }),
      TweenMax.fromTo("#text-1", 1, { x: 0, y: 0, scale: 1, transformOrigin: "50% 50%", opacity: 1.0 }, { x: +0, y: 0, scale: 1, transformOrigin: "50% 50%", opacity: 0 })
    ]);

  //add the tween to a scene
  let scene = new ScrollMagic.Scene({ triggerElement: "#container", triggerHook: 0, duration: duration, offset: duration * index })
    .setTween(tween)
    .setClassToggle(photo, "active")
    .setPin("#container")
    .addTo(controller)
    ;

  scene.on("enter", function (event) {

    //load the next image
    //if you load loads of images, it takes too long to load the page
    //that is why we only load the first three images and then the next image when the current image is in view
    if (index + 2 < photos.length) {
      //console.log(photo.firstElementChild.getAttribute('dataset'))
      photos[index + 2].firstElementChild.src = photos[index + 2].firstElementChild.getAttribute('dataset');
    }


    //get the alt text of the image and display it
    var text = photo.firstElementChild.getAttribute('alt');
    //console.log(textContainer);
    textContainer.textContent=text;
 
  });

});

document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}