function ClassMage () {
  // this class''s name
  this.name = 'Mage';
  // the images for this class
  this.images = {
    front : '/images/characters/mage-front.png',
    back  : '/images/characters/mage-back.png'
  };
  // the base attack damage for this class
  this.baseAttackDamage = 5;
  // the mana cost for the first magic ability
  this.manaOneCost = 30;
  // the mana cost for the second magic ability
  this.manaTwoCost = 30;
  // the stamina cost for the first stamina ability
  this.staminaOneCost = 90;
  // the stamina cost for the second stamina ability
  this.staminaTwoCost = 90;
  // the base health for this class type
  this.baseHealth = 200;
  // the base mana for this class type
  this.baseMana = 300;
  // the base stamina for this class type
  this.baseStamina = 100;
  // the base amount of armor for this class type
  this.baseArmor = 1;
  // the lore story for this class type
  this.lore = ' is the daughter of the great wizard "Custos" who was the guardian of all magic and secrets, from a young age Maggie learnt the art of becoming his successor was by reading and learning new abilities, but she has a dark secret that she does not whant her father to know about, until that day the big accident happened.';
  // the description of this class type''s auto attack
  this.autoAttackDescription = 'You steal 10% mana back from auto attacks.';
  // the name of this class''s firt mana ability
  this.manaOneName = 'Silence';
  // the description of the first mana ability
  this.manaOneDescription = 'Enemy cannot cast mana abilities for two rounds.';
  // the name of the second mana ability
  this.manaTwoName = 'Heal';
  // the description of the second mana ability
  this.manaTwoDescription = 'Heal yourself for 20% of your max health';
  // the name of the first stamina ability
  this.staminaOneName = 'Juke school';
  // the description of the first stamina ability
  this.staminaOneDescription = 'Dodge the next enemy ability or attack.';
  // the name of the second stamina ability
  this.staminaTwoName = 'Nuke';
  // the description of the second stamina ability
  this.staminaTwoDescription = 'Damage an enemy for 50% of your current health.';
}