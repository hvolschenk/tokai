// defines an exit
// @param object map The map object
function Exit (map) {
  
  // holds this object for itself
  var self = this;
  
  // extend this object with the base object
  BaseObject.call(this, map);
  // give this object a type
  this.type = 'exit';
  // set the background-image for this object
  this.image = [
    '/images/environment/environment-exit.jpg'
  ];

  // adds a clash handler method
  // @param string direction The direction the player is moving in
  this.clashHandler = function (direction) {
    // update the status text
    map.statusTextElement.text('You have found the exit, on to the next map.');
    // update the map number
    map.map++;
    // remove all objects on the map
    map.objects = [];
    // empty out the map element
    map.mapElement.empty();
    // remove all map events
    map.removeEvents();
    // initialize the new map
    map.initialize(map.player);
    // level up the player
    map.player.level++;
  }

}