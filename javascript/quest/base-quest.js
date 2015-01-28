/**
 * The base quest, all other quests extend this one
 * @param {Game} game The game currently being played
 */
function BaseQuest (game) {
  
  // call the parent object
  BaseObject.call(this, game);
  
  // the current phase of the quest the player is in
  this.phase = 0;
  // whether this quest has been completed
  this.completed = false;
  
};

// this quest extends base object
BaseQuest.inheritsFrom(BaseObject);

// the type of this object
BaseQuest.prototype.type = 'quest';

// initialize the quest
BaseQuest.prototype.initialize = function () {
  // call the parent initialize method
  this.parent.parent.initialize.call(this);
  // see if this quest has an updatePhase method
  if (this.updatePhase) {
    // run the updatePhase method
    this.updatePhase();
  }
};

// updates the element
BaseQuest.prototype.updateElement = function () {
  // holds the name
  var name = $('<p>' + this.name + '</p>');
  // add the name of the quest into the element
  this.element.empty().append(name);
  // call the parent updateElement method
  this.parent.parent.updateElement.call(this);
};

// complete the quest
BaseQuest.prototype.complete = function () {
  // set the completed flag
  this.completed = true;
};