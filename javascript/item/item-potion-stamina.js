// Defines an inventory item
// @param Object game The game currently being played
function ItemPotionStamina (game) {
  
  // extend this object with the base item
  BaseItem.call(this, game);
  
  // the name of the item
  this.name = "Stamina potion";
  // the description of the item
  this.description = "Can be used to restore stamina during combat.";
  // an image of the axe
  this.image = "images/item/item-potion-stamina.png";
  // the amount of stamina consuming this potion grants
  this.stamina = 50;
  // the cost of the axe
  this.cost = 5;
  // the weight of the axe
  this.weight = 3;
  // the cost scaling per level
  this.costPerLevel = 5;
  // the stamina this potion gives extra per level
  this.staminaPerLevel = 30;
  
};

// this class inherits from base item
ItemPotionStamina.inheritsFrom(BaseItem);

// the type of this class
ItemPotionStamina.prototype.type = 'potion';