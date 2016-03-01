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
			STRING: {
				SUBTITLE_EAST: 'Chord selection',
				SUBTITLE_WEST: 'Chord details'
			},
			DATA_URL: 'src/data/chordsData.json'
		};

		var config = {
			chordsWikiContainer: 'body'
		};

		$.extend(config, params);

		var self = this;

		this.container = $('<div>');

		var chordSelect = $('<select>');

		var categorySelect = $('<select>');

		var init = function() {
			render();
			$(config.chordsWikiContainer).append(self.container);
			loadData();
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
			subtitleEast.text(CONST.STRING.SUBTITLE_EAST);
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
			subtitleWest.text(CONST.STRING.SUBTITLE_WEST);
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
					console.log('error!');
				}
			});

		};

		/**
		 * Populate select field given the data array and the select object
		 */
		var populateSelect = function(dataArray, selectObj) {
			console.log(dataArray);
			for (var i = 0; i < dataArray.length; i++) {
				var record = dataArray[i];
				var option = $('<option>');
				option.text(record.label);
				option.val(record.id);
				selectObj.append(option);
			}
		};

		init();

	};

}());