function Store (game) {
  // call the parent class
  BaseObject.call(this, game);

  // set the width for this element
  this.width = 300;
  // set the height for this element
  this.height = 600;
  // a list of items in the store
  this.items = [];
};

// this class extends the base object
Store.inheritsFrom(BaseObject);

// set the type for this class
Store.prototype.type = 'store';

// overwrite the default updateElement method
Store.prototype.updateElement = function () {
  // call the parent addElement method
  this.parent.updateElement.call(this);
  // add the correct classes to the store element
  this.element.addClass('roundedCorners grayArea');
  // update the css for this element
  this.element.css({
    'z-index' : 100
  });
  // add the inner elements to this element
  this.addInnerElements();
};

// adds the inner elements to the store
Store.prototype.addInnerElements = function () {
  // the header
  var header = $('<p class="header"></p>');
  // empty the element
  this.element.empty();
  // add a header to the store
  this.element.append(header);
  // add the header text
  header.text('Store');
  // add the selected item element
  this.addSelectedItem();
  // add the items section
  this.addButtons();
  // add the listContainer section
  this.addItemList();
  // load the items into the store
  this.load();
};

// adds the element that shows the selected item stats
Store.prototype.addSelectedItem = function () {
  // the selected item element
  var selectedItem = $('<div class="selectedItem"></div>'),
  // the buy button
  buyButton = $('<a class="button buy grayArea roundedCorners"></a>');
  // add the buy button text
  buyButton.text('Buy');
  // add the buy button to the element
  selectedItem.append(buyButton);
  // add the selected item element to the inventory
  this.element.append(selectedItem);
};

// adds the button element
Store.prototype.addButtons = function () {
  // the selected item element
  var itemsElement = $('<div class="items"></div>'),
  // the weapons button
  weaponsButton = $('<a class="button weapons grayArea roundedCorners active"></a>'),
  // the armor button
  armorButton = $('<a class="button armor grayArea roundedCorners"></a>'),
  // the potions button
  potionsButton = $('<a class="button potions grayArea roundedCorners"></a>');
  // add the weapons button text
  weaponsButton.text('Weapons');
  // add the weapons button text
  armorButton.text('Armor');
  // add the weapons button text
  potionsButton.text('Potions');
  // add the weapons button to the element
  itemsElement.append(weaponsButton);
  // add the armor button to the element
  itemsElement.append(armorButton);
  // add the potions button to the element
  itemsElement.append(potionsButton);
  // add the selected item element to the store
  this.element.append(itemsElement);
};

// add the list that will contain the items
Store.prototype.addItemList = function () {
  // the list item element
  var listContainer = $('<div class="listContainer"></div>');
  // add the listContainer element to the store
  this.element.append(listContainer);
};

// loads the store items from a file
Store.prototype.load = function () {
  // a reference to this object
  var self = this;
  // read the correct JSON file
  $.ajax({
    type     : 'get',
    dataType : 'json',
    url      : 'json/store/store.json',
    success  : function (data) {
      // load all objects into the store
      self.loadObjects(data);
    },
    error    : function (jqXHR, textStatus, errorThrown) {
      console.log('error', jqXHR, textStatus, errorThrown);
    }
  });
};

// loads all store data
// @param json data The data to load
Store.prototype.loadObjects = function (data) {
  // a reference to this object
  var self = this;
  // empty out the objects before loading them
  this.objects = [];
  // go through each type found in the data
  $.each(data, function (key, value) {
    // whether or not to load a new class
    var newClass = true;
    // load the data for this object type
    self.loadObjectType(key, value, newClass);
  });
};

// loads a single object type
// @param string type The type of object to load
// @param object data The data to load
Store.prototype.loadObjectType = function (type, data) {
  // the name of the class to load
  var className,
  // a reference to this object
  self = this;
  // go through each data as it will be an array
  console.log('type', type);
  console.log('data', data);
  $.each(data, function (key, value) {
    // holds a new instance of a type
    var object = null;
    // set the class name
    className = 'Item' + value.type;
    console.log('1', className);
    // create a new instance of this type
    object = new window[className](self.game);
    // add this object to the map
    self.objects.push(object);
    // load this object from data
    object.load(value);
    // initialize the object
    object.initialize();
    // add the object to the map
    object.addElement(self.element.find('.listContainer'));
  });
};








