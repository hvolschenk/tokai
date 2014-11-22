function ClassRogue () {
  // this class''s name
  this.name = 'Rogue';
  // the images for this class
  this.images = {
    front : '/images/characters/rogue-front.png',
    back  : '/images/characters/rogue-back.png'
  };
  // the base attack damage for this class
  this.baseAttackDamage = 10;
  // the mana cost for the first magic ability
  this.manaOneCost = 90;
  // the mana cost for the second magic ability
  this.manaTwoCost = 90;
  // the stamina cost for the first stamina ability
  this.staminaOneCost = 30;
  // the stamina cost for the second stamina ability
  this.staminaTwoCost = 30;
  // the base health for this class type
  this.baseHealth = 100;
  // the base mana for this class type
  this.baseMana = 200;
  // the base stamina for this class type
  this.baseStamina = 300;
  // the base amount of armor for this class type
  this.baseArmor = 1;
  // the lore story for this class type
  this.lore = ' grew up in the streets of the capital, from a young age he had to learn to feed and fend for him self, he leart to be a master in the shadows, never knowing love or compassion until he met a compassionate girl which he fell in love with, until that one day the big accident happened.';
  // the description of this class type''s auto attack
  this.autoAttackDescription = 'You steal 10% stamina back from auto attacks.';
  // the name of this class''s firt mana ability
  this.manaOneName = 'Stealthy assassin';
  // the description of the first mana ability
  this.manaOneDescription = 'Go invisible for one round. Do 200% damage with your next auto-attack.';
  // the name of the second mana ability
  this.manaTwoName = 'Blur';
  // the description of the second mana ability
  this.manaTwoDescription = 'Creates an illusion of yourself. Enemy has 50% chance to miss.';
  // the name of the first stamina ability
  this.staminaOneName = 'Critical strike';
  // the description of the first stamina ability
  this.staminaOneDescription = 'Your attack critically strikes and does 150% base damage.';
  // the name of the second stamina ability
  this.staminaTwoName = 'Mine now';
  // the description of the second stamina ability
  this.staminaTwoDescription = 'Steal 20 health from the Enemy.';
}