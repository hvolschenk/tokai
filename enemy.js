function Enemy () {

  // the width of a enemy element
  var enemyWidth = 60,
  // the height of an enemy element
  enemyHeight = 60,
  // this class
  self;

  // holds the left offset of the enemy
  this.left = 0;
  // holds the top offset of the enemy
  this.top = 0;
  // holds the enemy's template number
  this.template = 1;
  // holds the enemy html element
  this.enemyElement = $('<div class="enemy"></div>');

  // initializes the enemy object and loads the local variables
  // @param object enemy The enemy to load
  this.initialize = function (enemy) {
    // set the left offset value
    self.left = enemy.position.left * enemyWidth;
    // set the top offset value
    self.top = enemy.position.top * enemyHeight;
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

  // set the local reference of this class
  self = this;

}