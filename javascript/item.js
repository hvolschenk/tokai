// Defines an inventory item
// @param Object map The map object
function Item (map) {
  
  // holds this object for itself
  var self;
  
  // extend this object with the base object
  BaseObject.call(this, map);
  // give this object a type
  this.type = 'item';
  
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
    // set the name of the Item
    self.name = object.name;
    // set the damage of this item
    self.damage = object.damage;
  };
  
  // adds a clash handler method
  this.clashHandler = function () {
    // update the status text
    map.statusTextElement.text('You have picked up the ' + self.name + ' (' + self.damage + ' damage).');
    // add this item to the Player''s inventory
    map.player.inventory.addItem(self);
    // remove the item from the map
    self.element.remove();
    // remove the item from the map''s array
    map.objects.splice(map.objects.indexOf(self), 1);
    // rebuild the inventory
    map.player.inventory.buildInventory();
  }
  
  // set the self variable equal to this class
  self = this;
  
}