// defines any object
// @param object map The map object
function BaseObject (map) {
  
  // this class
  var self = this;

  // the width (in pixels) of an element
  this.width = 60;
  // the height (in pixels) of an element
  this.height = 60;
  // holds the left offset of the element
  this.left = 0;
  // holds the top offset of the element
  this.top = 0;
  // holds the right offset of the element
  this.right = this.left + this.width;
  // holds the bottom offset of the element
  this.bottom = this.top + this.height;
  // holds the html element
  this.element = $('<div></div>');
  // holds the element type
  this.type = 'base';
  // the position of the object
  this.position = {
    top : 0,
    left : 0
  };
  // the current image
  this.currentImage = null;
  // whether you can clash into this object
  this.clashable = true;
  // whether this object is dead
  this.dead = false;

  // initializes the element object and loads the local variables
  // @param object object The object to load
  this.initialize = function (object) {
    // set the object position
    self.position = object.position;
    // set the left offset value
    self.left = self.position.left * self.width;
    // set the top offset value
    self.top = self.position.top * self.height;
    // set the right offset value
    self.right = self.left + self.width;
    // set the bottom offset value
    self.bottom = self.top + self.height;
    // check if an image was set
    if (object.image || object.image === 0) {
      // set this as the default image
      self.currentImage = object.image;
    }
  };

  // adds the Object to the html element specified
  // @param htmlElement mapElement The html element that is the map
  this.addElement = function (mapElement) {
    // add the new CSS to the element
    self.updateElement();
    // append the new html to the map element
    mapElement.append(self.element);
    // add the element image
    self.addImageToElement();
  };
  
  // updates the html element
  this.updateElement = function () {
    // add the new CSS to the element
    self.element.css({
      left : self.left + 'px',
      top : self.top + 'px',
      width : self.width + 'px',
      height : self.height + 'px',
      'z-index' : self.position.top
    }).addClass(self.type);
  };

  // adds the image to the element
  this.addImageToElement = function () {
    // the source of the image
    var source,
    // the image itself
    image;
    // check if the object is dead
    if (self.dead === true) {
      // see if this object has a dead image
      if (self.imageDead) {
        // set the source to the dead image
        source = self.imageDead;
      }
    }
    // does this object have an image
    if (self.image && source === undefined) {
      // does this object have an array of images
      if (typeof(self.image) === 'string') {
        // set the source of the image as the image
        source = self.image;
      } else {
        // see if a default image is set
        if (self.currentImage !== null) {
          // load the image that was set
          source = self.image[self.currentImage];
        } else {
          // get a random image
          source = self.image[Math.floor((Math.random() * self.image.length-1) + 1)];
        }
      }
    }
    // can we add the image
    if (source !== undefined) {
      // build a new image
      image = $('<img src="' + source + '" />');
      // add the image to the element
      self.element.empty().append(image);
    }
  };
  
  // removes an element
  this.removeElement = function () {
    // remove the element from the map
    self.element.remove();
    // remove this tree from the map''s list of trees
    map.objects.splice(map.objects.indexOf(self), 1);
  };

  // when you kill an object
  this.kill = function () {
    // cannot clash with the tree anymore
    self.clashable = false;
    // kill the tree
    self.dead = true;
    // re-add the image element
    self.addImageToElement();
  };

}