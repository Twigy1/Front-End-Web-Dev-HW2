var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var NEXT_SELECTOR = '[class="next"]';
var PREVIOUS_SELECTOR = '[class="previous"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
  'use strict';
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl)

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
  });
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function getPrevious() {
  'use strict';
  var previous = document.querySelector(PREVIOUS_SELECTOR);
  return previous.addEventListener('click', function(event) {
    event.preventDefault();
    var thumbnails = getThumbnailsArray();
    var index = getPosition();

    if(index != 0){
      var previousImage = thumbnails[index - 1];
    }else{
      var previousImage = thumbnails[4];
    }
    setDetailsFromThumb(previousImage);
  });
}

function getNext() {
  'use strict';
  var next = document.querySelector(NEXT_SELECTOR);
  return next.addEventListener('click', function(event) {
    event.preventDefault();
    var thumbnails = getThumbnailsArray();
    var index = getPosition();

    if(index != 0){
      var nextImage = thumbnails[index + 1];
    }else{
      var nextImage = thumbnails[0];
    }
    setDetailsFromThumb(nextImage);
  });
}


function getPosition() {

  var index = 0;
  var titles = document.querySelector(DETAIL_TITLE_SELECTOR);
  var titlecontent = titles.textContent;

  if (titlecontent === "Stayin' Alive") {
    index = 0;
    return index;
  }
  if (titlecontent === "How Deep Is Your Love") {
    index = 1;
    return index;
  }
  if (titlecontent === "You Should Be Dancing") {
    index = 2;
    return index;
  }
  if (titlecontent === "Night Fever") {
    index = 3;
    return index;
  }
  if (titlecontent === "To Love Somebody") {
    index = 4;
    return index;
  }
}

function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
  'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function() {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function addKeyPressHandler() {
  'use strict';
  document.body.addEventListener('keyup', function(event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === ESC_KEY) {
      hideDetails();
    }
  });
}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
  getNext();
  getPrevious();
}

initializeEvents();
