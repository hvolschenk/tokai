// defines a tree
// @param object map The map object
function Tree (map) {
  
  // this class
  var self;

  // the width (in pixels) of a Tree element
  this.treeWidth = 60;
  // the height (in pixels) of a Tree element
  this.treeHeight = 60;
  // holds the left offset of the tree
  this.left = 0;
  // holds the top offset of the tree
  this.top = 0;
  // holds the right offset of the tree
  this.right = this.left + this.treeWidth;
  // holds the bottom offset of the tree
  this.bottom = this.top + this.treeHeight;
  // holds the tree''s template number
  this.template = 1;
  // holds the tree html element
  this.treeElement = $('<div class="tree"></div>');

  // initializes the tree object and loads the local variables
  // @param object tree The tree to load
  this.initialize = function (tree) {
    // set the left offset value
    self.left = tree.position.left * self.treeWidth;
    // set the top offset value
    self.top = tree.position.top * self.treeHeight;
    // set the right offset value
    self.right = self.left + self.treeWidth;
    // set the bottom offset value
    self.bottom = self.top + self.treeHeight;
  }

  // adds the Tree to the html element specified
  // @param htmlElement mapElement The html element that is the map
  this.addElement = function (mapElement) {
    // add the new CSS to the tree element
    self.treeElement.css({
      left : self.left + 'px',
      top : self.top + 'px'
    });
    // append the new html to the map element
    mapElement.append(self.treeElement);
  }
  
  // adds a clash handler method
  this.clashHandler = function () {
    // set the status text
    map.statusTextElement.text('Hey, watch it, I am just a tree.');
    console.log('Hey, watch it.');
  }

  // set the self variable equal to this class
  self = this;

}