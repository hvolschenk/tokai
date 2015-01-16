// Defines an inventory item
// @param Object game The game currently being played
function ItemSword (game) {
  
  // extend this object with the base item
  BaseItem.call(this, game);
  
  // the name of the item
  this.name = "Sword";
  // the description of the item
  this.description = "A nice sharp blade.";
  // the amount of damage that the item does
  this.damage = 8;
  // an image of the sword
  this.image = "images/item/item-sword.png";
  // the cost of the sword
  this.cost = 10;
  // the weight of the sword
  this.weight = 3;
  // the damage scaling per level
  this.damagePerLevel = 8;
  // the cost scaling per level
  this.costPerLevel = 10;
  
};

// this class inherits from base item
ItemSword.inheritsFrom(BaseItem);

// the type of this class
ItemSword.prototype.type = 'weapon';