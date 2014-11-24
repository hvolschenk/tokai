function Player (map) {

  // this class
  var self;
  
  // the width of a player element
  this.playerWidth = 60;
  // the height of an player element
  this.playerHeight = 60;
  // holds the left offset of the player
  this.left = 0;
  // holds the top offset of the player
  this.top = 0;
  // holds the right offset of the player
  this.right = this.left + this.playerWidth;
  // holds the bottom offset of the player
  this.bottom = this.top + this.playerHeight;
  // the amount of pixels to move
  this.playerMoveSize = 60;
  // holds the player''s template number
  this.template = 1;
  // The player''s inventory
  this.inventory = new Inventory(map);
  // holds the player html element
  this.playerElement = $('<div class="player"></div>');
  // holds the class type
  this.classType = {};

  // initializes the player object and loads the local variables
  // @param object player The player to load
  // @param Object classType The class type that was selected during character select
  this.initialize = function (player, classType) {
    console.log(player);
    console.log(classType);
    // set the left offset value
    self.left = player.position.left * self.playerWidth;
    // set the top offset value
    self.top = player.position.top * self.playerHeight;
    // set the new right value
    self.right = self.left + self.playerWidth;
    // set the new bottom value
    self.bottom = self.top + self.playerHeight;
    // set up the class type
    self.classType = classType;
    console.log(self);
  }

  // adds the player to the html element specified
  // @param htmlElement mapElement The html element that is the map
  this.addElement = function (mapElement) {
    // add the new CSS to the player element
    self.updateElement();
    // append the new html to the map element
    mapElement.append(self.playerElement);
  }

  // updates the element''s styling
  this.updateElement = function () {
    console.log(self);
    self.playerElement.css({
      left : self.left + 'px',
      top  : self.top + 'px',
      width : self.playerWidth + 'px',
      height : self.playerHeight + 'px',
      'background-image' : 'url(' + self.classType.images.front + ')'
    });
  }
  
  // prepares the player for battle
  this.prepareForBattle = function () {
    // load the backside image for the player class type
    self.playerElement.css({
      'background-image' : 'url(' + self.classType.images.back + ')'
    });
  }

  // moves the player in a direction
  this.movePlayer = function (direction) {
    // check which direction we are moving
    switch (direction) {
      case 'left':
        // set the new left value
        self.left = self.left - self.playerMoveSize;
        // break out of the switch
        break;
      case 'up':
        // set the new top value
        self.top = self.top - self.playerMoveSize;
        // break out of the switch
        break;
      case 'right':
        // set the new left value
        self.left = self.left + self.playerMoveSize;
        // break out of the switch
        break;
      case 'down':
        // set the new top value
        self.top = self.top + self.playerMoveSize;
        // break out of the switch
        break;
    }
    // set the new right value
    self.right = self.left + self.playerWidth;
    // set the new bottom value
    self.bottom = self.top + self.playerHeight;
    // update the element with the new CSS
    self.updateElement();
  }

  // set the local reference of this class
  self = this;

}