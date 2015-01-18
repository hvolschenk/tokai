// the mage class
// @param Game game The game that is currently being played
function ClassMage (game) {
  
  // call the parent class
  BaseClass.call(this, game);

  // the name of this class
  this.name = 'Mage';
  // the images for a mage
  this.image = [
    'images/class/mage/mage-back.png',
    'images/class/mage/mage-right.png',
    'images/class/mage/mage-front.png',
    'images/class/mage/mage-left.png'
  ];
  // the base attack damage for this class
  this.damageBase = 25;
  // the base health for this class type
  this.healthBase = 200;
  // the base mana for this class type
  this.manaBase = 300;
  // the base stamina for this class type
  this.staminaBase = 100;
  // the base amount of armor for this class type
  this.armorBase = 0;
  // the lore story for this class type
  this.lore = ' is the daughter of the great wizard "Custos" who was the guardian of all magic and secrets, from a young age Maggie learnt the art of becoming his successor was by reading and learning new abilities, but she has a dark secret that she does not whant her father to know about, until that day the big accident happened.';
  // a list of abilities
  this.abilityList = [AbilityBlast, AbilitySilence, AbilityHeal, AbilitySyphon, AbilityNuke];

};

// this class extends the BaseClass class
ClassMage.inheritsFrom(BaseClass);

// the type for this class
ClassMage.prototype.type = 'mage';