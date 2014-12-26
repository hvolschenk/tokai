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

  // try to move the player in a direction
  // @param events event The keypress events that triggered the move
  this.move = function (event) {
    // a list of directions
    var directions = {
      37 : 'left',
      38 : 'up',
      39 : 'right',
      40 : 'down'
    },
    // the direction
    direction = directions[event.keyCode];
    // rotate the player in the direction
    self.rotate(direction);
    // see if there is a triggered event for this direction
    if (map.triggeredEvent.direction === direction && typeof map.triggeredEvent.event === 'function') {
      // call the triggered event
      map.triggeredEvent.event();
      // reset the triggered event
      map.addTriggeredEvent(null, null);
    } else {
      // reset the triggered event
      map.addTriggeredEvent(null, null);
      // test whether the player clashes
      clashResult = self.detectClash(direction);
      // see if the user is moving into anything
      if (clashResult === false) {
        // move the player in the desired direction
        self.movePlayer(direction);
        // reset the text in the status
        map.statusTextElement.text(map.defaultStatusText);
      } else {
        // see if there is an clash handling method for this type
        if (clashResult.clashHandler) {
          // call the clash handler method
          clashResult.clashHandler(direction);
        }
      }
    }
  }

  // detects a clash between the player and any object
  // @param string direction The direction in which the player is trying to move
  // @return boolean Whether the player clashes or not (true = clash)
  this.detectClash = function (direction) {
    // whether a clash has happened
    var clash = self.detectMapClash(direction);
    // see if the player hasn''t gone out of bounds
    if (clash === false) {
      // go through each item
      $.each(map.objects, function () {
        // see if you can clash into this object
        if (this.clashable === true) {
          // see which direction we are moving in
          switch (direction) {
            case 'left':
              // see if this item is to the direct left of the player
              if (self.left - self.playerMoveSize >= this.left &&
                  self.left - self.playerMoveSize < this.right &&
                  self.bottom > this.top && self.top < this.bottom) {
                // clash detected
                clash = this;
              }
              break;
            case 'up':
              // see if this item is to the direct left of the player
              if (self.top - self.playerMoveSize >= this.top &&
                  self.top - self.playerMoveSize < this.bottom &&
                  self.right > this.left && self.left < this.right) {
                // clash detected
                clash = this;
              }
              break;
            case 'right':
              // see if this item is to the direct left of the player
              if (self.right + self.playerMoveSize > this.left &&
                  self.left + self.playerMoveSize < this.right &&
                  self.bottom > this.top && self.top < this.bottom) {
                // clash detected
                clash = this;
              }
              break;
            case 'down':
              // see if this item is to the direct left of the player
              if (self.bottom + self.playerMoveSize > this.top &&
                  self.top + self.playerMoveSize < this.bottom &&
                  self.right > this.left && self.left < this.right) {
                // clash detected
                clash = this;
              }
              break;
          }
        }
      });
    }
    // return the result
    return clash;
  };

  // detects a clash between the player and the map
  // @param string direction The direction in which the player is trying to move
  // @return boolean Whether the player clashes or not (true = clash)
  this.detectMapClash = function (direction) {
    // whether the player is clashing into the bounds of the map
    var clash = false;
    // see which direction the player is going
    switch (direction) {
      case 'left':
        //see if the player clashes
        if (self.left - self.playerMoveSize < 0) {
          // the player clashes
          clash = true;
        }
        break;
      case 'up':
        //see if the player clashes
        if (self.top - self.playerMoveSize < 0) {
          // the player clashes
          clash = true;
        }
        break;
      case 'right':
        //see if the player clashes
        if (self.right + self.playerMoveSize > map.mapWidth) {
          // the player clashes
          clash = true;
        }
        break;
      case 'down':
        //see if the player clashes
        if (self.bottom + self.playerMoveSize > map.mapHeight) {
          // the player clashes
          clash = true;
        }
        break;
    }
    // return the result
    return clash === false ? clash : self;
  };

}