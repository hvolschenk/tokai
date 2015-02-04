// the main map
// @param object game The game currently being played
function Map (game) {
  
  // call the base object
  ExplorableArea.call(this, game);
  
  // the width of the map
  this.width = 600;
  // the height of the map
  this.height = 600;
  // holds a list of objects on the page
  this.objects = [];
  // the background image for the map
  this.image = 'images/area/map/map-background.jpg';
  // this image is a background image
  this.imageAsBackground = true;
  // the current map that we are on
  this.map = 1;
  // the player's inventory at the start of the game
  this.inventoryOnStart = [];
  // the player's journal at the start of the game
  this.journalOnStart = [];
  // the console
  this.console = $('<textarea readonly="readonly" class="console"></textarea>');
  // the last logged console message (to prevent duplicates)
  this.lastLogMessage = '';
  // the cave that the player is currently in
  this.cave = null;
  
};

// this class extends base object
Map.inheritsFrom(ExplorableArea);

// adds a type to this class
Map.prototype.type = 'map';

// loads the map
Map.prototype.load = function () {
  // call the parent load method
  this.parent.load.call(this, 'map', this.map);
  // add the inventory into the area
  this.player.inventory.addElement(this.element);
  // add the journal to the area
  this.player.journal.addElement(this.element);
  // save a clone of the player's inventory as the area starts
  this.inventoryOnStart = $.extend(true, {}, this.player.inventory);
  // save a clone of the player's journal as the area starts
  this.journalOnStart = $.extend(true, {}, this.player.journal);
};

// initializes the map
Map.prototype.initialize = function () {
  // call the parent initialize function
  this.parent.parent.initialize.call(this);
  // load the store
  this.store = new Store(this.game);
  // initialize store
  this.store.initialize();
  // load this map
  this.load();
};

// log an entry to the console
// @param {String} logText The text to log
Map.prototype.log = function (logText) {
  // the length of the log message
  var length = logText.length,
  // the index of the current character
  currentCharacter = 0,
  // a reference to this class
  self = this,
  // the timed function
  timedFunction;
  // make sure this is not the previous message
  if (logText !== this.lastLogMessage) {
    // set an interval to add one letter at a time
    timedFunction = setInterval(function () {
      // the letter to add
      var letter = logText[currentCharacter];
      // add the letter to the console
      self.console.append(letter);
      // increment the character counter
      currentCharacter++;
      // scroll to the bottom of the console
      self.console.scrollTop(self.console.scrollHeight);
      // check if the current character is past the length of the text
      if (currentCharacter > length) {
        // add a linebreak to the console
        self.console.append('\n\n');
        // stop the timed function from running
        clearInterval(timedFunction);
      }
    }, 5);
    // change the last log message to the new one
    this.lastLogMessage = logText;
  }
};