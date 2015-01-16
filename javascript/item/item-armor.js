// Defines an inventory item
// @param Object game The game currently being played
function ItemArmor (game) {
  
  // extend this object with the base item
  BaseItem.call(this, game);
  
  // the name of the item
  this.name = "Armor";
  // the description of the item
  this.description = "Always a good idea to have a piece of armor equipped.";
  // the amount of health that the item gives
  this.health = 10;
  // an image of the axe
  this.image = "images/item/item-armor.png";
  // the cost of the axe
  this.cost = 10;
  // the weight of the axe
  this.weight = 3;
  // the health scaling per level
  this.healthPerLevel = 5;
  // the cost scaling per level
  this.costPerLevel = 5;
  
};

// this class inherits from base item
ItemArmor.inheritsFrom(BaseItem);

// the type of this class
ItemArmor.prototype.type = 'armor';