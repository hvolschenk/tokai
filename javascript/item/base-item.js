// Defines an inventory item
// @param Object game The game being played
function BaseItem (game) {

  // extend this object with the base object
  BaseObject.call(this, game);

  // all items have a level
  this.level = 1;
  // a description element
  this.descriptionElement = $('<p class="description"></p>');
  
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
  // update the description element
  this.updateDescription();
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
};

// updates the description of the item
BaseItem.prototype.updateDescription = function () {
  // a list of attributes to check for
  var attributes = ['Cost', 'Damage', 'Armor', 'Health', 'Mana', 'Stamina'],
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