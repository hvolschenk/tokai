// Defines an inventory item
// @param Object game The game currently being played
function ItemPotionHealth (game) {
  
  // extend this object with the base item
  BaseItem.call(this, game);
  
  // the name of the item
  this.name = "Health potion";
  // the description of the item
  this.description = "Can be used to restore health during combat.";
  // an image of the axe
  this.image = "images/item/item-potion-health.png";
  // the amount of health consuming this potion grants
  this.health = 50;
  // the cost of the axe
  this.cost = 5;
  // the weight of the axe
  this.weight = 3;
  // the cost scaling per level
  this.costPerLevel = 5;
  // the health this potion gives extra per level
  this.healthPerLevel = 30;
  
};

// this class inherits from base item
ItemPotionHealth.inheritsFrom(BaseItem);

// the type of this class
ItemPotionHealth.prototype.type = 'potion';