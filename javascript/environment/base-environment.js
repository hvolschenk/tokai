// the base environment class
// @param object game The game being played
function BaseEnvironment (game) {

  // call the parent class
  BaseObject.call(this, game);

};

// this class extends the base object class
BaseEnvironment.inheritsFrom(BaseObject);

// give this class a type
BaseEnvironment.prototype.type = 'environment';