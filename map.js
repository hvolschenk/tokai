// a class file for the map
function Map () {
  
  // this current class
  var self;

  // holds the list of trees on the map
  this.trees = [];
  // holds the list of enemies on the map
  this.enemies = [];
  // holds the player's character
  this.player;
  // holds the map html element
  this.mapElement = $('<div class="map"></div>');

  // initializes the map and items on the map
  this.initialize = function () {
    // load the first map
    self.loadMap();
    // add the map element to the page
    self.addElement();
  }

  // adds the map element to the page
  this.addElement = function () {
    // the body element
    var body = $('body');
    // add the map to the body
    body.append(self.mapElement);
  }

  // loads a map from file
  // @param integer map The map number
  this.loadMap = function (map) {
    console.log('loadMap');
    // set the first map as the default
    map = map || 1;
    // read the correct JSON file
    $.ajax({
      type     : 'get',
      dataType : 'json',
      url      : 'maps/map' + map + '.json',
      success  : function (data) {
        console.log('hendrik', data);
        // load the trees onto the map
        self.loadTrees(data.trees);
        // load the enemies onto the map
        self.loadEnemies(data.enemies);
      },
      error    : function (jqXHR, textStatus, errorThrown) {
        console.log('error', jqXHR, textStatus, errorThrown);
      }
    });
  }

  // loads all trees onto the map
  // @param JSON trees The JSON list of trees from file
  this.loadTrees = function (trees) {
    // go through each tree
    $.each(trees, function (index, tree) {
      // create a new Tree object
      var treeObject = new Tree();
      // initialize this new Tree object
      treeObject.initialize(tree);
      // add the Tree to the document
      treeObject.addElement(self.mapElement);
      // add this tree object to the array of trees
      self.trees.push(treeObject);
    });
  }

  // loads all enemies onto the map
  // @param JSON enemies The JSON list of enemies from file
  this.loadEnemies = function (enemies) {
    // go through each enemy
    $.each(enemies, function (index, enemy) {
      // create a new Enemy object
      var enemyObject = new Enemy();
      // initialize this new Enemy object
      enemyObject.initialize(enemy);
      // add the Enemy to the document
      enemyObject.addElement(self.mapElement);
      // add this enemy object to the array of trees
      self.enemies.push(enemyObject);
    });
  }

  // set the self variable equal to this class
  self = this;

}