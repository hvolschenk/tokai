// defines the Inventory
// @param Object map The map object
function Inventory (map) {
  
  // this class
  var self = this;
  
  // the width of the inventory area
  this.inventoryWidth = 600;
  // set the height of the inventory area
  this.inventoryHeight = 60;
  // a list of items in the inventory
  this.items = [];
  // The inventory html element
  this.inventoryElement = $('<div class="inventory"></div>');
  
  // a method to add an item to your inventory
  // @param Object item The item to add
  this.addItem = function (item) {
    // add this item into the array
    self.items.push(item);
  };
  
  // adds the element to the page
  this.addElement = function () {
    // set the new values for the element
    self.updateElement();
    // add the element to the map
    map.statusTextElement.after(self.inventoryElement);
  };
  
  // updates the element''s styling
  this.updateElement = function () {
    self.inventoryElement.css({
      width : self.inventoryWidth + 'px',
      height : self.inventoryHeight + 'px'
    });
  }
  
  // builds the inventory list
  this.buildInventory = function () {
    // go through each of the inventory items
    $.each(self.items, function () {
      // add this item to the inventory
      this.addElement(self.inventoryElement);
    });
  };
  
}