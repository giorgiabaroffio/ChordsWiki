(function() {
	'use strict';
	/**
	 * Constructor of the chords wiki widget
	 * @param {jquery} params.rootElement
	 * @param {Object} params.dataSource
	 * @param {Object} params.instrument
	 * @constructor
	 */
	chordsWiki.WikiManager = function(params) {

		var wiki = null;

		var init = function() {
			wiki = new chordsWiki.Wiki({
				rootElement: params.rootElement,
				dataSource: params.dataSource,
				instrument: params.instrument
			});
		};

		init();

	};

}());
