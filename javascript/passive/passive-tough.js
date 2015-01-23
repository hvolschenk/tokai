/**
 * The "tough" passive for the endurance ability of the warrior
 * @param {Object} game The game currently being played
 * @param {Object} ability The ability this passive belongs to
 */
function PassiveTough (game, ability) {

  // call the parent class
  BasePassive.call(this, game, ability);

  // the name of this passive
  this.name = 'Tough';
  // the description of this passive
  this.description = 'Do 5% max health in damage.';
  // the amount of health gained from this passive
  this.healthDamage = ability.classType.healthTotal * 0.05;
  // the amount of rounds this passive lasts
  this.rounds = 3;

};

// This class is a child of BasePassive
PassiveTough.inheritsFrom(BasePassive);