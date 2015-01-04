// an inventory for a class
// @param object game The game currently being played
function Inventory (game) {

  // call the parent class
  BaseObject.call(this, game);

  // set the width for this element
  this.width = 500;
  // set the height for this element
  this.height = 500;
  // a list of items in the inventory
  this.items = [];
  // the equipped armor
  this.armor;
  // the equipped weapon
  this.weapon;
  // the array index of the selected item
  this.selectedItem = 0;
  // add some events
  this.events = {
    '73' : this.toggle,
    'click .items .item' : this.selectItem,
    'click .equip' : this.equipSelected
  };

};

// this class extends the base object
Inventory.inheritsFrom(BaseObject);

// set the type for this class
Inventory.prototype.type = 'inventory';

// overwrite the default updateElement method
Inventory.prototype.updateElement = function () {
  // call the parent addElement method
  this.parent.updateElement.call(this);
  // add the correct classes to the inventory element
  this.element.addClass('hidden roundedCorners grayArea');
  // update the css for this element
  this.element.css({
    'z-index' : 100
  });
  // add the inner elements to this element
  this.addInnerElements();
};

// adds the inner elements to the inventory
Inventory.prototype.addInnerElements = function () {
  // the header
  var header = $('<p class="header"></p>'),
  // an element for when there are no items
  noItems = $('<p class="noItems"></p>');
  // empty the element
  this.element.empty();
  // add a header to the inventory
  this.element.append(header);
  // add the header text
  header.text('Inventory');
  // see if there are any items in inventory
  if (this.items.length > 0) {
    // add the items section
    this.addItems();
    // add the selected item element
    this.addSelectedItem();
    // add the equipped items
    this.addEquippedItems();
  } else {
    // set the text of the no items element
    noItems.text('There are no items in your inventory');
    // add the no items element to the inventory
    this.element.append(noItems);
  }
};

// toggles the inventory
Inventory.prototype.toggle = function () {
  // re initialize the inventory
  this.initialize();
  // toggle the element hidden/shown
  this.element.toggle();
};

// a method to add an item to your inventory
// @param Object item The item to add
Inventory.prototype.addItem = function (item) {
  // add this item into the array
  this.items.push(item);
  // re-initialize the inventory
  this.initialize();
};

// builds the inventory list
Inventory.prototype.addItems = function () {
  // the items area
  var itemsElement = $('<div class="items"></div>');
  // add the items element to the inventory
  this.element.append(itemsElement),
  // a reference to this class
  self = this;
  // go through each of the inventory items
  $.each(this.items, function (index, item) {
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
Inventory.prototype.addSelectedItem = function () {
  // the selected item element
  var selectedItem = $('<div class="selectedItem"></div>'),
  // the sell button
  sellButton = $('<a class="button sell"></a>'),
  // the equip button
  equipButton = $('<a class="button equip"></a>');
  // see if there are any items in the inventory
  if (this.items.length > 0) {
    // make sure the selected item falls within the bounds
    this.selectedItem = (this.selectedItem > this.items.length) ? 0 : this.selectedItem;
    // add the details of the selected item to the element
    selectedItem.append(this.items[this.selectedItem].descriptionElement);
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
  this.element.append(selectedItem);
};

// adds all equipped items
Inventory.prototype.addEquippedItems = function () {
  // check whether any weapon has been equipped
  if (this.weapon !== undefined) {
    // equip the weapon
    this.addEquippedItem(this.weapon);
  }
  // check whether any armor has been equipped
  if (this.armor !== undefined) {
    // equip the armor
    this.addEquippedItem(this.armor);
  }
  // check whether any potion has been equipped
  if (this.potion !== undefined) {
    // equip the potion
    this.addEquippedItem(this.potion);
  }
};

// add an equipped item slot to the inventory
// @param object item The item to add
Inventory.prototype.addEquippedItem = function (item) {
  // build the equipped item element
  var itemElement = $('<div class="equippedItem"></div>'),
  // a name element to hold the equipped item's name
  nameElement = $('<p>' + item.name + '</p>');
  // add the name element to the equipped item element
  itemElement.append(nameElement);
  // add the item element to the equipped item element
  itemElement.append(item.element);
  // add the equipped item element to the inventory
  this.element.append(itemElement);
};

// equips the current selected item
Inventory.prototype.equipSelected = function () {
  // see if the coreect type of item is selected
  if (this.items[this.selectedItem].type === 'weapon' || this.items[this.selectedItem].type === 'armor') {
    // see if there was a previous item in it's place
    if (this[this.items[this.selectedItem].type] !== undefined) {
      // add the item back into the inventory list
      this.items.push(this[this.items[this.selectedItem].type]);
    }
    // add the item to the inventory's correct variable
    this[this.items[this.selectedItem].type] = this.items[this.selectedItem];
    // remove the selected class of the element
    this[this.items[this.selectedItem].type].element.removeClass('selected');
    // delete the list entry
    this.items.splice(this.selectedItem, 1);
    // reset the selected item
    this.selectedItem = 0;
    // re initialize the inventory
    this.initialize();
  }
};

// selects an item by clicking on it
Inventory.prototype.selectItem = function (event) {
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
};