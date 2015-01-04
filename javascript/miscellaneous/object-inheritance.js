// a method to make one class inherit from another
// @ param Function parent The parent class to inherit from
Function.prototype.inheritsFrom = function (parentClass) {
	// inherit the parent class's prototype
  this.prototype = new parentClass;
  // reset this class's constructor
  this.prototype.constructor = this;
  // add a parent element for easier use
  this.prototype.parent = parentClass.prototype;
  // return this new altered class
  return this;
}