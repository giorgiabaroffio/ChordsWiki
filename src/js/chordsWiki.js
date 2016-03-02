if (typeof(jQuery) === 'undefined') {
	throw('Unable to find jQuery');
}

if (typeof(chordsWiki) === 'undefined') {
	/* jshint ignore:start */
	var chordsWiki = {};
	/* jshint ignore:end */
}

(function() {
	'use strict';

	chordsWiki.Main = function(params) {

		var CONST = {
			CSS: {
				EAST_AREA: 'east_area',
				WEST_AREA: 'west_area'
			},
			LABEL: {
				SUBTITLE_EAST: 'Chord selection',
				SUBTITLE_WEST: 'Chord details',
				PLEASE_SELECT_CHORD: 'Please select a chord',
				PLEASE_SELECT_CATEGORY: 'Please select a category'
			},
			DATA_URL: 'src/data/chordsData.json'
		};

		var config = {
			chordsWikiContainer: 'body',
			staticData: true
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
			$(config.chordsWikiContainer).append(self.container);
			params.staticData ? loadStaticData() : loadData();
			attachEvents();
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
		 * Load data via ajax get call
		 */
		var loadData = function() {
			$.ajax({
				url: CONST.DATA_URL,
				type: 'get',
				cache: true,
				success: function(data, textStatus, jqXHR){
					populateSelect(data.chord_types, chordSelect);
					populateSelect(data.chord_categories, categorySelect);
				},
				error: function(){
					//TODO add error handling
				}
			});

		};

		/**
		 * Load data via chordsData object
		 */
		var loadStaticData = function() {

			var data = chordsWiki.chordsData;
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

		var attachEvents = function() {

			chordSelect.change(function(){
				if(isSelectionValid(chordSelect)){
					console.log('valid');
				}
			});

			categorySelect.change(function(){
				if(isSelectionValid(categorySelect)){
					console.log('valid');
				}
			});
		};

		var isSelectionValid = function(select) {
			return select.val()!=='';
		};

		init();

	};

}());