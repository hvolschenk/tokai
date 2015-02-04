/**
 * Defines a cave which is an explorable area
 * @param {Object} game The game currently being played
 * @param {Integer} initialLeft The left position of the player when entering the cave
 * @param {Integer} initialTop The top position of the player when entering the cave
 */
function Cave (game, initialLeft, initialTop) {

  // call the base object
  ExplorableArea.call(this, game);

  // the default width for a cave
  this.width = 300;
  // the default height for a cave
  this.height = 300;
  // the current cave that we are in
  this.cave = 1;
  // the background image for the cave
  this.image = 'images/area/cave/cave-background.jpg';
  // this image is a background image
  this.imageAsBackground = true;
  // a separator to hide the map from the player
  this.separator = $('<div class="caveSeparator"></div>');
  // the initial left offset of the player
  this.initialLeft = initialLeft;
  // the initial top offset of the player
  this.initialTop = initialTop;

};

// this class extends ExplorableArea
Cave.inheritsFrom(ExplorableArea);

// the type of object this is
Cave.prototype.type = 'map';

/**
 * Loads the cave from a file
 */
Cave.prototype.load = function () {
  // call the parent load function
  this.parent.load.call(this, 'cave', this.cave);
};

/**
 * Initializes the cave
 */
Cave.prototype.initialize = function () {
  // call the parent initialize method
  this.parent.parent.initialize.call(this);
  // load the cave
  this.load();
};