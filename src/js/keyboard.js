if (typeof(chordsWiki.keyboard) === 'undefined') {
	/* jshint ignore:start */
	chordsWiki.keyboard = {};
	/* jshint ignore:end */
}

(function() {
	'use strict';

	chordsWiki.keyboard.Main = function(params) {

		var CONST = {
			CSS: {

			},
			LABEL: {

			}
		};

		var config = {

		};

		$.extend(config, params);

		var self = this;

		this.container = $('<div>');

		var init = function() {
			console.log('keyboard initialized');
		};

		init();

	};

}());