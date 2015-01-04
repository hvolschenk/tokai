// the water class
// @param object game The game being played
function EnvironmentWater (game) {

  // call the parent class
  BaseEnvironment.call(this, game);

  // set the background-image for this object
  this.image = 'images/environment/water/environment-water.png';

};

// this class inherits from base environment
EnvironmentWater.inheritsFrom(BaseEnvironment);

// set the type for this class
EnvironmentWater.prototype.type = 'water';