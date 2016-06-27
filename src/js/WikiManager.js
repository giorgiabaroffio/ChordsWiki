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

		var CONST = {
			CSS: {
				EAST_AREA: 'chordsWiki_east_area',
				WEST_AREA: 'chordsWiki_west_area',
			},
			LABEL: {
				SUBTITLE_EAST: 'Chord selection',
				SUBTITLE_WEST: 'Chord details',
			},
			SELECTOR: {
				EAST_AREA: '.chordsWiki_east_area',
				WEST_AREA: '.chordsWiki_west_area',
			}
		};

		var config = {
			rootElement: $('body'),
			dataSource: chordsWiki.chordsData,
			instrument: null
		};

		$.extend(config, params);

		this.container = $('<div>');

		var eastContainer = null;
		var westContainer = null;

		var wiki = null;
		var instrument = null;

		var self = this;

		var init = function() {
			render();
			initWiki();
			instrument = config.instrument;
			appendExternalContent();
			config.rootElement.append(self.container);
		};

		var initWiki = function() {
			wiki = new chordsWiki.Wiki({
				dataSource: chordsWiki.chordsData
			});
			wiki.addObserver(self);
		};

		/**
		 * Render the UI
		 */
		var render = function() {

			//Main content wrapper creation
			var mainContent = $('<main>');

			//Append east and west areas to mainContent
			mainContent.append(renderEast());
			mainContent.append(renderWest());

			//Append mainContent to container
			self.container.append(mainContent);

		};

		/**
		 * Render the east area of the UI
		 */
		var renderEast = function() {

			eastContainer = $('<div>');
			eastContainer.addClass(CONST.CSS.EAST_AREA);
			var subtitleEast = $('<h2>');
			subtitleEast.text(CONST.LABEL.SUBTITLE_EAST);
			eastContainer.append(subtitleEast);
			return eastContainer;

		};

		/**
		 * Render the west area of the UI
		 */
		var renderWest = function() {

			westContainer = $('<div>');
			westContainer.addClass(CONST.CSS.WEST_AREA);
			var subtitleWest = $('<h2>');
			subtitleWest.text(CONST.LABEL.SUBTITLE_WEST);
			westContainer.append(subtitleWest);
			return westContainer;

		};

		var appendExternalContent = function() {
			eastContainer.append(wiki.container);
			if(instrument !== null){
				westContainer.append(instrument.container);
			}

		};

		init();

		this.onSelectionChangedHandler = function(data){
			if(instrument !== null){
				instrument.displayChordDetails(data.chord, data.category);
			}
		};

		this.onSelectionResetHandler = function(data){
			if(instrument !== null){
				instrument.cleanChordDetails();
			}
		};

	};

}());
