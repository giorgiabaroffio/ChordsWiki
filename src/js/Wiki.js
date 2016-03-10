(function() {
	'use strict';

	chordsWiki.Wiki = function(params) {

		var CONST = {
			CSS: {
				EAST_AREA: 'east_area',
				WEST_AREA: 'west_area',
				DETAILS_ROW: 'details_row'
			},
			LABEL: {
				SUBTITLE_EAST: 'Chord selection',
				SUBTITLE_WEST: 'Chord details',
				PLEASE_SELECT_CHORD: 'Please select a chord',
				PLEASE_SELECT_CATEGORY: 'Please select a category',
				DETAILS_HEADING: 'Notes: '
			},
			SELECTOR: {
				EAST_AREA: '.east_area',
				WEST_AREA: '.west_area',
				DETAILS_ROW: '.details_row'
			},
			DATA_URL: 'src/data/chordsData.json'
		};

		var config = {
			rootElement: $('body'),
			dataSource: chordsWiki.chordsData
		};

		$.extend(config, params);

		var self = this;

		this.container = $('<div>');

		var chordSelect = null;
		var categorySelect = null;

		var init = function() {
			chordSelect = initializeSelect(chordSelect, CONST.LABEL.PLEASE_SELECT_CHORD);
			categorySelect = initializeSelect(categorySelect, CONST.LABEL.PLEASE_SELECT_CATEGORY);
			render();
			config.rootElement.append(self.container);
			loadData();
			attachEvents();
			initInstrument();

		};

		var initInstrument = function() {
			if (typeof(config.instrument) === 'undefined'){
				config.instrument = new chordsWiki.Keyboard();
			}
			$(CONST.SELECTOR.WEST_AREA).append(config.instrument.container);
		};

		/**
		 * Initialize select field
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

			var eastContainer = $('<div>');
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

			var westContainer = $('<div>');
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
			populateSelect(data.chord_types, chordSelect);
			populateSelect(data.chord_categories, categorySelect);

		};

		/**
		 * Populate select field given the data array and the select object
		 */
		var populateSelect = function(dataArray, selectObj) {
			for (var i = 0; i < dataArray.length; i++) {
				var record = dataArray[i];
				var option = $('<option>');
				option.text(record.label);
				option.val(record.id);
				selectObj.append(option);
			}
		};

		/**
		 * Attach events to UI elements
		 */
		var attachEvents = function() {

			chordSelect.change(function() {
				if (isSelectionValid(chordSelect) && isSelectionValid(categorySelect)) {
					config.instrument.displayNotes(chordSelect.val(),categorySelect.val());
				}
				else{
					config.instrument.cleanNotes();
				}
			});

			categorySelect.change(function() {
				if (isSelectionValid(categorySelect) && isSelectionValid(chordSelect)) {
					config.instrument.displayNotes(chordSelect.val(),categorySelect.val());
				}
				else{
					config.instrument.cleanNotes();
				}
			});
		};

		/**
		 * Check if the selected option is valid (is not the placeholder)
		 */
		var isSelectionValid = function(select) {
			return select.val() !== '';
		};

		init();

	};

}());