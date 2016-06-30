/* istanbul ignore if */
if (typeof(jQuery) === 'undefined') {
	throw('Unable to find jQuery');
}
/* istanbul ignore else */
if (typeof(chordsWiki) === 'undefined') {
	/* jshint ignore:start */
	var chordsWiki = {};
	/* jshint ignore:end */
}

(function() {
	'use strict';

	/**
	 * Make a class inherit from another. The child will inherit all the methods of the parent.
	 * @param {*} context The object that will be used as "this"
	 * @param {function} parent The parent's constructor
	 * @param {...*} args The optional arguments for the parent constructor
	 */
	chordsWiki.superClass = function(context, parent, args) {
		parent.apply(context, args || []);
	};


})();