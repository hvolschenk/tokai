// Defines an inventory item
// @param Object game The game currently being played
function ItemPotionMana (game) {
  
  // extend this object with the base item
  BaseItem.call(this, game);
  
  // the name of the item
  this.name = "Mana potion";
  // the description of the item
  this.description = "Can be used to restore mana during combat.";
  // an image of the axe
  this.image = "images/item/item-potion-mana.png";
  // the amount of mana consuming this potion grants
  this.mana = 50;
  // the cost of the axe
  this.cost = 5;
  // the weight of the axe
  this.weight = 3;
  // the cost scaling per level
  this.costPerLevel = 5;
  // the mana this potion gives extra per level
  this.manaPerLevel = 30;
  
};

// this class inherits from base item
ItemPotionMana.inheritsFrom(BaseItem);

// the type of this class
ItemPotionMana.prototype.type = 'potion';