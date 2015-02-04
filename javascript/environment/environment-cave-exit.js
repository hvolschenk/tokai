// the cave-exit class
// @param object game The game being played
function EnvironmentCaveExit (game) {

  // call the parent class
  BaseEnvironment.call(this, game);

  // a background-image for a cave-exit object
  this.image = 'images/environment/cave-entrance/environment-cave-entrance.jpg';

};

// this class inherits from base environment
EnvironmentCaveExit.inheritsFrom(BaseEnvironment);

// set the type for this class
EnvironmentCaveExit.prototype.type = 'cave-exit';

// adds a clash handler method
// @param string direction The direction the player is moving in
EnvironmentCaveExit.prototype.clashHandler = function (direction) {
  // exit the cave
  this.game.exitCave();
};