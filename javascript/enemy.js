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
    // start a fight
    map.loadArena(self);
  }
  
  // prepares the enemy for battle
  this.prepareForBattle = function () {
    console.log(self.element.css('top'));
    // set the top and left offset of the element
    self.element.css({
      top : '0px',
      left : '540px'
    });
    console.log(self.element.css('top'));
  }
  
  // set the self variable equal to this class
  self = this;

}