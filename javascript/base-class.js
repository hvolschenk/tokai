// a base class type object for common methods between all class types (warrior, mage, rogue)
function BaseClass () {
  
  // a reference to this class
  var self;
  
  // a function to show the statistics of a class type
  // @param Boolean showName Whether to add in the character name
  // @return jQuery htmlObject The statistics bar
  this.buildStatistics = function (showName) {
  	// the element that will contain the three bars
    var barsElement = $('<div class="bars classTypeBars"></div>'),
    // the health bar element
    barHealth = $('<div class="bar health"></div>'),
    // the mana bar element
    barMana = $('<div class="bar mana"></div>'),
    // the stamina bar element
    barStamina = $('<div class="bar stamina"></div>');
    // see whether the name must be shown
    if (showName === true) {
      // append the name to the element
      barsElement.append('<p>' + self.characterName + '</p>');
    }
    // add the health bar element
    barsElement.append(barHealth);
    // add the mana bar element
    barsElement.append(barMana);
    // add the stamina bar element
    barsElement.append(barStamina);
    // set the width and title of the health bar
    barHealth.css({'width' : self.baseHealth + 'px'}).html('<p>' + self.baseHealth + '</p>');
    // set the width and title of the mana bar
    barMana.css({'width' : self.baseMana + 'px'}).html('<p>' + self.baseMana + '</p>');
    // set the width and title of the health bar
    barStamina.css({'width' : self.baseStamina + 'px'}).html('<p>' + self.baseStamina + '</p>');
    // return the element that was built up
    return barsElement;
  };

  // set the reference to this class
  self = this;

}