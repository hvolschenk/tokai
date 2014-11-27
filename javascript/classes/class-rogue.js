// Defines the Rogue class type
// @param object map The map object
function ClassRogue (map) {
  
  // a reference to this class
  var self = this;
  
  // extend this object with the base object
  BaseClass.call(this, map);

  // the character name
  this.characterName = '';
  // this class''s name
  this.name = 'Rogue';
  // the class type
  this.type = 'rogue';
  // the main image for this class
  this.image = [
    '/images/characters/rogue-back.png',
    '/images/characters/rogue-right.png',
    '/images/characters/rogue-front.png',
    '/images/characters/rogue-left.png'
  ];
  // the base attack damage for this class
  this.damageBase = 20;
  // the base health for this class type
  this.healthBase = 100;
  // the current health for this class type
  this.healthCurrent = 100;
  // the base mana for this class type
  this.manaBase = 200;
  // the current mana for this class type
  this.manaCurrent = 200;
  // the base stamina for this class type
  this.staminaBase = 300;
  // the current stamina for this class type
  this.staminaCurrent = 300;
  // the base amount of armor for this class type
  this.armorBase = 5;
  // the lore story for this class type
  this.lore = ' grew up in the streets of the capital, from a young age he had to learn to feed and fend for him self, he leart to be a master in the shadows, never knowing love or compassion until he met a compassionate girl which he fell in love with, until that one day the big accident happened.';
  // the abilities assigned to this class type
  this.abilities = [
    // basic attack
    new AbilitySlash(self),
    // first mana ability
    new AbilityStealthyAssassin(self),
    // second mana ability
    new AbilityExchange(self),
    // first stamina ability
    new AbilityCriticalStrike(self),
    // second stamina ability
    new AbilityLifeLeach(self)
  ];

}