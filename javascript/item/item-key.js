// Defines an inventory item
// @param Object game The game currently being played
function ItemKey (game) {
  
  // extend this object with the base item
  BaseItem.call(this, game);
  
  // the name of the item
  this.name = "Key";
  // the description of the item
  this.description = "I am going to need this.";
  // an image of the key
  this.image = "images/item/item-key.png";
  // the cost of the key
  this.cost = 0;
  // the weight of the key
  this.weight = 1;
  
};

// this class inherits from base item
ItemKey.inheritsFrom(BaseItem);

// the type of this class
ItemKey.prototype.type = 'quest';