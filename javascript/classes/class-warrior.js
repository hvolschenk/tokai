// Defines the Warrior class type
// @param object map The map object
function ClassWarrior (map) {

  // a reference to this class
  var self = this;
  
  // extend this object with the base object
  BaseClass.call(this, map);

  // the character name
  this.characterName = '';
  // this class''s name
  this.name = 'Warrior';
  // the class type
  this.type = 'warrior';
  // the images for this class
  this.images = {
    front : '/images/characters/warrior-front.png',
    back  : '/images/characters/warrior-back.png'
  };
  // the main image for this class
  this.image = [
    '/images/characters/warrior-back.png',
    '/images/characters/warrior-right.png',
    '/images/characters/warrior-front.png',
    '/images/characters/warrior-left.png'
  ];
  // the base attack damage for this class
  this.damageBase = 30;
  // the base health for this class type
  this.healthBase = 300;
  // the current health of this class type
  this.healthCurrent = 300;
  // the base mana for this class type
  this.manaBase = 100;
  // the current mana for this class type
  this.manaCurrent = 100;
  // the base stamina for this class type
  this.staminaBase = 200;
  // the current stamina for this class type
  this.staminaCurrent = 200;
  // the base amount of armor for this class type
  this.armorBase = 0;
  // the lore story for this class type
  this.lore = ' grew up near the village of Werth, not too far from the capital. He is fairly educated and came from a good family, although he had a taste for getting himself in over his head as a child. His Uncle Norhan told him stories of adventures and such which got him curious about seeking fame and fortune, until that one day the big accident happened.';
  // the abilities that this class has
  this.abilities = [
    // auto attack
    new AbilityBash(self),
    // first mana ability
    new AbilityJuggernaut(self),
    // second mana ability
    new AbilityEndurance(self),
    // first stamina ability
    new AbilityDualBash(self),
    // second stamina ability
    new AbilityStagger(self)
  ];

}