function Tree () {
  
  // the width (in pixels) of a Tree element
  var treeWidth = 60,
  // the height (in pixels) of a Tree element
  treeHeight = 60,
  // this class
  self;

  // holds the left offset of the tree
  this.left = 0;
  // holds the top offset of the tree
  this.top = 0;
  // holds the tree's template number
  this.template = 1;
  // holds the tree html element
  this.treeElement = $('<div class="tree"></div>');

  // initializes the tree object and loads the local variables
  // @param object tree The tree to load
  this.initialize = function (tree) {
    // set the left offset value
    self.left = tree.position.left * treeWidth;
    // set the top offset value
    self.top = tree.position.top * treeHeight;
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

  // set the self variable equal to this class
  self = this;

}