// the cave-entrance class
// @param object game The game being played
function EnvironmentCaveEntrance (game) {

  // call the parent class
  BaseEnvironment.call(this, game);

  // a background-image for a cave-entrance object
  this.image = 'images/environment/cave-entrance/environment-cave-entrance.jpg';

};

// this class inherits from base environment
EnvironmentCaveEntrance.inheritsFrom(BaseEnvironment);

// set the type for this class
EnvironmentCaveEntrance.prototype.type = 'cave-entrance';

// adds a clash handler method
// @param string direction The direction the player is moving in
EnvironmentCaveEntrance.prototype.clashHandler = function (direction) {
  // enter a cave
  this.game.enterCave();
};