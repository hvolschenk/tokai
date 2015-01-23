// the door class
// @param object game The game being played
function EnvironmentDoor (game) {

  // call the parent class
  BaseEnvironment.call(this, game);

  // a background-image for a door object
  this.image = 'images/environment/door/environment-door.png';
  // an image for when this object is dead
  this.imageDead = 'images/environment/door/environment-door-dead.png';

};

// this class inherits from base environment
EnvironmentDoor.inheritsFrom(BaseEnvironment);

// set the type for this class
EnvironmentDoor.prototype.type = 'door';

// adds a clash handler method
// @param string direction The direction the player is moving in
EnvironmentDoor.prototype.clashHandler = function (direction) {
  // a reference to this class
  var self = this,
  // a list of items to look through
  items = this.game.map.player.inventory.items,
  // whether the key was found
  keyFound = false;
  // go through all the player''s inventory items
  $.each(items, function (index, value) {
    // see if this item is the "Axe"
    if (value.name === "Key") {
      // lower the weight of the inventory
      self.game.map.player.inventory.weightCurrent -= value.weight;
      // kill (open) the door
      self.kill();
      // remove the key from the inventory
      items.splice(index, 1);
      // the key was found
      keyFound = true;
      // log that the door was opened with the key
      self.game.map.log('The door was opened with the key.');
    }
  });
  // see if no key was found
  if (keyFound === false) {
    // log about finding the key
    self.game.map.log('This door is locked, there must be a key for it somewhere.');
  }
};