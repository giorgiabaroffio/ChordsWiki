(function() {
	'use strict';
	/**
	 * Constructor of the chords wiki widget
	 * @param {jquery} options.rootElement
	 * @param {Object} options.dataSource
	 * @param {Object} options.instrument
	 * @constructor
	 */
	chordsWiki.Wiki = function(params) {

		var CONST = {
			CSS: {
				EAST_AREA: 'chordsWiki_east_area',
				WEST_AREA: 'chordsWiki_west_area',
				DETAILS_ROW: 'chordsWiki_details_row'
			},
			LABEL: {
				SUBTITLE_EAST: 'Chord selection',
				SUBTITLE_WEST: 'Chord details',
				PLEASE_SELECT_CHORD: 'Please select a chord',
				PLEASE_SELECT_CATEGORY: 'Please select a category',
				DETAILS_HEADING: 'Notes: '
			},
			SELECTOR: {
				EAST_AREA: '.chordsWiki_east_area',
				WEST_AREA: '.chordsWiki_west_area',
				DETAILS_ROW: '.chordsWiki_details_row'
			},
			DATA_URL: 'src/data/chordsData.json'
		};

		var config = {
			rootElement: $('body'),
			dataSource: chordsWiki.chordsData,
			instrument: undefined
		};

		$.extend(config, params);

		var self = this;

		this.container = $('<div>');

		var chordSelect = null;
		var categorySelect = null;
		var eastContainer = null;
		var westContainer = null;

		var init = function() {
			chordSelect = initializeSelect(chordSelect, CONST.LABEL.PLEASE_SELECT_CHORD);
			categorySelect = initializeSelect(categorySelect, CONST.LABEL.PLEASE_SELECT_CATEGORY);
			render();
			config.rootElement.append(self.container);
			loadData();
			attachEvents();
			initInstrument();

		};

		/**
		 * Initialize the instrument (either a custom one or the default one)
		 */
		var initInstrument = function() {
			if (typeof(config.instrument) === 'undefined'){
				config.instrument = new chordsWiki.Keyboard();
			}
			westContainer.append(config.instrument.container);
		};

		/**
		 * Initialize select field
		 * @param {Object} select - The selection field object.
		 * @param {string} placeholder - The placeholder for the selection field.
		 * @returns {Object}
		 */
		var initializeSelect = function(select, placeholder) {

			select = $('<select>');
			var option = $('<option>');
			option.text(placeholder);
			option.val('');
			select.append(option);
			return select;

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
			eastContainer.append(chordSelect);
			eastContainer.append(categorySelect);
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

		/**
		 * Load data via chordsData object (default option) or via an external json object
		 */
		var loadData = function() {
			var data = config.dataSource;
			populateSelect(data, chordSelect, $('#chordsTypes').html());
			populateSelect(data, categorySelect, $('#chordsCategories').html());
		};

		/**
		 * Populate select field given the data array and the select object
		 * @param {Object} data - the object containing data to be parsed.
		 * @param {Object} selectObj - the selection field to be populated.
		 * @param {Object} templateScript - the Handlebars template script.
		 */
		var populateSelect = function(data, selectObj, templateScript) {
			var template = Handlebars.compile (templateScript);
			selectObj.append(template(data));
		};

		/**
		 * Attach events to UI elements
		 */
		var attachEvents = function() {

			chordSelect.change(function() {
				if (isSelectionValid()) {
					try {
						config.instrument.displayChordDetails(chordSelect.val(),categorySelect.val());
					}catch(err){
						console.log(err);
					}
				}
				else{
					config.instrument.cleanChordDetails();
				}
			});

			categorySelect.change(function() {
				if (isSelectionValid()) {
					try {
						config.instrument.displayChordDetails(chordSelect.val(),categorySelect.val());
					}catch(err){
						console.log(err);
					}
				}
				else{
					config.instrument.cleanChordDetails();
				}
			});
		};

		/**
		 * Check if the selected option is valid (is not the placeholder)
		 */
		var isSelectionValid = function() {
			return (chordSelect.val() !== '' && categorySelect.val() !== '');
		};

		init();

	};

}());