// Defines the Bear class type
// @param Game game The game that is currently being played
function ClassBear (game) {
  
  // call the parent class
  BaseClass.call(this, game);
  
  // this class''s name
  this.name = 'Bear';
  // the images for a rogue
  this.image = [
    'images/class/bear/bear-front.png',
    'images/class/bear/bear-front.png',
    'images/class/bear/bear-front.png',
    'images/class/bear/bear-front.png'
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
  // the lore story for this class type
  this.lore = 'A feral wood creature, simplistic in its ways.';
  // the abilities for this class
  this.abilityList = [AbilityAutoAttack, AbilityShadowSlash, AbilityHowlingGale];

}

// this class extends BaseClass
ClassBear.inheritsFrom(BaseClass);

// the class type
ClassBear.prototype.type = 'bear';