// the tree class
// @param object game The game being played
function EnvironmentTree (game) {

  // call the parent class
  BaseEnvironment.call(this, game);

  // a background-image for a tree object
  this.image = [
    'images/environment/tree/environment-tree-new.png',
    'images/environment/tree/environment-tree-old.png'
  ];
  // an image for when this object is dead
  this.imageDead = 'images/environment/tree/environment-tree-dead.png';

};

// this class inherits from base environment
EnvironmentTree.inheritsFrom(BaseEnvironment);

// set the type for this class
EnvironmentTree.prototype.type = 'tree';

// adds a clash handler method
// @param string direction The direction the player is moving in
EnvironmentTree.prototype.clashHandler = function (direction) {
  // a reference to this class
  var self = this,
  // a list of items to look through
  items = this.game.map.player.inventory.items;
  // see if there is a weapon to add
  if (this.game.map.player.inventory.weapon) {
    // add the equipped weapon to the list
    items.push(this.game.map.player.inventory.weapon);
  }
  // see if there is a armor to add
  if (this.game.map.player.inventory.armor) {
    // add the equipped armor to the list
    items.push(this.game.map.player.inventory.armor);
  }
  // go through all the player''s inventory items
  $.each(items, function () {
    // see if this item is the "Axe"
    if (this.name === "Axe") {
      // create a new wood item
      var wood = new ItemWood(self.game);
      // initialize the wood
      wood.initialize();
      // add this item to the Player's inventory
      self.game.map.player.inventory.addItem(wood);
      // kill this tree
      self.kill();
      // try and move the player again
      self.game.map.player.tryMove(direction);
      // we have found what we are looking for and now quit the loop
      return false;
    }
  });
};