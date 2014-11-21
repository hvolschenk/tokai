// defines any object
// @param object map The map object
function BaseObject (map) {
  
  // this class
  var self;

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

  // initializes the element object and loads the local variables
  // @param object object The object to load
  this.initialize = function (object) {
    // set the left offset value
    self.left = object.position.left * self.width;
    // set the top offset value
    self.top = object.position.top * self.height;
    // set the right offset value
    self.right = self.left + self.width;
    // set the bottom offset value
    self.bottom = self.top + self.height;
  };

  // adds the Object to the html element specified
  // @param htmlElement mapElement The html element that is the map
  this.addElement = function (mapElement) {
    // add the new CSS to the tree element
    self.element.css({
      left : self.left + 'px',
      top : self.top + 'px',
      width : self.width + 'px',
      height : self.height + 'px'
    }).addClass(this.type);
    // append the new html to the map element
    mapElement.append(self.element);
  };
  
  // removes an element
  this.removeElement = function () {
    // remove the element from the map
    self.element.remove();
    // remove this tree from the map''s list of trees
    map.objects.splice(map.objects.indexOf(self), 1);
  };

  // set the self variable equal to this class
  self = this;

}