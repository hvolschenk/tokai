// Defines the Rogue class type
// @param Game game The game that is currently being played
function ClassRogue (game) {
  
  // call the parent class
  BaseClass.call(this, game);
  
  // this class''s name
  this.name = 'Rogue';
  // the images for a rogue
  this.image = [
    'images/class/rogue/rogue-back.png',
    'images/class/rogue/rogue-back.png',
    'images/class/rogue/rogue-front.png',
    'images/class/rogue/rogue-front.png'
  ];
  // the base attack damage for this class
  this.damageBase = 30;
  // the base health for this class type
  this.healthBase = 200;
  // the base mana for this class type
  this.manaBase = 100;
  // the base stamina for this class type
  this.staminaBase = 300;
  // the base amount of armor for this class type
  this.armorBase = 5;
  // the health this class receives per level
  this.healthPerLevel = 100;
  // the lore story for this class type
  this.lore = ' grew up in the streets of the capital, from a young age he had to learn to feed and fend for him self, he leart to be a master in the shadows, never knowing love or compassion until he met a compassionate girl which he fell in love with, until that one day the big accident happened.';
  // the abilities for this class
  this.abilityList = [AbilitySlash, AbilityStealthyAssassin, AbilityExchange, AbilityCriticalStrike, AbilityLifeLeach];

}

// this class extends BaseClass
ClassRogue.inheritsFrom(BaseClass);

// the class type
ClassRogue.prototype.type = 'rogue';