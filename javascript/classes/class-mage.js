// Defines the Mage class type
// @param object map The map object
function ClassMage (map) {

  // a reference to this class
  var self = this;

  // extend this object with the base object
  BaseClass.call(this, map);

  // the character name
  this.characterName = '';
  // this class''s name
  this.name = 'Mage';
  // the class type
  this.type = 'mage';
  // the main image for this class
  this.image = [
    '/images/characters/mage-back.png',
    '/images/characters/mage-right.png',
    '/images/characters/mage-front.png',
    '/images/characters/mage-left.png'
  ];
  // the base attack damage for this class
  this.damageBase = 20;
  // the base health for this class type
  this.healthBase = 200;
  // the current health of this class type
  this.healthCurrent = 200;
  // the base mana for this class type
  this.manaBase = 300;
  // the current mana for this class type
  this.manaCurrent = 300;
  // the base stamina for this class type
  this.staminaBase = 100;
  // the current stamina for this class type
  this.staminaCurrent = 100;
  // the base amount of armor for this class type
  this.armorBase = 0;
  // the lore story for this class type
  this.lore = ' is the daughter of the great wizard "Custos" who was the guardian of all magic and secrets, from a young age Maggie learnt the art of becoming his successor was by reading and learning new abilities, but she has a dark secret that she does not whant her father to know about, until that day the big accident happened.';
  // a list of abilities
  this.abilities = [
    // auto attack
    new AbilityBlast(self),
    // first mana ability
    new AbilitySilence(self),
    // second mana ability
    new AbilityHeal(self),
    // first stamina ability
    new AbilitySyphon(self),
    // second stamina ability
    new AbilityNuke(self)
  ];

}