// @param Object classType The class type that has this ability
function BaseAbility (classType) {

  // a reference to this class
  var self = this;
  
  // the ability description element
  this.abilityDescriptionElement = $('<div class="abilityDescription"></div>');
  
  // update the ability description element
  this.updateAbilityDescriptionElement = function () {
    // the key to press for this ability
    var keyboardKey = $('<div class="keyboardKey"></div>'),
    // a description of the ability
    name = $('<p></p>'),
    // an indication of what the ability costs
    costIndicator = $('<span class="cost"></span>'),
    // the description of the ability
    description = $('<span class="description"></span>');
    // set the correct keyboard key
    keyboardKey.html(self.key);
    // set the name
    name.html(self.name + ':');
    // set the description
    description.html(self.description);
    // add the key, description and cost to the description element
    self.abilityDescriptionElement.empty().append(keyboardKey, name);
    // check if a type is defined
    if (self.type !== '') {
      // add the cost class and value
      costIndicator.html(self[self.type + 'Cost']).addClass(self.type);
      // add the cost indicator to the ability description element
      name.append(costIndicator);
    }
    // add the description
    name.append('<br />', description);
  };
  
  // cast the ability
  // @param Object enemy The enemy that the ability is being cast on
  this.cast = function (enemy) {
    // remove the health cost from the class type health
    classType.loseResource('health', self.healthCost);
    // remove the mana cost from the class type mana
    classType.loseResource('mana', self.manaCost);
    // remove the stamina cost from the class type stamina
    classType.loseResource('stamina', self.staminaCost);


    // do health damage to the enemy
    // do mana damage to the enemy
    // do stamina damage to the enemy
    

    // gain health
    classType.gainResource('health', self.healthGain);
    // gain mana
    classType.gainResource('mana', self.manaGain);
    // gain stamina
    classType.gainResource('stamina', self.staminaGain);

    // re-build the class type statistics
    classType.buildStatistics();
  };

  // check if the ability is allowed to be casted
  this.allowedToCast = function () {
    // the resources to check for
    var resources = ['health', 'mana', 'stamina'],
    // whether or not the test failed
    allowedToCast = true;
    // go through each of the resources
    $.each(resources, function () {
      // check if the resource cost of this ability is higher than the owned amount
      if (classType[this + 'Current'] - self[this + 'Cost'] < 0) {
        // fail the test, this ability cannot be casted
        allowedToCast = false;
      }
    });
    // return the result
    return allowedToCast;
  };
  
}