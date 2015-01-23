/**
 * The "hunger" passive for the life leach ability of the rogue
 * @param {Object} game The game currently being played
 * @param {Object} ability The ability this passive belongs to
 */
function PassiveHunger (game, ability) {

  // call the parent class
  BasePassive.call(this, game, ability);

  // the name of this passive
  this.name = 'Hunger';
  // the description of this passive
  this.description = 'Gain 20% base damage as health.';
  // the amount of health gained from this passive
  this.healthGain = ability.classType.damageCurrent * 0.2;
  // the amount of rounds this passive lasts
  this.rounds = 2;

};

// This class is a child of BasePassive
PassiveHunger.inheritsFrom(BasePassive);