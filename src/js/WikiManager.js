/**
 * Data broadcast by the Wiki, after both selection fields change and valid values are selected
 *
 * @typedef {Object} chordsWiki.WikiManager.Chord
 * @property {number} chord - The id of the selected chord
 * @property {number} category - The id of the selected category
 */

(function() {
	'use strict';
	/**
	 * Constructor of the chords wiki widget
	 * @param {jQuery} params.rootElement - the jQuery container for the chords wiki widget
	 * @param {Object} params.dataSource - data with the list of chords types and categories
	 * @param {Object} params.instrument - the instrument widget that needs to communicate with the Wiki object
	 * @constructor
	 * @listens selectionChanged
	 * @listens selectionReset
	 */
	chordsWiki.WikiManager = function(params) {

		var CONST = {
			CSS: {
				EAST_AREA: 'chordsWiki_east_area',
				WEST_AREA: 'chordsWiki_west_area'
			},
			LABEL: {
				SUBTITLE_EAST: 'Chord details',
				SUBTITLE_WEST: 'Chord selection'
			},
			SELECTOR: {
				EAST_AREA: '.chordsWiki_east_area',
				WEST_AREA: '.chordsWiki_west_area'
			}
		};

		var config = {
			rootElement: $('body'),
			dataSource: chordsWiki.chordsData,
			instrument: new chordsWiki.Instrument()
		};

		$.extend(config, params);

		this.container = $('<div>');

		var eastContainer = null;
		var westContainer = null;

		/**
		 * @type {chordsWiki.Wiki}
		 */
		var wiki = null;
		var instrument = null;

		var self = this;

		var init = function() {
			render();
			initWiki();
			instrument = config.instrument;
			appendSubElements();
			config.rootElement.append(self.container);
		};

		/**
		 * Instantiate and initialize the Wiki object. Listen to its events.
		 */
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

			var mainContent = $('<main>');

			mainContent.append(renderEast());
			mainContent.append(renderWest());

			self.container.append(mainContent);

		};

		/**
		 * Render the east area of the UI
		 * @returns {jQuery} eastContainer - the jQuery wrapper of the html element containing the east area of the widget
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
		 * @returns {jQuery} westContainer - the jQuery wrapper of the html element containing the west area of the widget
		 */
		var renderWest = function() {

			westContainer = $('<div>');
			westContainer.addClass(CONST.CSS.WEST_AREA);
			var subtitleWest = $('<h2>');
			subtitleWest.text(CONST.LABEL.SUBTITLE_WEST);
			westContainer.append(subtitleWest);
			return westContainer;

		};

		/**
		 * Append to the east and west container respectively the wiki element and the instrument element
		 */
		var appendSubElements = function() {

			//append the instrument
			westContainer.append(wiki.container);

			//append the wiki
			eastContainer.append(instrument.container);

		};

		init();

		/* NOTIFICATION HANDLERS */

		/**
		 * Listen to the "selectionChanged" event notifications broadcast by the Wiki
		 * @param {chordsWiki.WikiManager.Chord} data
		 */
		this.onSelectionChangedHandler = function(data){
			instrument.displayChordDetails(data.chord, data.category);
		};

		/**
		 * Listen to the "selectionReset" event notifications broadcast by the Wiki
		 */
		this.onSelectionResetHandler = function(data){
			instrument.cleanChordDetails();
		};

	};

}());
