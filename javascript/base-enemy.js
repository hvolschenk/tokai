// defines an enemy
// @param object map The map object
function BaseEnemy (map) {
  
  // holds this object for itself
  var self = this;
  
  // extend this object with the fighter object
  Fighter.call(this, map);

  // give this object a type
  this.type = 'enemy';
  // the list that holds the enemy abilities
  this.abilityList = $('<div class="abilityList enemyAbilityList"></div>');
  // the list that holds the enemy statistics
  this.statisticsList = $('<div class="bars enemyBars"></div>');
  
  // adds a clash handler method
  // @param string direction The direction the player is moving in
  this.clashHandler = function (direction) {
    // start a fight
    map.loadArena(self);
  }
  
  // prepares the enemy for battle
  this.prepareForBattle = function () {
    // HENDRIK - set the correct bg image once we have one
    // built the abilities list component
    // self.buildAbilitiesList();
  }

}