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
  // the level of this enemy
  this.level = (function () {
    // the map we are on
    var mapNumber = map ? map.map : 1;
    // the level is the same as the map
    return mapNumber;
  })();
  
  // adds a clash handler method
  // @param string direction The direction the player is moving in
  this.clashHandler = function (direction) {
    // start a fight
    map.loadArena(self);
  }
  
  // choose which ability to cast
  this.chooseAbilityToCast = function () {
    // a list of abilities that the enemy can cast
    var castableAbilities = [],
    // the ability that was selected
    selectedAbility = false;
    // see if the enemy has any abilities
    if (self.abilities.length > 0) {
      // go through each of the enemy abilities
      $.each(self.abilities, function () {
        // see if the enemy can cast this ability
        if (this.allowedToCast() === true) {
          // add this to the list of abilities that the enemy is able to cast
          castableAbilities.push(this);
        }
      });
    }
    // see if any castable abilities were found
    if (castableAbilities.length > 0) {
      // choose a random castable ability
      selectedAbility = castableAbilities[Math.floor((Math.random() * castableAbilities.length-1) + 1)];
    }
    // return the selected ability
    return selectedAbility;
  };

}