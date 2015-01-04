// Defines an inventory item
// @param Object game The game currently being played
function ItemAxe (game) {
  
  // extend this object with the base item
  BaseItem.call(this, game);
  
  // the name of the item
  this.name = "Axe";
  // the description of the item
  this.description = "Not the best, but it looks like it can chop down some trees.";
  // the amount of damage that the item does
  this.damage = 5;
  // an image of the axe
  this.image = "images/item/item-axe.png";
  
};

// this class inherits from base item
ItemAxe.inheritsFrom(BaseItem);

// the type of this class
ItemAxe.prototype.type = 'weapon';