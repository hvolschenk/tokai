// the path class
// @param object game The game being played
function EnvironmentPath (game) {

  // call the parent class
  BaseEnvironment.call(this, game);

  // set the background-image for this object
  this.image = [
    'images/environment/path/environment-path-vertical.png', //0
    'images/environment/path/environment-path-horizontal.png', //1
    'images/environment/path/environment-path-top.png', //2
    'images/environment/path/environment-path-right.png', //3
    'images/environment/path/environment-path-bottom.png', //4
    'images/environment/path/environment-path-left.png', //5
    'images/environment/path/environment-path-top-right.png', //6
    'images/environment/path/environment-path-bottom-right.png', //7
    'images/environment/path/environment-path-bottom-left.png', //8
    'images/environment/path/environment-path-bottom-right.png', //9
    'images/environment/path/environment-path-intersection-top.png', //10
    'images/environment/path/environment-path-intersection-right.png', //11
    'images/environment/path/environment-path-intersection-bottom.png', //12
    'images/environment/path/environment-path-intersection-left.png', //13
  ];
  // you cannot clash into a path
  this.clashable = false;

};

// this class inherits from base environment
EnvironmentPath.inheritsFrom(BaseEnvironment);

// set the type for this class
EnvironmentPath.prototype.type = 'path';