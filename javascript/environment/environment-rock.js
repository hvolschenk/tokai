// defines a rock
// @param object map The map object
function Rock (map) {
  
  // holds this object for itself
  var self = this;
  
  // extend this object with the base object
  BaseObject.call(this, map);
  // give this object a type
  this.type = 'rock';
  // set the background-image for this object
  this.image = [
    '/images/environment/rocks-1.png',
    '/images/environment/rocks-2.png'
  ];
  
  // add a clash handler for this type
  // @param string direction The direction the player was moving before the clash
  this.clashHandler = function (direction) {
    map.statusTextElement.text('Ouch, my toe! better look out for those rocks.');
  }
  
}