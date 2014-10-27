// defines an enemy
// @param object map The map object
function Enemy (map) {
  
  // holds this object for itself
  var self;
  
  // extend this object with the base object
  BaseObject.call(this, map);
  // give this object a type
  this.type = 'enemy';
  
  // adds a clash handler method
  // @param string direction The direction the player is moving in
  this.clashHandler = function (direction) {
    // update the status text
    map.statusTextElement.text('Press "' + direction + '" again to fight this enemy.');
  }
  
  // set the self variable equal to this class
  self = this;

}