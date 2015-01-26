// Defines an inventory item
// @param Object game The game currently being played
function ItemBattleAxe (game) {
  
  // extend this object with the base item
  BaseItem.call(this, game);
  
  // the name of the item
  this.name = "Battle Axe";
  // the description of the item
  this.description = "For battle, it looks like it will give you the upper hand on your enemy.";
  // the amount of damage that the item does
  this.damage = 15;
  // an image of the axe
  this.image = "images/item/item-battle-axe.png";
  // the cost of the axe
  this.cost = 50;
  // the weight of the axe
  this.weight = 5;
  // the damage scaling per level
  this.damagePerLevel = 10;
  // the cost scaling per level
  this.costPerLevel = 15;
  
};

// this class inherits from base item
ItemBattleAxe.inheritsFrom(BaseItem);

// the type of this class
ItemBattleAxe.prototype.type = 'weapon';