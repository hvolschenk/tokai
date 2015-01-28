// The player's journal, containing all quests
// @param object game The game currently being played
function Journal (game) {
  
  // call the parent class
  BaseObject.call(this, game);
  
  // set the width for this element
  this.width = 500;
  // set the height for this element
  this.height = 500;
  // add some events
  this.events = {
    '74' : this.toggle,
    'click .journal .list .object' : this.selectQuest
  };
  // a list of quests inside the journal
  this.quests = [];
  // the quest that is currently selected
  this.selectedQuest = 0;
  
};

// this class extends base object
Journal.inheritsFrom(BaseObject);

// set this class's type
Journal.prototype.type = 'journal';

// initialize the journal
Journal.prototype.initialize = function () {
  // initialize all the quests
  this.initializeQuests();
  // call the parent initialize method
  this.parent.initialize.call(this);
};

// initializes all quests
Journal.prototype.initializeQuests = function () {
  // go through each of the quests
  $.each(this.quests, function () {
    // initialize the quest
    this.initialize();
  });
};

// updates the element
Journal.prototype.updateElement = function () {
  // call the parent updateElement method
  this.parent.updateElement.call(this);
  // add the inner elements to the journal
  this.addInnerElements();
  // add the correct classes to the journal element
  this.element.addClass('hidden roundedCorners grayArea');
  // update the css for this element
  this.element.css({
    'z-index' : 100
  });
};

// adds the inner elements to the journal element
Journal.prototype.addInnerElements = function () {
  // the header text
  var headerText = $('<p class="header">Journal</p>');
  // empty out the element
  this.element.empty();
  // add the header text to the element
  this.element.append(headerText);
  // add the quests list
  this.addQuestsList();
  // add the selected quest
  this.addSelectedQuest();
};

// adds the inner list of quests to the journal
Journal.prototype.addQuestsList = function () {
  // the list element
  var list = $('<div class="list grayArea roundedCorners"></div>'),
  // a reference to this class
  self = this;
  // go through each quest
  $.each(this.quests, function (index, value) {
    // add this quest's element to the list
    value.addElement(list);
    // add a rel to this element
    value.element.attr('rel', index);
    // see if this is the selected quest
    if (self.selectedQuest === index) {
      // add the selected class to the element
      value.element.addClass('selected');
    } else {
      // remove the selected class
      value.element.removeClass('selected');
    }
    // check if the quest has been completed
    if (value.completed === true) {
      // add a completed class to the element
      value.element.addClass('completed');
    }
  });
  // add the list to the journal
  this.element.append(list);
};

// adds the current selected quest to the journal
Journal.prototype.addSelectedQuest = function () {
  // the selected quest element
  var selectedQuest = $('<div class="selectedQuest grayArea roundedCorners"></div>'),
  // the text element
  text = $('<p class="description"></p>'),
  // the name element
  name = $('<span class="name"></span>'),
  // the decription element
  description = $('<span class="description"></span>'),
  // the actual selected quest object
  quest = this.quests[this.selectedQuest];
  // make sure the selected quest exists
  if (quest) {
    // set the text of the name element
    name.text(quest.name);
    // set the text of the description element
    description.text(quest.description);
    // add the description and name elements to the text
    text.append(name, '<br />', description);
    // add the description element to the element
    selectedQuest.append(text);
    // see if the quest is completed
    if (quest.completed === true) {
      // add a completed class to this element
      selectedQuest.addClass('completed');
    }
  }
  // add the selected quest element to this element
  this.element.append(selectedQuest);
  // add the phases to the element
  this.addSelectedQuestPhases();
};

// adds the phases for the selected quest
Journal.prototype.addSelectedQuestPhases = function () {
  // the actual selected quest
  var quest = this.quests[this.selectedQuest],
  // the list
  list = $('<ul class="phases"></ul>'),
  // a lst item to add to the list
  listItem = $('<li></li>'),
  // all the quest phases
  phases = (quest) ? quest.phases : [],
  // the current phase of the quest
  phase = (quest) ? quest.phase : 0;
  // go through each of the current phases
  for (var i = 0; i < phase + 1; i++) {
    // add a list item to the list
    list.append(listItem.clone().text(phases[i]));
  }
  // add the phases list to the element
  this.element.find('.selectedQuest').append(list);
};

// toggles the journal
Journal.prototype.toggle = function () {
  // re initialize the inventory
  this.initialize();
  // toggle the element hidden/shown
  this.element.toggle();
};

// select a single quest by clicking on it
// @param {Event} event The click event to select this quest
Journal.prototype.selectQuest = function (event) {
  console.log(event);
};

// checks whether the journal contains a specific quest
// @param {BaseQuest} quest The quest to look for in the journal
Journal.prototype.hasQuest = function (quest) {
  // see if the given quest is in the list of quests
  return (this.quests.indexOf(quest) > -1) ? true : false;
};