// Defines an inventory item
// @param Object map The map object
function ItemAxe (map) {
  
  // holds this object for itself
  var self = this;
  
  // extend this object with the base item
  BaseItem.call(this, map);
  // give this object a type
  this.type = 'item';
  // the name of the item
  this.name = "Axe";
  // the description of the item
  this.description = "Not the best, but it'll chop a tree down.";
  // the amount of damage that the item does
  this.damage = (function () {
    // the map we are on
    var mapNumber = map ? map.map : 1;
    // the level times 5 damage
    return mapNumber * 5;
  })();
  // an image of the axe
  this.image = "/images/items/item-axe.png";
  // the cost of this item
  this.cost = (function () {
    // the map we are on
    var mapNumber = map ? map.map : 1;
    // the level times 3 cost
    return mapNumber * 3;
  })();
  
}