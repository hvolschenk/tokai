// defines the Inventory
// @param Object map The map object
function Inventory (map) {
  
  // this class
  var self = this;

  // extend this object with the base object
  BaseObject.call(this, map);
  
  // the width of the inventory element
  this.width = 400;
  // the height of the inventory element
  this.height = 500;
  // the inventory element
  this.element = $('<div class="inventory hidden"></div>');
  // the left offset of the inventory element
  this.left = 100;
  // the top offset of the inventory element
  this.top = 50;
  // a list of items in the inventory
  this.items = [];
  // the array index of the selected item
  this.selectedItem = 0;

  // initializes the inventory
  this.initialize = function () {
    // the header
    var header = $('<p class="header"></p>');
    // empty the element
    self.element.empty();
    // add a header to the inventory
    self.element.append(header);
    // add the header text
    header.text('Inventory');
    // add the items section
    self.addItems();
    // add the selected item element
    self.addSelectedItem();
    // add events to the inventory
    self.addEvents();
  };

  // toggles the inventory
  this.toggle = function () {
    // toggle the element hidden/shown
    self.element.toggle();
    // remove the click event
    self.removeEvents();
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
      item.element.addClass('item' + index);
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
    sellButton = $('<a class="button sell"></a>');
    // see if there are any items in the inventory
    if (self.items.length > 0) {
      // make sure the selected item falls within the bounds
      self.selectedItem = (self.selectedItem > self.items.length) ? 0 : self.selectedItem;
      // add the details of the selected item to the element
      selectedItem.append(self.items[self.selectedItem].descriptionElement);
      // add the sell button text
      sellButton.text('Sell (' + self.items[self.selectedItem].cost / 2 + ')');
    }
    // add the sell button to the element
    selectedItem.append(sellButton);
    // add the selected item element to the inventory
    self.element.append(selectedItem);
  };

  // adds the necessary events to the inventory
  this.addEvents = function () {
    // add a click handler for items, to show the details
    $(document).on('click', '.inventory .item', function (event) {
      // the element that was clicked on
      var element = $(event.target).closest('.item');
      // check whether this is the selected item
      if (!element.hasClass('selected')) {
        // remove the selected class from the currently selected item
        self.items[self.selectedItem].element.removeClass('selected');
        // set the new selected item
        self.selectedItem = parseInt(element.attr('class').replace('item item', ''), 10);
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