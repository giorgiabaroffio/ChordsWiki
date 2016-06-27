(function() {
	'use strict';
	/**
	 * Constructor of the chords wiki widget
	 * @param {Object} params.dataSource
	 * @constructor
	 */
	chordsWiki.Wiki = function(params) {

		luga.extend(luga.Notifier, this);

		var CONST = {
			CSS: {
				DETAILS_ROW: 'chordsWiki_details_row'
			},
			LABEL: {
				PLEASE_SELECT_CHORD: 'Please select a chord',
				PLEASE_SELECT_CATEGORY: 'Please select a category',
				DETAILS_HEADING: 'Notes: '
			},
			SELECTOR: {
				DETAILS_ROW: '.chordsWiki_details_row'
			},
			DATA_URL: 'src/data/chordsData.json'
		};

		var config = {
			dataSource: chordsWiki.chordsData,
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
			loadData();
			attachEvents();
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

			//Append the selection fields to the container
			self.container.append(chordSelect);
			self.container.append(categorySelect);

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
						//config.instrument.displayChordDetails(chordSelect.val(),categorySelect.val());
						self.notifyObservers('selectionChanged', { chord: chordSelect.val(), category: categorySelect.val()});
					}catch(err){
						console.log(err);
					}
				}
				else{
					//config.instrument.cleanChordDetails();
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