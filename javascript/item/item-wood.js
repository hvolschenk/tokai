// Defines an inventory item
// @param Object game The game currently being played
function ItemWood (game) {
  
  // extend this object with the base item
  BaseItem.call(this, game);
  
  // the name of the item
  this.name = "Wood";
  // the description of the item
  this.description = "A fleshly cut piece of wood.";
  // an image of the wood
  this.image = "images/item/item-wood.png";
  // the cost of wood
  this.cost = 1;
  // whether this items stacks within your inventory
  this.stackable = true;
  // how many are allowed to be stacked on top of each other
  this.stackSize = 5;
  
};

// this class inherits from base item
ItemWood.inheritsFrom(BaseItem);

// the type of this class
ItemWood.prototype.type = 'wood';