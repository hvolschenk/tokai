// the wall class
// @param object game The game being played
function EnvironmentWall (game) {

  // call the parent class
  BaseEnvironment.call(this, game);

  // a background-image for a wall object
  this.image = 'images/environment/wall/environment-wall.jpg';

};

// this class inherits from base environment
EnvironmentWall.inheritsFrom(BaseEnvironment);

// set the type for this class
EnvironmentWall.prototype.type = 'wall';