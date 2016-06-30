(function() {
	'use strict';
	/**
	 * Constructor of the chords wiki
	 * @param {Object} params.dataSource - data with the list of chords types and categories
	 * @constructor
	 * @extend luga.Notifier
	 * @fires selectionChanged
	 * @fires selectionReset
	 */
	chordsWiki.Wiki = function(params) {

		luga.extend(luga.Notifier, this);

		var CONST = {
			LABEL: {
				PLEASE_SELECT_CHORD: 'Please select a chord',
				PLEASE_SELECT_CATEGORY: 'Please select a category'
			},
			EVENT: {
				SELECTION_CHANGED : 'selectionChanged',
				SELECTION_RESET : 'selectionReset'
			},
			TEMPLATE_SELECTOR: {
				CHORD_TYPES: '#chordsTypes',
				CHORD_CATEGORIES: '#chordsCategories'
			}
		};

		var config = {
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
			loadData();
			attachEvents();
		};

		/**
		 * Initialize select field
		 * @param {Object} select - The selection field object.
		 * @param {string} placeholder - The placeholder for the selection field.
		 * @returns {jQuery} select - The initialized selection field jQuery object
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
			populateSelect(data, chordSelect, $(CONST.TEMPLATE_SELECTOR.CHORD_TYPES).html());
			populateSelect(data, categorySelect, $(CONST.TEMPLATE_SELECTOR.CHORD_CATEGORIES).html());
		};

		/**
		 * Populate select field given the data array and the select object
		 * @param {Object} data - the object containing data to be parsed.
		 * @param {jQuery} selectObj - the selection field to be populated.
		 * @param {Object} templateScript - the Handlebars template script.
		 */
		var populateSelect = function(data, selectObj, templateScript) {
			var template = Handlebars.compile (templateScript);
			selectObj.append(template(data));
		};

		var handleOnSelectionChange = function() {
			if (isSelectionValid()) {
				try {
					self.notifyObservers(CONST.EVENT.SELECTION_CHANGED, { chord: chordSelect.val(), category: categorySelect.val()});
				}catch(err){
					console.log(err);
				}
			}
			else{
				self.notifyObservers(CONST.EVENT.SELECTION_RESET, {});
			}
		}

		/**
		 * Attach events to UI elements
		 */
		var attachEvents = function() {
			chordSelect.change(handleOnSelectionChange);
			categorySelect.change(handleOnSelectionChange);
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