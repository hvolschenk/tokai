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
  var self = this;
  // go through all the player''s inventory items
  $.each(this.game.map.player.inventory.items, function () {
    // see if this item is the "Axe"
    if (this.name === "Axe") {
      // kill this tree
      self.kill();
      // try and move the player again
      self.game.map.player.tryMove(direction);
      // we have found what we are looking for and now quit the loop
      return false;
    }
  });
};