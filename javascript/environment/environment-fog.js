// the fog class
// @param object game The game being played
function EnvironmentFog (game) {

  // call the parent class
  BaseEnvironment.call(this, game);

  // by default fog has not been discovered
  this.discovered = false;

};

// this class inherits from base environment
EnvironmentFog.inheritsFrom(BaseEnvironment);

// set the type for this class
EnvironmentFog.prototype.type = 'fog';