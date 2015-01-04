// Defines the Warrior class type
// @param Game game The game that is currently being played
function ClassWarrior (game) {

  // call the parent class
  BaseClass.call(this, game);
  
  // this class''s name
  this.name = 'Warrior';
  // the images for a mage
  this.image = [
    'images/class/warrior/warrior-back.png',
    'images/class/warrior/warrior-back.png',
    'images/class/warrior/warrior-front.png',
    'images/class/warrior/warrior-front.png'
  ];
  // the base attack damage for this class
  this.damageBase = 20;
  // the base health for this class type
  this.healthBase = 300;
  // the base mana for this class type
  this.manaBase = 100;
  // the base stamina for this class type
  this.staminaBase = 200;
  // the base amount of armor for this class type
  this.armorBase = 0;
  // the lore story for this class type
  this.lore = ' grew up near the village of Werth, not too far from the capital. He is fairly educated and came from a good family, although he had a taste for getting himself in over his head as a child. His Uncle Norhan told him stories of adventures and such which got him curious about seeking fame and fortune, until that one day the big accident happened.';
  // a list of abilities for this class
  this.abilityList = [AbilityBash, AbilityJuggernaut, AbilityEndurance, AbilityDualBash, AbilityStagger];

}

// this class extends the BaseClass class
ClassWarrior.inheritsFrom(BaseClass);

// the type for this class
ClassWarrior.prototype.type = 'warrior';