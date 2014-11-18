// defines a water
// @param object map The map object
function Water (map) {
  
  // holds this object for itself
  var self;
  
  // extend this object with the base object
  BaseObject.call(this, map);
  // give this object a type
  this.type = 'water';
  
  // adds a clash handler method
  // @param string direction The direction the player is moving in
  this.clashHandler = function (direction) {
    // write some output so the user knows water is impassable
    map.statusTextElement.text('Damn, my swimming trunks are at home, if only I could remember where home is.');
  };
  
  // set the self variable equal to this class
  self = this;

}