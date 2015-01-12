// Defines an inventory item
// @param Object game The game being played
function BaseItem (game) {

  // extend this object with the base object
  BaseObject.call(this, game);

  // all items have a level
  this.level = 1;
  // a description element
  this.descriptionElement = $('<p class="description"></p>');
  // an item has a weight
  this.weight = 1;
  // the health that this item adds
  this.health = 0;
  // the mana that the item adds
  this.mana = 0;
  // the stamina that the item adds
  this.stamina = 0;
  // the damage that this item adds
  this.damage = 0;
  
};

// this class extends the base object class
BaseItem.inheritsFrom(BaseObject);

// set the type
BaseItem.prototype.type = 'item';

// overwrite the parent initialize function
BaseItem.prototype.initialize = function () {
  // initialize the item's level
  this.initializeLevel();
  // call the parent's initialize
  this.parent.parent.initialize.call(this);
  // initialize the statistics for this item
  this.initializeStatistics();
  // update the description element
  this.updateDescription();
};

// initializes current and total health/mana/stamina etc
BaseItem.prototype.initializeStatistics = function () {
  // a reference to this fighter
  var self = this,
  // a list of statistics to build
  statisticsToBuild = ['health', 'mana', 'stamina', 'damage', 'cost'];
  // go through each statistic
  $.each(statisticsToBuild, function () {
    // the stat to gain per level
    var statPerLevel = self[this + 'PerLevel'] || 0;
    // scale the statistic accordingly
    self[this] = ((self.level - 1) * statPerLevel) + self[this];
  });
};

// adds a clash handler method
// @param string direction The direction the player is moving in
BaseItem.prototype.clashHandler = function (direction) {
  // add this item to the Player''s inventory
  this.game.map.player.inventory.addItem(this);
  // remove the item from the map''s array
  this.game.map.objects.splice(this.game.map.objects.indexOf(this), 1);
  // move the player up once more
  this.game.map.player.tryMove(direction);
  // update the player's statistics
  this.game.map.player.initialize();
};

// updates the html element's CSS properties
BaseItem.prototype.updateElement = function () {
  // call the parent updateElement method
  this.parent.parent.updateElement.call(this);
  // add the weight element to the item's element
  this.addWeightElement();
  // add the cost element to the item's element
  this.addCostElement();
};

// updates the description of the item
BaseItem.prototype.updateDescription = function () {
  // a list of attributes to check for
  var attributes = ['Cost', 'Damage', 'Armor', 'Health', 'Mana', 'Stamina', 'Weight'],
  // a span for the name
  name = $('<span class="name"></span>'),
  // a span for the description
  description = $('<span class="description"></span>'),
  // a reference to this class
  self = this;
  // set the name text
  name.text(this.name);
  // add the name text
  this.descriptionElement.append(name);
  // see if a description is set for this item
  if (this.description) {
    // set the text for the description element
    description.text(this.description);
    // add the description element to the element
    this.descriptionElement.append('<br />', description);
  }
  // go through each of the possible attributes
  $.each(attributes, function () {
    // an element for the attribute
    var attributeElement;
    // see if this attribute exists for this item
    if (self[this.toLowerCase()]) {
      // create the attribute element
      attributeElement = $('<span class="' + this.toLowerCase() + '"></span>');
      // update the text of the attribute element
      attributeElement.text(this + ': ' + self[this.toLowerCase()]);
      // add the attribute to the description
      self.descriptionElement.append('<br />', attributeElement);
    }
  });
};

// adds a weight indicator element to an item
BaseItem.prototype.addWeightElement = function () {
  // the weight element to add
  var weightElement = $('<p class="weight"></p>');
  // set the weight on the element
  weightElement.text(this.weight);
  // add the weight element to the item's element
  this.element.append(weightElement);
};

// adds a cost indicator element to an item
BaseItem.prototype.addCostElement = function () {
  // the cost element to add
  var costElement = $('<p class="cost"></p>');
  // set the cost on the element
  costElement.text(this.cost);
  // add the cost element to the item's element
  this.element.append(costElement);
};