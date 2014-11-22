function ClassWarrior () {
  // this class''s name
  this.name = 'Warrior';
  // the images for this class
  this.images = {
    front : '/images/characters/tank-front.png',
    back  : '/images/characters/tank-back.png'
  };
  // the base attack damage for this class
  this.baseAttackDamage = 10;
  // the mana cost for the first magic ability
  this.manaOneCost = 60;
  // the mana cost for the second magic ability
  this.manaTwoCost = 60;
  // the stamina cost for the first stamina ability
  this.staminaOneCost = 60;
  // the stamina cost for the second stamina ability
  this.staminaTwoCost = 60;
  // the base health for this class type
  this.baseHealth = 300;
  // the base mana for this class type
  this.baseMana = 100;
  // the base stamina for this class type
  this.baseStamina = 200;
  // the base amount of armor for this class type
  this.baseArmor = 1;
  // the lore story for this class type
  this.lore = ' grew up near the village of Werth, not too far from the capital. He is fairly educated and came from a good family, although he had a taste for getting himself in over his head as a child. His Uncle Norhan told him stories of adventures and such which got him curious about seeking fame and fortune, until that one day the big accident happened.';
  // the description of this class type''s auto attack
  this.autoAttackDescription = 'You steal 10% health back from auto attacks.';
  // the name of this class''s firt mana ability
  this.manaOneName = 'Courage';
  // the description of the first mana ability
  this.manaOneDescription = 'Gain one armor.';
  // the name of the second mana ability
  this.manaTwoName = 'Demolish';
  // the description of the second mana ability
  this.manaTwoDescription = 'Demolish enemy armor in a single blow.';
  // the name of the first stamina ability
  this.staminaOneName = 'Hack slash';
  // the description of the first stamina ability
  this.staminaOneDescription = 'Perform a double auto-attack.';
  // the name of the second stamina ability
  this.staminaTwoName = 'Bleed strike';
  // the description of the second stamina ability
  this.staminaTwoDescription = 'Enemy takes additional bleed damage for two rounds.';
}