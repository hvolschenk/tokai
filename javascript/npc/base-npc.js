// Defines an NPC
// @param Object game The game being played
function BaseNpc (game) {

  // extend this object with the base object
  BaseObject.call(this, game);

  // the speech bubble for this NPC
  this.speechBubble = $('<div class="speech whiteArea roundedCorners"></div>');
  // the current speech dialogue branch
  this.speechPosition = 1;
  // the default events for this NPC
  this.events = {
    '49' : this.respondOne,
    '50' : this.respondTwo,
    '37' : this.walkAwayLeft,
    '38' : this.walkAwayUp,
    '39' : this.walkAwayRight,
    '40' : this.walkAwayDown
  };
  // whether the player has met this NPC before
  this.met = false;
  // the quest this NPC is holding
  this.quest = null;
  // the direction the player is facing when walking into this NPC
  this.clashDirection = null;
  
};

// this class extends the base object class
BaseNpc.inheritsFrom(BaseObject);

// set the type
BaseNpc.prototype.type = 'npc';

// adds the element to this NPC
BaseNpc.prototype.updateElement = function () {
  // call the parent updateElement method
  this.parent.parent.updateElement.call(this);
  // add the inner elemets to the speech bubble
  this.updateSpeechBubble();
};

// the clash handler method
// @param {String} direction The direction the player is facing
BaseNpc.prototype.clashHandler = function (direction) {
  // set the clash direction
  this.clashDirection = direction;
  // start a conversation with this NPC
  this.startConversation();
  // you have now met this NPC
  this.met = true;
  // remove the player events
  this.game.map.player.removeEvents();
  // start the NPC events
  this.setupEvents();
};

// update the speech bubble
BaseNpc.prototype.updateSpeechBubble = function () {
  // an empty paragraph element to add to the speech bubble
  var paragraph = $('<p></p>'),
  // the responses list
  responses = $('<ul class="responses"></ul>');
  // empty out the speech bubble
  this.speechBubble.empty();
  // add the speech and the responses list to the bubble element
  this.speechBubble.append(paragraph, responses);
};

// start a conversation with this NPC
BaseNpc.prototype.startConversation = function () {
  // update the speech bubble
  this.updateSpeechBubble();
  // add the first text to the speech bubble
  this.speechBubble.find('p').text(this.speech[this.speechPosition].text);
  // add the first set of responses
  this.addResponses();
  // add the speech bubble to the map
  this.game.map.element.append(this.speechBubble);
};

// end a conversation with this NPC
BaseNpc.prototype.endConversation = function () {
  // remove the speech bubble from the map
  this.speechBubble.detach();
  // remove the NPC events
  this.removeEvents();
  // setup the player events
  this.game.map.player.setupEvents();
  // setup the player inventory events
  this.game.map.player.inventory.setupEvents();
  // setup player journal events
  this.game.map.player.journal.setupEvents();
  // start the store events again
  this.game.map.store.setupEvents();
};

// adds the correct list of responses to the speech element
BaseNpc.prototype.addResponses = function () {
  // the current list of responses
  var responses = this.speech[this.speechPosition].responses,
  // the responses element
  element = this.speechBubble.find('.responses');
  // go through each of the responses
  $.each(responses, function (key, value) {
    // a list element for the response
    var response = $('<li class="' + key + '"></li>'),
    // the key to press
    keyPress = $('<b>' + key + '</b>');
    // set the response text
    response.append(keyPress, ': ' + value.text);
    // add the response to the responses list
    element.append(response);
  });
};

// respond with the first response to the NPC
BaseNpc.prototype.respondOne = function () {
  // respond to the NPC
  this.respond(1);
};

// respond with the first response to the NPC
BaseNpc.prototype.respondTwo = function () {
  // respond to the NPC
  this.respond(2);
};

// respond to the NPC
// @param {Integer} response The response chosen by the player
BaseNpc.prototype.respond = function (response) {
  // the current speech phase/branch
  var currentSpeech = this.speech[this.speechPosition],
  // the chosen response object
  responseChosen = currentSpeech.responses[response];
  // check whether the response chosen has an outcome
  if (responseChosen.outcome) {
    // call the outcome method
    responseChosen.outcome(this);
  }
  // check whether a new speech phase branch is next
  if (responseChosen.speech) {
    // set the new speech as the current speech
    this.speechPosition = responseChosen.speech;
    // re-start the conversation with the new selected speech
    this.startConversation();
  }
};

// walk away from the conversation
// @param {String} direction The direction the player is trying to walk away inventory
BaseNpc.prototype.walkAway = function (direction) {
  // check that the direction isn't the direction the player is still facing in
  if (direction !== this.clashDirection) {
    // end the conversation
    this.endConversation();
    // move the player in the desired direction
    this.game.map.player.tryMove(direction);
  }
};

// walk away left
BaseNpc.prototype.walkAwayLeft = function () {
  // walk away left
  this.walkAway('left');
};

// walk away up
BaseNpc.prototype.walkAwayUp = function () {
  // walk away up
  this.walkAway('up');
};

// walk away right
BaseNpc.prototype.walkAwayRight = function () {
  // walk away right
  this.walkAway('right');
};

// walk away down
BaseNpc.prototype.walkAwayDown = function () {
  // walk away down
  this.walkAway('down');
};

// give the NPC's quest to the player
BaseNpc.prototype.giveQuest = function () {
  // the journal
  var journal = this.game.map.player.journal;
  // make sure the journal doesn't contain the quest
  if (journal.hasQuest(this.quest) === false) {
    // give the quest
    journal.quests.push(this.quest);
  }
};