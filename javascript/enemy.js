// defines an enemy
// @param object map The map object
function Enemy (map) {
  
  // holds this object for itself
  var self = this;
  
  // extend this object with the base object
  BaseObject.call(this, map);
  // give this object a type
  this.type = 'enemy';
  // the base enemy image
  this.image = '/images/enemy.png';
  
  // adds a clash handler method
  // @param string direction The direction the player is moving in
  this.clashHandler = function (direction) {
    // start a fight
    map.loadArena(self);
  }
  
  // prepares the enemy for battle
  this.prepareForBattle = function () {
    // HENDRIK - set the correct bg image once we have one
  }

}