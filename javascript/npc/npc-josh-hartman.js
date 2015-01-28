// Defines an NPC, Josh Hartman
// @param Object game The game being played
function NpcJoshHartman (game) {

  // extend this object with the base object
  BaseNpc.call(this, game);

  // this NPC's image
  this.image = 'images/npc/npc-josh-hartman.png';
  // this NPC's quest they can give out
  this.quest = new QuestFamilyBusiness(this.game);
  // This NPC's speech object
  this.speech = {
    // introducing the predicament
    1 : {
      // the line of text the NPC says
      text : "Hi, I don't have much time, please help me, quick!",
      // the possible responses to this text
      responses : {
        // try and help
        1 : {
          // what the player responds with
          text : "What's wrong, how can I help?",
          // the new dialogue branch from this response
          speech : 2
        },
        // try and skip the quest
        2 : {
          // what the player responds with
          text : "Go away I don't have time for beggars.",
          // the new dialogue branch from this response
          speech : 3
        }
      }
    },
    // asks for help from the player
    2 : {
      // the line of text the NPC says
      text : "My family heirloom, a sword, has been stolen by bandits, their leader has it, and is just south of here.",
      // the possible responses
      responses : {
        // start the quest
        1 : {
          // the line of text the player says
          text : "Sure I will go get it, wait here.",
          // the outcome of this choice
          outcome : function (self) {
            // give the quest to the player
            self.giveQuest();
            // end the dialogue
            self.endConversation();
          }
        },
        // skip the quest
        2 : {
          // the line of text the player says
          text : "No thanks, I am scared of bandits.",
          // the outcome of this response
          outcome : function (self) {
            // end the dialogue
            self.endConversation();
          }
        }
      }
    },
    // pleads for help
    3 : {
      // the line of text the NPC says
      text : "Please, my sword has been stolen, I will give you 10 gold to go get it from the bandit leader south of here.",
      // the possible responses
      responses : {
        // accept the quest
        1 : {
          // the line of text the player says
          text : "Okay fine, I'll go get your sword.",
          // the outcome of this response
          outcome : function (self) {
            // give the quest to the player
            self.giveQuest();
            // end the dialogue
            self.endConversation();
          }
        },
        // skip the quest
        2 : {
          // the line of text the player says
          text : "No thanks, I am scared of bandits.",
          // the outcome of this response
          outcome : function (self) {
            // end the dialogue
            self.endConversation();
          }
        }
      }
    },
    // re-confirm the task at hand
    4 : {
      // the line of text the NPC says
      text : "That bandit leader still has my sword.",
      // the possible responses
      responses : {
        // go and do the quest
        1 : {
          // the line of text the player says
          text : "I'll go get your sword.",
          // the outcome of this response
          outcome : function (self) {
            // end the dialogue
            self.endConversation();
          }
        }
      }
    },
    // The item has been found, rejoice!
    5 : {
      // the line of thext the NPC says
      text : "Excellent, you have found the heirloom. Thank you for your troubles!",
      // the possible responses
      responses : {
        // take the money and leave
        1 : {
          // the line of text the player says
          text : "A great pleasure.",
          // the outcome of this response
          outcome : function (self) {
            // give the player 10 gold
            self.game.map.player.inventory.addMoney(10);
            // end the quest
            self.quest.complete();
            // end the conversation
            self.endConversation();
          }
        }
      }
    }
  };
  
};

// this class extends the base Npc class
NpcJoshHartman.inheritsFrom(BaseNpc);

// set the type
NpcJoshHartman.prototype.type = 'joshhartman';

// a clash handler to choose the correct conversation path for this NPC
// @param {String} direction The direction the player is facing
NpcJoshHartman.prototype.clashHandler = function (direction) {
  // see if the player has met Josh
  if (this.met === true) {
    // see if the player has the quest
    if (this.game.map.player.journal.hasQuest(this.quest)) {
      // see if we have the item he wants
      if (this.game.map.player.inventory.findItem('name', 'Axe')) {
        // yay, the axe has been returned
        this.speechPosition = 5;
      } else {
        // re-affirm what needs to be done
        this.speechPosition = 4;
      }
    } else {
      // ask for help, the player has heard the first story and walked away
      this.speechPosition = 3;
    }
  }
  // call the parent clashHandler method
  this.parent.clashHandler.call(this, direction);
};