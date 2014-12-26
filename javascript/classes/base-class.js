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
  // The player's level
  this.level = (function () {
    // the map we are on
    var mapNumber = map ? map.map : 1;
    // the level is the same as the map
    return mapNumber;
  })();

  // moves the player in a direction
  this.movePlayer = function (direction) {
    // check which direction we are moving
    switch (direction) {
      case 'left':
        // set the new left value
        self.left = self.left - self.playerMoveSize;
        // set the new left attribute for this object
        self.position.left -= 1;
        // break out of the switch
        break;
      case 'up':
        // set the new top value
        self.top = self.top - self.playerMoveSize;
        // set the new top attribute for the object
        self.position.top -= 1;
        // break out of the switch
        break;
      case 'right':
        // set the new left value
        self.left = self.left + self.playerMoveSize;
        // set the new top attribute for the object
        self.position.left += 1;
        // break out of the switch
        break;
      case 'down':
        // set the new top value
        self.top = self.top + self.playerMoveSize;
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

  // rotate the player in a certain direction
  // @param String direction The direction the player needs to turn in
  this.rotate = function (direction) {
    // an object containing the image numbers corresponding to the direction
    var directions = {
      up : 0,
      right : 1,
      down : 2,
      left : 3
    };
    // see if we found a number
    if (directions[direction] % 1 === 0) {
      // set the image to the corresponding number
      self.currentImage = directions[direction];
      // update the element
      self.addImageToElement();
    }
  };

}