// Defines the Spider class type
// @param Game game The game that is currently being played
function ClassSpider (game) {
  
  // call the parent class
  BaseClass.call(this, game);
  
  // this class''s name
  this.name = 'Spider';
  // the images for a rogue
  this.image = [
    'images/class/spider/spider-front.png',
    'images/class/spider/spider-front.png',
    'images/class/spider/spider-front.png',
    'images/class/spider/spider-front.png'
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
  // the amount of damage the spider gains per level
  this.damagePerLevel = this.damageBase * 0.2;
  // the amount of health the spider gains per level
  this.healthPerLevel = this.healthBase * 0.1;
  // the amount of mana the spider gains per level
  this.manaPerLevel = this.manaBase * 0.1;
  // the amount of stamina the spider gains per level
  this.staminaPerLevel = this.staminaBase * 0.1;

}

// this class extends BaseClass
ClassSpider.inheritsFrom(BaseClass);

// the class type
ClassSpider.prototype.type = 'spider';