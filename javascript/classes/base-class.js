// a base class type object for common methods between all class types (warrior, mage, rogue)
// @param object map The map object
function BaseClass (map) {
  
  // a reference to this class
  var self = this;

  // extend the fighter class with this class
  Fighter.call(this, map);

  // the width of the player
  this.width = 60;
  // the height of the player
  this.height = 60;
  // the type of object
  this.type = 'player';
  // holds the left offset of the player
  this.left = 0;
  // holds the top offset of the player
  this.top = 0;
  // holds the right offset of the player
  this.right = this.left + this.width;
  // holds the bottom offset of the player
  this.bottom = this.top + this.height;
  // the amount of pixels to move
  this.playerMoveSize = 60;
  // holds the player''s template number
  this.template = 1;
  // The player''s inventory
  this.inventory = new Inventory(map);

  // prepares the player for battle
  this.prepareForBattle = function () {
    // load the backside image for the player class type
//    self.element.css({
//      'background-image' : 'url(' + self.images.back + ')'
//    });
  }

  // moves the player in a direction
  this.movePlayer = function (direction) {
    // check which direction we are moving
    switch (direction) {
      case 'left':
        // set the new left value
        self.left = self.left - self.playerMoveSize;
        // set the current image of the player
        self.currentImage = 3;
        // set the new left attribute for this object
        self.position.left -= 1;
        // break out of the switch
        break;
      case 'up':
        // set the new top value
        self.top = self.top - self.playerMoveSize;
        // set the current image of the player
        self.currentImage = 0;
        // set the new top attribute for the object
        self.position.top -= 1;
        // break out of the switch
        break;
      case 'right':
        // set the new left value
        self.left = self.left + self.playerMoveSize;
        // set the current image of the player
        self.currentImage = 1;
        // set the new top attribute for the object
        self.position.left += 1;
        // break out of the switch
        break;
      case 'down':
        // set the new top value
        self.top = self.top + self.playerMoveSize;
        // set the current image of the player
        self.currentImage = 2;
        // set the new top attribute for the object
        self.position.top += 1;
        // break out of the switch
        break;
    }
    // add the image element to the object
    self.addImageToElement();
    // set the new right value
    self.right = self.left + self.width;
    // set the new bottom value
    self.bottom = self.top + self.height;
    // update the element with the new CSS
    self.updateElement();
  }

}