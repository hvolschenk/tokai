// the rock class
// @param object game The game being played
function EnvironmentRock (game) {

  // call the parent class
  BaseEnvironment.call(this, game);

  // set the background-image for this object
  this.image = [
    'images/environment/rock/environment-rock-large.png',
    'images/environment/rock/environment-rock-small.png'
  ];

};

// this class inherits from base environment
EnvironmentRock.inheritsFrom(BaseEnvironment);

// set the type for this class
EnvironmentRock.prototype.type = 'rock';