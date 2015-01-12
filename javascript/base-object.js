// The base object of all objects that will be displayed on screen
// @param Game game The game that is currently being played
function BaseObject (game) {

  // set this game up
  this.game = game;
  // a width for any object
  this.width = 60;
  // a height for any object
  this.height = 60;
  // the left offset of this element
  this.left = 0;
  // the right osset of this element
  this.right = 60;
  // the top offset of this element
  this.top = 0;
  // the bottom osset of this element
  this.bottom = 60;
  // whether to load the object's image as a background-image
  this.imageAsBackground = false;
  // the image that is currently selected (random if this is null)
  this.currentImage = null;
  // whether this object is dead
  this.dead = false;
  // add new empty events for this object
  this.events = {};
  // this item has a position
  this.position = {
    top : 0,
    left : 0
  };
  // create a new element
  this.element = $('<div></div>');
  // every object is clashable by default
  this.clashable = true;
  // whether or not to show the level element
  this.showLevel = true;

};

// set teh type
BaseObject.prototype.type = 'object';

// an initialization function for the object
BaseObject.prototype.initialize = function () {
  // update the element
  this.updateElement();
};

// the add element method that will add the element to the page
// @param htmlElement parentElement The parent element to append this one to
BaseObject.prototype.addElement = function (parentElement) {
  // is if a parent element was given otherwise append to body
  parentElement = parentElement || $('body');
  // append the element to the parent element
  parentElement.append(this.element);
};

// updates the html element's CSS properties
BaseObject.prototype.updateElement = function () {
  // set the new CSS properties for this element
  this.element.css({
    width : this.width + 'px',
    height : this.height + 'px'
  });
  // update the element's position
  this.updatePosition();
  // see if this object has a position set
  if (this.position) {
    // set the positional css of this element
    this.element.css({
      top : (this.position.top * this.height) + 'px',
      left : (this.position.left * this.width) + 'px',
      'z-index' : this.position.top
    });
  }
  // add the image to the element
  this.addImageToElement();
  // add the level indicator to the element
  this.addLevelToElement();
  // adds the classes to the element
  this.addClassList();
};

// updates the object's position
BaseObject.prototype.updatePosition = function () {
  // set the top, left, right and bottom values
  this.top = this.position.top * this.height;
  this.left = this.position.left * this.width;
  this.right = this.left + this.width;
  this.bottom = this.top + this.height;
};

// get a list of classes to add to the element
BaseObject.prototype.addClassList = function () {
  // whther all parent classes were traversed
  var done = false,
  // all the classes that were found
  classes = [],
  // the object we are currently looking through for parents and classes
  object = this,
  // the BaseObject class
  self = this;
  // continue until we have traversed all parents
  while (done === false) {
    // see that the current type is not already in the classes list
    if (classes.indexOf(object.type) === -1) {
      // add this current type to the list of classes
      classes.push(object.type);
    }
    // see if this current object has a parent
    if (object.parent) {
      // set the parent as the new object
      object = object.parent;
    }
    else {
      // no more parents, we are done traversing
      done = true;
    }
  }
  // make sure that some classes were found
  if (classes.length > 0) {
    // go through each of the classes
    classes.forEach(function (current, index, array) {
      // add the class to the element
      self.element.addClass(current);
    });
  }
};

// adds the image/background-image to the element
BaseObject.prototype.addImageToElement = function () {
  // the source of the image
  var source,
  // the image itself
  image;
  // check if the object is dead
  if (this.dead === true) {
    // see if this object has a dead image
    if (this.imageDead) {
      // set the source to the dead image
      source = this.imageDead;
    }
  }
  // does this object have an image
  if (this.image && source === undefined) {
    // does this object have an array of images
    if (typeof(this.image) === 'string') {
      // set the source of the image as the image
      source = this.image;
    } else {
      // see if a default image is set
      if (this.currentImage !== null) {
        // load the image that was set
        source = this.image[this.currentImage];
      } else {
        // get a random image
        source = this.image[Math.floor((Math.random() * this.image.length-1) + 1)];
      }
    }
  }
  // check if a source exists
  if (source !== undefined) {
    // empty out the element
    this.element.empty();
    // see if this image needs to be a background image
    if (this.imageAsBackground === true) {
      // set the background-image of the object
      this.element.css({'background-image' : 'url(' + source + ')'});
    } else {
      // build a new image
      image = $('<img src="' + source + '" />');
      // add the image to the element
      this.element.append(image);
    }
  }
};

// adds the level indicator to the element
BaseObject.prototype.addLevelToElement = function () {
  // a level indicator element inside this element
  var currentIndicator = this.element.find('.level');
  // check if we can show the level
  if (this.showLevel === true && currentIndicator.length === 0) {
    // a level indicator
    var levelIndicator = $('<span class="level roundedCorners grayArea"></span>');
    // check to see if this object has a "level" attribute
    if (this.level) {
      // update the level of the level indicator
      levelIndicator.text(this.level);
      // add a level indicator to the element
      this.element.append(levelIndicator);
    }
  }
};

// loads an object from data
// @param object data The data to load
BaseObject.prototype.load = function (data) {
  // a reference to this base object
  var self = this;
  // go through each key in the data
  $.each(data, function (key, value) {
    // load this data onto the object
    self[key] = value;
  });
};

// when you kill an object
BaseObject.prototype.kill = function () {
  // cannot clash with the object anymore
  this.clashable = false;
  // kill the tree
  this.dead = true;
  // re-add the image element
  this.initialize();
};

// figures out the level of the object
BaseObject.prototype.initializeLevel = function () {
  // the level is based on the map
  this.level = (this.game.map) ? this.game.map.map : 1;
};

// sets up all events for this object
BaseObject.prototype.setupEvents = function () {
  // a reference to the object
  var self = this,
  // a list of keyboard key events
  keyEvents = {};
  // go through each property in the events object
  $.each(this.events, function (key, value) {
    // the key as an array
    var keyArray = key.split(' '),
    // the event itself
    event,
    // the identifier of the event
    identifier;
    // see if the key is a number
    if (!isNaN(key) && parseInt(Number(key)) == key && !isNaN(parseInt(key, 10))) {
      // add this to the list of key events
      keyEvents[key] = value;
    } else {
      // set the event
      event = keyArray[0];
      // remove the first key from the event
      keyArray.splice(0, 1);
      // set up the identifier of the event
      identifier = keyArray.join(' ');
      // bind this event now
      $(document).on(event, identifier, $.proxy(value, self));
    }
  });
  // see if there are any key events
  if (keyEvents) {
    // create a keypress event
    $(document).on('keydown', function (e) {
      // see if a method exists for this key
      if (keyEvents[e.which]) {
        // run the event
        $.proxy(keyEvents[e.which], self)();
      }
    });
  }
};

// removes all events for all objects
BaseObject.prototype.removeEvents = function () {
  // remove all events
  $(document).off();
};