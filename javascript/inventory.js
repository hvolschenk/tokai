// defines the Inventory
// @param Object map The map object
function Inventory (map) {
  
  // this class
  var self = this;

  // extend this object with the base object
  BaseObject.call(this, map);
  
  // the width of the inventory element
  this.width = 500;
  // the height of the inventory element
  this.height = 500;
  // the inventory element
  this.element = $('<div class="inventory hidden"></div>');
  // the left offset of the inventory element
  this.left = 50;
  // the top offset of the inventory element
  this.top = 50;
  // a list of items in the inventory
  this.items = [];
  // the equipped armor
  this.armor;
  // the equipped weapon
  this.weapon;
  // the array index of the selected item
  this.selectedItem = 0;

  // initializes the inventory
  this.initialize = function () {
    // the header
    var header = $('<p class="header"></p>'),
    // an element for when there are no items
    noItems = $('<p class="noItems"></p>');
    // empty the element
    self.element.empty();
    // add a header to the inventory
    self.element.append(header);
    // add the header text
    header.text('Inventory');
    // see if there are any items in inventory
    if (self.items.length > 0) {
      // add the items section
      self.addItems();
      // add the selected item element
      self.addSelectedItem();
      // add the equipped items
      self.addEquippedItems();
      // add events to the inventory
      self.addEvents();
    } else {
      // set the text of the no items element
      noItems.text('There are no items in your inventory');
      // add the no items element to the inventory
      self.element.append(noItems);
    }
  };

  // toggles the inventory
  this.toggle = function () {
    // re initialize the inventory
    self.initialize();
    // toggle the element hidden/shown
    self.element.toggleClass('hidden');
    // see if inventory is visible or hidden
    if (self.element.hasClass('hidden') === true) {
      // the inventory is hidden, remove all events
      self.removeEvents();
      // remove the key events
      self.removeKeyEvents();
    } else {
      // add all click events
      self.addEvents();
      // add all key events
      self.addKeyEvents();
    }
  };
  
  // a method to add an item to your inventory
  // @param Object item The item to add
  this.addItem = function (item) {
    // add this item into the array
    self.items.push(item);
    // re-initialize the inventory
    self.initialize();
  };

  // builds the inventory list
  this.addItems = function () {
    // the items area
    var itemsElement = $('<div class="items"></div>');
    // add the items element to the inventory
    self.element.append(itemsElement);
    // go through each of the inventory items
    $.each(self.items, function (index, item) {
      // add this item to the inventory
      itemsElement.append(item.element);
      // add the number to the item
      item.element.attr('rel', index);
      // check if this is the selected element
      if (index === self.selectedItem) {
        // add a selected class to the element
        item.element.addClass('selected');
      }
    });
  };

  // adds the element that shows the selected item
  this.addSelectedItem = function () {
    // the selected item element
    var selectedItem = $('<div class="selectedItem"></div>'),
    // the sell button
    sellButton = $('<a class="button sell"></a>'),
    // the equip button
    equipButton = $('<a class="button equip"></a>');
    // see if there are any items in the inventory
    if (self.items.length > 0) {
      // make sure the selected item falls within the bounds
      self.selectedItem = (self.selectedItem > self.items.length) ? 0 : self.selectedItem;
      // add the details of the selected item to the element
      selectedItem.append(self.items[self.selectedItem].descriptionElement);
      // add the sell button text
      sellButton.text('Sell');
      // add the equip button text
      equipButton.text('Equip');
      // add the sell button to the element
      selectedItem.append(sellButton);
      // add the equip button to the element
      selectedItem.append(equipButton);
    }
    // add the selected item element to the inventory
    self.element.append(selectedItem);
  };

  // adds all equipped items
  this.addEquippedItems = function () {
    // check whether any weapon has been equipped
    if (self.weapon !== undefined) {
      // equip the weapon
      self.addEquippedItem(self.weapon);
    }
    // check whether any armor has been equipped
    if (self.armor !== undefined) {
      // equip the armor
      self.addEquippedItem(self.armor);
    }
    // check whether any potion has been equipped
    if (self.potion !== undefined) {
      // equip the potion
      self.addEquippedItem(self.potion);
    }
  };

  // add an equipped item slot to the inventory
  // @param object item The item to add
  this.addEquippedItem = function (item) {
    // build the equipped item element
    var itemElement = $('<div class="equippedItem"></div>'),
    // a name element to hold the equipped item's name
    nameElement = $('<p>' + item.name + '</p>');
    // add the name element to the equipped item element
    itemElement.append(nameElement);
    // add the item element to the equipped item element
    itemElement.append(item.element);
    // add the equipped item element to the inventory
    self.element.append(itemElement);
  };

  // equips the current selected item
  this.equipSelected = function () {
    // see if the coreect type of item is selected
    if (self.items[self.selectedItem].type === 'weapon' || self.items[self.selectedItem].type === 'armor') {
      // see if there was a previous item in it's place
      if (self[self.items[self.selectedItem].type] !== undefined) {
        // add the item back into the inventory list
        self.items.push(self[self.items[self.selectedItem].type]);
      }
      // add the item to the inventory's correct variable
      self[self.items[self.selectedItem].type] = self.items[self.selectedItem];
      // delete the list entry
      self.items.splice(self.selectedItem, 1);
      // reset the selected item
      self.selectedItem = 0;
      // remove the selected class of the element
      self[self.items[self.selectedItem].type].element.removeClass('selected');
      // re initialize the inventory
      self.initialize();
    }
  };

  // adds the key events for the inventory
  this.addKeyEvents = function () {
    // see if the inventory is visible
    if (!self.element.hasClass('hidden')) {
      // see if the map has any keys defined yet
      if (map.keys !== undefined) {
        // add the key entries to the map's keys
        map.keys[69] = self.equipSelected;
      }
    }
  };

  // removes the key events for the inventory
  this.removeKeyEvents = function () {
    // if the element is hidden the events can be deleted
    if (self.element.hasClass('hidden')) {
      // remove the key entries from the map's keys
      delete(map.keys[69]);
    }
  };

  // adds the necessary events to the inventory
  this.addEvents = function () {
    // add a click handler for items, to show the details
    $(document).on('click', '.inventory .items .object', function (event) {
      // the element that was clicked on
      var element = $(event.target).closest('.object');
      // check whether this is the selected item
      if (!element.hasClass('selected')) {
        // remove the selected class from the currently selected item
        self.items[self.selectedItem].element.removeClass('selected');
        // set the new selected item
        self.selectedItem = parseInt(element.attr('rel'), 10);
        // initialize the inventory
        self.initialize();
      }
    });
  };

  // removes the created events
  this.removeEvents = function () {
    // remove the item click events
    $(document).off('click', '.item');
  };
  
}