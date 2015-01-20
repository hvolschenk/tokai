function Store (game) {
  // call the parent class
  BaseObject.call(this, game);

  // set the width for this element
  this.width = 300;
  // set the height for this element
  this.height = 600;
  // a list of items in the store
  this.items = [];
  // add some events
  this.events = {
    'click .items .weapons' : this.showWeapons,
    'click .items .armor'   : this.showArmor,
    'click .items .potions'  : this.ShowPotion,
    'click .listContainer .item' : this.selectItem,
    //'click .sell' : this.sellSelected
  };
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
  this.addDetailContainer();
  // add the items section
  this.addButtons();
  // add the listContainer section
  this.addItemList();
  // load the items into the store
  this.load();
};

// adds the element that shows the selected item stats
Store.prototype.addDetailContainer = function () {
  // the selected item element
  var addDetailContainer = $('<div class="addDetailContainer"></div>'),
  // the buy button
  buyButton = $('<a class="button buy grayArea roundedCorners"></a>');
  // add the buy button text
  buyButton.text('Buy');
  // add the buy button to the element
  addDetailContainer.append(buyButton);
  // add the selected item element to the inventory
  this.element.append(addDetailContainer);
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
  $.each(data, function (key, value) {
    // holds a new instance of a type
    var object = null;
    // set the class name
    className = 'Item' + value.type;
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
    // hide the armor on load
    self.element.find('.listContainer .armor').hide();
    // hide the potion on load
    self.element.find('.listContainer .potion').hide();
  });
};

// show the weapons that's for sale
Store.prototype.showWeapons = function () {
  // get all the items
  var element = $(event.target).closest('.object'),
  // all the items in the list container
  allItems = element.find('.listContainer'),
  // weapon items
  weaponsItems = allItems.find('.weapon'),
  // armor items
  armorItems = allItems.find('.armor'),
  // potion items
  potionItems = allItems.find('.potion');

  // remove all active button class and to selected item
  element.find('.items .button').removeClass('active');
  // add the active class on selected button
  element.find('.items .weapons').addClass('active');

  // hide the potion items
  potionItems.hide();
  // hide the armor items
  armorItems.hide();
  // show the weapon items
  weaponsItems.show();
};

// show the armor that's for sale
Store.prototype.showArmor = function () {
  // get all the items
  var element = $(event.target).closest('.object'),
  // all the items in the list container
  allItems = element.find('.listContainer'),
  // weapon items
  weaponsItems = allItems.find('.weapon'),
  // armor items
  armorItems = allItems.find('.armor'),
  // potion items
  potionItems = allItems.find('.potion');

  // remove all active button class and to selected item
  element.find('.items .button').removeClass('active');
  // add the active class on selected button
  element.find('.items .armor').addClass('active');

  // hide the weapon items
  weaponsItems.hide();
  // hide the potion items
  potionItems.hide();
  // show the armor items
  armorItems.show();
};

// show the potion that's for sale
Store.prototype.ShowPotion = function () {
  // get all the items
  var element = $(event.target).closest('.object'),
  // all the items in the list container
  allItems = element.find('.listContainer'),
  // weapon items
  weaponsItems = allItems.find('.weapon'),
  // armor items
  armorItems = allItems.find('.armor'),
  // potion items
  potionItems = allItems.find('.potion');

  // remove all active button class and to selected item
  element.find('.items .button').removeClass('active');
  // add the active class on selected button
  element.find('.items .potions').addClass('active');

  // hide the weapon items
  weaponsItems.hide();
  // hide the armor items
  armorItems.hide();
  // show the potion items
  potionItems.show();
};

// select the item in the list container
Store.prototype.selectItem = function () {
  // the element that was clicked on
  var element = $(event.target).closest('.object');
  // each selected item
  $.each($('.selected'), function () {
    // remove the selected class on all selected items
    $(this).removeClass('selected');
  });
  // add the selected class om the current click element
  element.addClass('selected');
  
};

