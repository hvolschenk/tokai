// defines a path
// @param object map The map object
function Path (map) {
  
  // holds this object for itself
  var self = this;
  
  // extend this object with the base object
  BaseObject.call(this, map);
  // give this object a type
  this.type = 'path';
  // set the background-image for this object
  this.image = [
    '/images/environment/path/path-vertical.png', //0
    '/images/environment/path/path-horizontal.png', //1
    '/images/environment/path/path-top.png', //2
    '/images/environment/path/path-right.png', //3
    '/images/environment/path/path-bottom.png', //4
    '/images/environment/path/path-left.png', //5
    '/images/environment/path/path-top-right.png', //6
    '/images/environment/path/path-bottom-right.png', //7
    '/images/environment/path/path-bottom-left.png', //8
    '/images/environment/path/path-bottom-right.png', //9
    '/images/environment/path/intersection-top.png', //10
    '/images/environment/path/intersection-right.png', //11
    '/images/environment/path/intersection-bottom.png', //12
    '/images/environment/path/intersection-left.png', //13
  ];
  // you cannot clash into paths
  this.clashable = false;
  
}