// defines an enemy
// @param object map The map object
function Enemy (map) {

  // this class
  var self;

  // the width of a enemy element
  this.enemyWidth = 60;
  // the height of an enemy element
  this.enemyHeight = 60;
  // holds the left offset of the enemy
  this.left = 0;
  // holds the top offset of the enemy
  this.top = 0;
  // holds the right offset of the enemy
  this.right = this.left + this.enemyWidth;
  // holds the bottom offset of the enemy
  this.bottom = this.top + this.enemyHeight;
  // holds the enemy''s template number
  this.template = 1;
  // holds the enemy html element
  this.enemyElement = $('<div class="enemy"></div>');

  // initializes the enemy object and loads the local variables
  // @param object enemy The enemy to load
  this.initialize = function (enemy) {
    // set the left offset value
    self.left = enemy.position.left * self.enemyWidth;
    // set the top offset value
    self.top = enemy.position.top * self.enemyHeight;
    // set the right offset value
    self.right = self.left + self.enemyWidth;
    // set the bottom offset value
    self.bottom = self.top + self.enemyHeight;
  }

  // adds the enemy to the html element specified
  // @param htmlElement mapElement The html element that is the map
  this.addElement = function (mapElement) {
    // add the new CSS to the enemy element
    self.enemyElement.css({
      left : self.left + 'px',
      top : self.top + 'px'
    });
    // append the new html to the map element
    mapElement.append(self.enemyElement);
  }
  
  // adds a clash handler method
  this.clashHandler = function () {
    // update the status text
    map.statusTextElement.text('Wanna fight? y/n.');
  }

  // set the local reference of this class
  self = this;

}