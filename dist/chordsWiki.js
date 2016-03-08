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

		var keyboard = null;

		var init = function() {
			chordSelect = initializeSelect(chordSelect, CONST.LABEL.PLEASE_SELECT_CHORD);
			categorySelect = initializeSelect(categorySelect, CONST.LABEL.PLEASE_SELECT_CATEGORY);
			render();
			config.rootElement.append(self.container);
			loadData();
			attachEvents();
			keyboard = new chordsWiki.Keyboard();
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
					keyboard.displayNotes(chordSelect.val(),categorySelect.val());
				}
				else{
					keyboard.cleanNotes();
				}
			});

			categorySelect.change(function() {
				if (isSelectionValid(categorySelect) && isSelectionValid(chordSelect)) {
					keyboard.displayNotes(chordSelect.val(),categorySelect.val());
				}
				else{
					keyboard.cleanNotes();
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

/* jshint camelcase: false, quotmark: double */

if (typeof(chordsWiki.chordsData) === "undefined") {

	chordsWiki.chordsData = {
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
		]
	};

}
if (typeof(chordsWiki.keyboard) === 'undefined') {
	/* jshint ignore:start */
	chordsWiki.keyboard = {};
	/* jshint ignore:end */
}

(function() {
	'use strict';

	chordsWiki.Keyboard = function(params) {

		var CONST = {
			CSS: {
				CLEARFIX : 'clearfix',
				WHITE_KEY : 'key',
				BLACK_KEY : 'black_key'
			},
			LABEL: {
				NOTES: 'Notes',
				KEYS: 'Keys'
			},
			SELECTOR: {
				WEST_AREA: '.west_area'
			}
		};

		var config = {
			rootElement: $(CONST.SELECTOR.WEST_AREA)
		};

		$.extend(config, params);

		this.container = $('<div>');

		/* jshint ignore:start */
		var instrumentChordsData = {
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
			"notes": [
				{
					"id": 0,
					"label": "Cb",
					"key": 11
				},
				{
					"id": 1,
					"label": "C",
					"key": 0
				},
				{
					"id": 2,
					"label": "C#",
					"key": 1
				},
				{
					"id": 3,
					"label": "Db",
					"key": 1
				},
				{
					"id": 4,
					"label": "D",
					"key": 2
				},
				{
					"id": 5,
					"label": "D#",
					"key": 3
				},
				{
					"id": 6,
					"label": "Eb",
					"key": 3
				},
				{
					"id": 7,
					"label": "E",
					"key": 4
				},
				{
					"id": 8,
					"label": "E#",
					"key": 5
				},
				{
					"id": 9,
					"label": "Fb",
					"key": 4
				},
				{
					"id": 10,
					"label": "F",
					"key": 5
				},
				{
					"id": 11,
					"label": "F#",
					"key": 6
				},
				{
					"id": 12,
					"label": "Gb",
					"key": 6
				},
				{
					"id": 13,
					"label": "G",
					"key": 7
				},
				{
					"id": 14,
					"label": "G#",
					"key": 8
				},
				{
					"id": 15,
					"label": "Ab",
					"key": 8
				},
				{
					"id": 16,
					"label": "A",
					"key": 9
				},
				{
					"id": 17,
					"label": "A#",
					"key": 10
				},
				{
					"id": 18,
					"label": "Bb",
					"key": 10
				},
				{
					"id": 19,
					"label": "B",
					"key": 11
				},
				{
					"id": 20,
					"label": "B#",
					"key": 0
				}
			]
		};
		/* jshint ignore:end */

		var notesTextRow = null;

		var self = this;

		var init = function() {
			self.container.append(render());
			config.rootElement.append(self.container);
		};

		/**
		 * Create the key object
		 */
		var createWhiteKey = function(addBlackKey) {
			var whiteKey = $('<div>');
			whiteKey.addClass(CONST.CSS.WHITE_KEY);
			if(addBlackKey===true){
				var blackKey = $('<div>');
				blackKey.addClass(CONST.CSS.BLACK_KEY);
				whiteKey.append(blackKey);
			}
			return whiteKey;
		}

		/**
		* Render the UI of the keyboard
		*/
		var render = function() {
			var keyboardContainer = $('<div>');
			keyboardContainer.addClass(CONST.CSS.CLEARFIX);

			keyboardContainer.append(createWhiteKey(true));
			keyboardContainer.append(createWhiteKey(true));
			keyboardContainer.append(createWhiteKey(false));
			keyboardContainer.append(createWhiteKey(true));
			keyboardContainer.append(createWhiteKey(true));
			keyboardContainer.append(createWhiteKey(true));
			keyboardContainer.append(createWhiteKey(false));
			return keyboardContainer;

		};

		/**
		 * Retrieve the set of notes given the chord and the category
		 */
		var notesLookup = function(chord, category) {
			var chordInstances = instrumentChordsData.chord_instances;
			for(var c in chordInstances){
				if(chordInstances[c].chord_id=== parseInt(chord) && chordInstances[c].type_id===parseInt(category)) {
					return chordInstances[c].notes;
				}
			}
			return false;
		};

		/**
		 * Get notes labels by ids
		 */
		var getNotesLabelByIds = function(noteIds) {
			var notes = instrumentChordsData.notes;
			var labels = [];
			for(var n in notes){
				if(noteIds.indexOf(notes[n].id)> -1) {
					labels.push(notes[n].label);
				}
			}
			return labels;
		};

		/**
		 * Get keys given the notes array
		 */
		var getNotesKeysByIds = function(noteIds) {
			var notes = instrumentChordsData.notes;
			var keys = [];
			for(var n in notes){
				if(noteIds.indexOf(notes[n].id)> -1) {
					keys.push(notes[n].key);
				}
			}
			return keys;
		};

		/**
		 * Display notes on keyboard
		 */
		this.displayNotes = function(chord, category){
			var notes = notesLookup(chord, category);
			var notesLabels = getNotesLabelByIds(notes);
			var keys = getNotesKeysByIds(notes);
			if (notesTextRow === null) {
				notesTextRow = $('<span>');
				self.container.append(notesTextRow);
			}
			notesTextRow.empty().text(CONST.LABEL.NOTES + ' ' + notesLabels.join() + ' ' + CONST.LABEL.KEYS + ' ' + keys.join());

		};

		/**
		 * Clean notes on keyboard
		 */
		this.cleanNotes = function(){
			if (notesTextRow !== null) {
				notesTextRow.empty();
			}

		};

		init();

	};

}());