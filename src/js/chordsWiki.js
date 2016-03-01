if (typeof(jQuery) === 'undefined') {
	throw('Unable to find jQuery');
}

if (typeof(chordsWiki) === 'undefined') {
	var chordsWiki = {};
}

(function() {
	'use strict';

	chordsWiki.Main = function() {

		var self = this;

		this.container = $('<div>');

		var init = function() {
			self.container.text('I am a chordWiki');
			$('body').append(self.container);
		};
		init();

	};

}());