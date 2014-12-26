// Defines an inventory item
// @param Object map The map object
function BaseItem (map) {
  
  // holds this object for itself
  var self = this;
  
  // extend this object with the base object
  BaseObject.call(this, map);
  // give this object a type
  this.type = 'item';
  // a description element
  this.descriptionElement = $('<p class="description"></p>');
  // the cost of any item
  this.cost = 2;
  // the level of this item
  this.level = (function () {
    // the map we are on
    var mapNumber = map ? map.map : 1;
    // the level is the same as the map
    return mapNumber;
  })();
  
  // initializes the element object and loads the local variables
  // @param object object The object to load
  this.initialize = function (object) {
    // set the left offset value
    self.left = object.position.left * self.width;
    // set the top offset value
    self.top = object.position.top * self.height;
    // set the right offset value
    self.right = self.left + self.width;
    // set the bottom offset value
    self.bottom = self.top + self.height;
    // set the name of the Item
    self.name = object.name;
    // update the description
    self.updateDescription();
  };
  
  // adds a clash handler method
  // @param string direction The direction the player is moving in
  this.clashHandler = function (direction) {
    // update the status text
    map.statusTextElement.text('You have picked up the ' + self.name + ' (' + self.damage + ' damage).');
    // add this item to the Player''s inventory
    map.player.inventory.addItem(self);
    // remove the item from the map
    //self.element.remove();
    // remove the item from the map''s array
    map.objects.splice(map.objects.indexOf(self), 1);
    // move the player up once more
    map.player.movePlayer(direction);
  };

  // updates the description of the item
  this.updateDescription = function () {
    // a list of attributes to check for
    var attributes = ['Cost', 'Damage', 'Armor', 'Health', 'Mana', 'Stamina'],
    // a span for the name
    name = $('<span class="name"></span>'),
    // a span for the description
    description = $('<span class="description"></span>');
    // set the name text
    name.text(self.name);
    // add the name text
    self.descriptionElement.append(name);
    // see if a description is set for this item
    if (self.description) {
      // set the text for the description element
      description.text(self.description);
      // add the description element to the element
      self.descriptionElement.append('<br />', description);
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
  
}