// the exit class
// @param object game The game being played
function EnvironmentExit (game) {

  // call the parent class
  BaseEnvironment.call(this, game);

  // a background-image for a exit object
  this.image = 'images/environment/exit/environment-exit.png';

};

// this class inherits from base environment
EnvironmentExit.inheritsFrom(BaseEnvironment);

// set the type for this class
EnvironmentExit.prototype.type = 'exit';

// adds a clash handler method
// @param string direction The direction the player is moving in
EnvironmentExit.prototype.clashHandler = function (direction) {
  // increment the map level number
  this.game.map.map++;
  // initialize the map
  this.game.map.initialize();
  // initialize the store
  this.game.map.store.load();
}