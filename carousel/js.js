/*AHUISA*/
var slideCarousel = {
  slideIndex :  0,
  currentSlideIndex : 0,
  slideArray : [],
  slide : function (container, isAppend){
    var slideContainer = document.getElementById(container);
    var items = slideContainer.getElementsByTagName("img");
    for (var i = 0; i < items.length; ++i) {
      var item = {
        title : items[i].title,
        id : container + "_slide" + slideCarousel.slideIndex,
        background : items[i].src
      }
      slideCarousel.slideIndex++;
      
      slideCarousel.slideArray.push(item);
    }
    slideCarousel.buildSlider(container);
    slideCarousel.createButtons(container, isAppend);
  }, 
  buildSlider: function(container){
    var myHTML = "";

    for(var i = 0; i < slideCarousel.slideArray.length; i++) {
      myHTML += "<div id='" + slideCarousel.slideArray[i].id + 
      "' class='singleSlide' style='background-image:url(" + slideCarousel.slideArray[i].background + ");'>" + 
      "</div>"; 

    }
    document.getElementById(container).innerHTML = myHTML;
    document.getElementById(container + "_slide" + slideCarousel.currentSlideIndex).style.left = 0;
  },
  createButtons : function(container, isAppend) {
    var slideContainer = document.getElementById("container-" + container);
    var btnLeft = document.createElement("BUTTON");
    var btnRight = document.createElement("BUTTON");
    var tl = document.createTextNode("<<");
    var tr = document.createTextNode(">>");


    btnLeft.appendChild(tl);
    btnRight.appendChild(tr);

    btnLeft.setAttribute('OnClick', 'slideCarousel.prevSlide("' + container + '")');
    btnRight.setAttribute('OnClick', 'slideCarousel.nextSlide("'+ container + '")');

    if(isAppend){
      slideContainer.appendChild(btnLeft);
      slideContainer.appendChild(btnRight);
    }else {
      slideContainer.insertBefore(btnRight, slideContainer.firstChild);
      slideContainer.insertBefore(btnLeft, slideContainer.firstChild);
    }
  }, 
  prevSlide: function(container){
    var nextSlideIndex;
    if (slideCarousel.currentSlideIndex === 0 ) {
      nextSlideIndex = slideCarousel.slideArray.length - 1;
    } else {
      nextSlideIndex = slideCarousel.currentSlideIndex - 1;
    } 
    
    document.getElementById(container + "_slide" + nextSlideIndex).style.left = "-100%";
    document.getElementById(container + "_slide" + slideCarousel.currentSlideIndex).style.left = 0;
    
    document.getElementById(container + "_slide" + nextSlideIndex).setAttribute("class", "singleSlide slideInLeft");
    document.getElementById(container + "_slide" + slideCarousel.currentSlideIndex).setAttribute("class", "singleSlide slideOutRight");
    
    slideCarousel.currentSlideIndex = nextSlideIndex;
  },
  nextSlide: function(container){
    var nextSlideIndex;
    if (slideCarousel.currentSlideIndex === (slideCarousel.slideArray.length - 1) ) {
      nextSlideIndex = 0;
    } else {
      nextSlideIndex = slideCarousel.currentSlideIndex + 1;
    } 
    
    document.getElementById(container + "_slide" + nextSlideIndex).style.left = "100%";
    document.getElementById(container + "_slide" + slideCarousel.currentSlideIndex).style.left = 0;
    
    document.getElementById(container + "_slide" + nextSlideIndex).setAttribute("class", "singleSlide slideInRight");
    document.getElementById(container + "_slide" + slideCarousel.currentSlideIndex).setAttribute("class", "singleSlide slideOutLeft");
    
    slideCarousel.currentSlideIndex = nextSlideIndex;
  }

}
