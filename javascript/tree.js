// defines a tree
// @param object map The map object
function Tree (map) {

  // holds this object for itself
  var self = this;
  
  // extend this object with the base object
  BaseObject.call(this, map);
  // give this object a type
  this.type = 'tree';
  // a background-image for a tree object
  this.image = '/images/environment/tree-new.png';
  
  // adds a clash handler method
  // @param string direction The direction the player is moving in
  this.clashHandler = function (direction) {
    // go through all the player''s inventory items
    $.each(map.player.inventory.items, function () {
      // see if this item is the "Axe"
      if (this.name === "Axe") {
        // set up a triggered event for the current direction to chop down the tree
        map.addTriggeredEvent(direction, self.removeElement);
        // set the status text
        map.statusTextElement.text('Press "' + direction + '" again to chop down this tree with your Axe.');
        // we have found what we are looking for and now quit the loop
        return false;
      }
    });
  };

}