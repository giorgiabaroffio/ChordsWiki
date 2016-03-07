/* jshint camelcase: false*/
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
		var notesDetails = null;

		var keyboard = null;

		var init = function() {
			chordSelect = initializeSelect(chordSelect, CONST.LABEL.PLEASE_SELECT_CHORD);
			categorySelect = initializeSelect(categorySelect, CONST.LABEL.PLEASE_SELECT_CATEGORY);
			render();
			config.rootElement.append(self.container);
			loadData();
			attachEvents();
			keyboard = new chordsWiki.keyboard.Main();
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
					displayChordDetails(notesLookup(chordSelect.val(),categorySelect.val()));
				}
				else{
					cleanChordDetails();
				}
			});

			categorySelect.change(function() {
				if (isSelectionValid(categorySelect) && isSelectionValid(chordSelect)) {
					displayChordDetails(notesLookup(chordSelect.val(),categorySelect.val()));
				}
				else{
					cleanChordDetails();
				}
			});
		};

		/**
		 * Check if the selected option is valid (is not the placeholder)
		 */
		var isSelectionValid = function(select) {
			return select.val() !== '';
		};

		/**
		 * Retrieve the set of notes given the chord and the category
		 */
		var notesLookup = function(chord, category) {
			var chordInstances = chordsWiki.chordsData.chord_instances;
			for(var c in chordInstances){
				if(chordInstances[c].chord_id=== parseInt(chord) && chordInstances[c].type_id===parseInt(category)) {
					return getNotesLabelByIds(chordInstances[c].notes);
				}
			}
			return false;
		};

		/**
		 * Get notes labels by ids
		 */
		var getNotesLabelByIds = function(noteIds) {
			var notes = chordsWiki.chordsData.notes;
			var labels = [];
			for(var n in notes){
				if(noteIds.indexOf(notes[n].id)> -1) {
					labels.push(notes[n].label);
				}
			}
			return labels;
		};

		/**
		 * Render west area (chord details) and inject content
		 */
		var displayChordDetails = function(notes) {
			if (notesDetails === null) {
				notesDetails = $('<span>');
				notesDetails.addClass(CONST.CSS.DETAILS_ROW);
				$(CONST.SELECTOR.WEST_AREA).append(notesDetails);
			}
			notesDetails.empty().text(CONST.LABEL.DETAILS_HEADING + notes.join());
		};

		/**
		 * Clean chord details area
		 */
		var cleanChordDetails = function() {
			if (notesDetails !== null) {
				notesDetails.empty();
			}
		};

		init();

	};

}());
/* jshint camelcase: false, quotmark: double */
if (typeof(jQuery) === "undefined") {
	throw("Unable to find jQuery");
}

if (typeof(chordsWiki) === "undefined") {
	/* jshint ignore:start */
	var chordsWiki = {};
	/* jshint ignore:end */
}

if (typeof(chordsWiki.chordsData) === "undefined") {

	chordsWiki.chordsData = {
		"chord_instances": [
			{
				"chord_id": 0,
				"type_id": 0,
				"notes": [1,7,13]
			},
			{
				"chord_id": 0,
				"type_id": 1,
				"notes": [1,6,13]
			},
			{
				"chord_id": 1,
				"type_id": 0,
				"notes": [4,11,16]
			},
			{
				"chord_id": 1,
				"type_id": 1,
				"notes": [4,10,16]
			}

		],
		"chord_types": [
			{
				"id": 0,
				"label": "C"
			},
			{
				"id": 1,
				"label": "D"
			}
		],
		"chord_categories": [
			{
				"id": 0,
				"label": "major"
			},
			{
				"id": 1,
				"label": "minor"
			}
		],
		"notes": [
			{
				"id": 0,
				"label": "Cb"
			},
			{
				"id": 1,
				"label": "C"
			},
			{
				"id": 2,
				"label": "C#"
			},
			{
				"id": 3,
				"label": "Db"
			},
			{
				"id": 4,
				"label": "D"
			},
			{
				"id": 5,
				"label": "D#"
			},
			{
				"id": 6,
				"label": "Eb"
			},
			{
				"id": 7,
				"label": "E"
			},
			{
				"id": 8,
				"label": "E#"
			},
			{
				"id": 9,
				"label": "Fb"
			},
			{
				"id": 10,
				"label": "F"
			},
			{
				"id": 11,
				"label": "F#"
			},
			{
				"id": 12,
				"label": "Gb"
			},
			{
				"id": 13,
				"label": "G"
			},
			{
				"id": 14,
				"label": "G#"
			},
			{
				"id": 15,
				"label": "Ab"
			},
			{
				"id": 16,
				"label": "A"
			},
			{
				"id": 17,
				"label": "A#"
			},
			{
				"id": 18,
				"label": "Bb"
			},
			{
				"id": 19,
				"label": "B"
			},
			{
				"id": 20,
				"label": "B#"
			}
		]
	};

}
if (typeof(jQuery) === 'undefined') {
	throw('Unable to find jQuery');
}

if (typeof(chordsWiki) === 'undefined') {
	/* jshint ignore:start */
	var chordsWiki = {};
	/* jshint ignore:end */
}

if (typeof(chordsWiki.keyboard) === 'undefined') {
	/* jshint ignore:start */
	chordsWiki.keyboard = {};
	/* jshint ignore:end */
}

(function() {
	'use strict';

	chordsWiki.keyboard.Main = function(params) {

		var CONST = {
			CSS: {

			},
			LABEL: {

			}
		};

		var config = {

		};

		$.extend(config, params);

		var self = this;

		this.container = $('<div>');

		var init = function() {
			console.log('keyboard initialized');
		};

		init();

	};

}());