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
  items = this.game.map.player.inventory.items,
  // a function to add wood to the player's inventory
  addWood = function () {
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
  };
  // see if the player has the axe equipped
  if (this.game.map.player.inventory.hasOwnProperty('weapon') && this.game.map.player.inventory.weapon.name === 'Axe') {
    // add a piece of wood to the player's inventory
    addWood();
  } else {
    // go through all the player''s inventory items
    $.each(items, function () {
      // see if this item is the "Axe"
      if (this.name === "Axe") {
        // add a piece of wood to the player's inventory
        addWood();
        // we have found what we are looking for and now quit the loop
        return false;
      }
    });
  }
};