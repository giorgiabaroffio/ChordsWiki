(function() {
	'use strict';
	/**
	 * Constructor of the chords editor
	 * @param {Object} params.dataSource - data with the list of chords types and categories
	 * @constructor
	 */
	chordsWiki.ChordsEditor = function(params) {

		var CONST = {
			CSS: {
				EAST_AREA: 'chordsWiki_east_area',
				WEST_AREA: 'chordsWiki_west_area'
			},
			LABEL: {
				SUBTITLE_WEST: 'Chord selection',
				SUBTITLE_EAST: 'Notes Selection',
				SUBMIT_BUTTON: 'Save'
			},
			SELECTOR: {
				EAST_AREA: '.chordsWiki_east_area',
				WEST_AREA: '.chordsWiki_west_area'
			}
		};

		var config = {
			rootElement: $('body'),
			dataSource: chordsWiki.chordsData
		};

		$.extend(config, params);

		var self = this;

		this.container = $('<div>');
		var eastContainer = null;
		var westContainer = null;

		var wiki = null;
		var notesPicker = null;
		var submitButton = null;


		var init = function() {
			render();
			initWiki();
			initNotesPicker();
			appendSubElements();
			attachEvents();
			config.rootElement.append(self.container);
		};

		/**
		 * Instantiate and initialize the Wiki object.
		 */
		var initWiki = function() {
			wiki = new chordsWiki.Wiki({
				dataSource: chordsWiki.chordsData
			});
		};

		/**
		 * Instantiate and initialize the Wiki object.
		 */
		var initNotesPicker = function() {
			notesPicker = new chordsWiki.NotesPicker({
				dataSource: chordsWiki.chordsData
			});
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
		 * Append to the east and west container the subelements composing the editor
		 */
		var appendSubElements = function() {
			//append the wiki
			eastContainer.append(notesPicker.container);

			//append the notes picker
			westContainer.append(wiki.container);

			//append submit button
			submitButton = $('<button>');
			submitButton.text(CONST.LABEL.SUBMIT_BUTTON);
			eastContainer.append(submitButton);

		};

		var handleClick = function() {
			console.log(notesPicker.getSelectedNotes());
		};

		/**
		 * Attach events to UI elements
		 */
		var attachEvents = function() {
			submitButton.click(handleClick);
		};

		init();

	};

}());
