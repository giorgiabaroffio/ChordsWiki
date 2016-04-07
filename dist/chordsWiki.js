/* istanbul ignore if */
if (typeof(jQuery) === 'undefined') {
	throw('Unable to find jQuery');
}
/* istanbul ignore else */
if (typeof(chordsWiki) === 'undefined') {
	/* jshint ignore:start */
	var chordsWiki = {};
	/* jshint ignore:end */
}
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
			populateSelect(data.chord_types, chordSelect);
			populateSelect(data.chord_categories, categorySelect);

		};

		/**
		 * Populate select field given the data array and the select object
		 * @param {Object} dataArray - the object containing data to be parsed.
		 * @param {Object} selectObj - the selection field to be populated.
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
				if (isSelectionValid()) {
					config.instrument.displayNotes(chordSelect.val(),categorySelect.val());
				}
				else{
					config.instrument.cleanNotes();
				}
			});

			categorySelect.change(function() {
				if (isSelectionValid()) {
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
		var isSelectionValid = function() {
			return (chordSelect.val() !== '' && categorySelect.val() !== '');
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
(function() {
	'use strict';
	/**
	 * Constructor of the Keyboard instrument
	 * @constructor
	 */
	chordsWiki.Keyboard = function(params) {

		var CONST = {
			CSS: {
				KEYBOARD: 'chordsWiki_keyboard',
				WHITE_KEY: 'chordsWiki_key',
				BLACK_KEY: 'chordsWiki_black_key',
				PRESSED_KEY: 'chordsWiki_pressed_key',
				KEYBOARD_CONTAINER: 'chordsWiki_keyboard_container'
			},
			LABEL: {
				NOTES: 'Notes',
				KEYS: 'Keys'
			},
			SELECTOR: {
				WHITE_KEY: '.chordsWiki_key',
				BLACK_KEY: '.chordsWiki_black_key'
			},
			ATTRIBUTE: {
				KEY: 'data-key'
			}
		};

		var config = {

		};

		$.extend(config, params);

		this.container = $('<div>');

		/* jshint ignore:start */
		var instrumentChordsData = {
			"chord_instances": [{
				"chord_id": 0,
				"type_id": 0,
				"notes": [1, 7, 13]
			}, {
				"chord_id": 0,
				"type_id": 1,
				"notes": [1, 6, 13]
			}, {
				"chord_id": 1,
				"type_id": 0,
				"notes": [4, 11, 16]
			}, {
				"chord_id": 1,
				"type_id": 1,
				"notes": [4, 10, 16]
			}

			],
			"notes": [{
				"id": 0,
				"label": "Cb",
				"key": 11
			}, {
				"id": 1,
				"label": "C",
				"key": 0
			}, {
				"id": 2,
				"label": "C#",
				"key": 1
			}, {
				"id": 3,
				"label": "Db",
				"key": 1
			}, {
				"id": 4,
				"label": "D",
				"key": 2
			}, {
				"id": 5,
				"label": "D#",
				"key": 3
			}, {
				"id": 6,
				"label": "Eb",
				"key": 3
			}, {
				"id": 7,
				"label": "E",
				"key": 4
			}, {
				"id": 8,
				"label": "E#",
				"key": 5
			}, {
				"id": 9,
				"label": "Fb",
				"key": 4
			}, {
				"id": 10,
				"label": "F",
				"key": 5
			}, {
				"id": 11,
				"label": "F#",
				"key": 6
			}, {
				"id": 12,
				"label": "Gb",
				"key": 6
			}, {
				"id": 13,
				"label": "G",
				"key": 7
			}, {
				"id": 14,
				"label": "G#",
				"key": 8
			}, {
				"id": 15,
				"label": "Ab",
				"key": 8
			}, {
				"id": 16,
				"label": "A",
				"key": 9
			}, {
				"id": 17,
				"label": "A#",
				"key": 10
			}, {
				"id": 18,
				"label": "Bb",
				"key": 10
			}, {
				"id": 19,
				"label": "B",
				"key": 11
			}, {
				"id": 20,
				"label": "B#",
				"key": 0
			}]
		};
		/* jshint ignore:end */

		var notesTextRow = null;

		var self = this;

		var init = function() {
			self.container.append(render());
		};

		/**
		 * Create the key object
		 * @param {boolean} addBlackKey - Flag to define the type of keyboard key (with black key following or not).
		 * @param {string} whiteKeyId - The key attribute unequivocally identifying the white key
		 * @param {string} blackKeyId - The key attribute unequivocally identifying the black key
		 * @returns {jQuery} whiteKey - The keyboard key jQuery object generated
		 */
		var createWhiteKey = function(addBlackKey, whiteKeyId, blackKeyId) {
			var whiteKey = $('<div>');
			whiteKey.addClass(CONST.CSS.WHITE_KEY);
			whiteKey.attr(CONST.ATTRIBUTE.KEY, whiteKeyId);
			if (addBlackKey === true) {
				var blackKey = $('<div>');
				blackKey.addClass(CONST.CSS.BLACK_KEY);
				blackKey.attr(CONST.ATTRIBUTE.KEY, blackKeyId);
				whiteKey.append(blackKey);
			}
			return whiteKey;
		};

		/**
		 * Render the UI of the keyboard
		 */
		var render = function() {
			var keyboardContainer = $('<div>');
			keyboardContainer.addClass(CONST.CSS.KEYBOARD_CONTAINER);
			var keyboardInstrument = $('<div>');
			keyboardInstrument.addClass(CONST.CSS.KEYBOARD);

			keyboardInstrument.append(createWhiteKey(true,0,1));
			keyboardInstrument.append(createWhiteKey(true,2,3));
			keyboardInstrument.append(createWhiteKey(false,4));
			keyboardInstrument.append(createWhiteKey(true,5,6));
			keyboardInstrument.append(createWhiteKey(true,7,8));
			keyboardInstrument.append(createWhiteKey(true,9,10));
			keyboardInstrument.append(createWhiteKey(false,11));

			keyboardContainer.append(keyboardInstrument);
			return keyboardContainer;

		};

		/**
		 * Retrieve the set of notes given the chord and the category
		 * @param {string} chord - The id of the chord selected
		 * @param {string} category - The id of the chord category selected
		 * @returns {boolean|string[]}
		 */
		var notesLookup = function(chord, category) {
			var chordInstances = instrumentChordsData.chord_instances;
			for (var c in chordInstances) {
				if (chordInstances[c].chord_id === parseInt(chord) && chordInstances[c].type_id === parseInt(category)) {
					return chordInstances[c].notes;
				}
			}
			return false;
		};

		/**
		 * Get notes property given the array of notes ids and the name of the property
		 * @param {string[]} noteIds - The array containing the list of notes ids
		 * @returns {string[]}
		 */
		var getNotesProperty = function(noteIds, prop) {
			var notes = instrumentChordsData.notes;
			var properties = [];
			for (var n in notes) {
				if (noteIds.indexOf(notes[n].id) > -1) {
					properties.push(notes[n][prop]);
				}
			}
			return properties;
		};

		/**
		 * Get notes labels by ids
		 * @param {string[]} noteIds - The array containing the list of notes ids
		 * @returns {string[]}
		 */
		var getNotesLabelByIds = function(noteIds) {
			var notes = instrumentChordsData.notes;
			var labels = [];
			for (var n in notes) {
				if (noteIds.indexOf(notes[n].id) > -1) {
					labels.push(notes[n].label);
				}
			}
			return labels;
		};

		/**
		 * Get keys ids given the notes array
		 * @param {string[]} noteIds - The array containing the list of notes ids
		 * @returns {string[]}
		 */
		var getNotesKeysByIds = function(noteIds) {
			var notes = instrumentChordsData.notes;
			var keys = [];
			for (var n in notes) {
				if (noteIds.indexOf(notes[n].id) > -1) {
					keys.push(notes[n].key);
				}
			}
			return keys;
		};

		/**
		 * Display notes on keyboard
		 * @param {string[]} keys - The array containing the list of keys ids
		 */
		var colorKeys = function(keys){
			for(var k in keys){
				self.container.find( '['+CONST.ATTRIBUTE.KEY+'= "'+keys[k]+'"]').addClass(CONST.CSS.PRESSED_KEY);
			}
		};

		/**
		 * Clean notes on keyboard
		 */
		var cleanKeys = function(){
			$(CONST.SELECTOR.BLACK_KEY).removeClass(CONST.CSS.PRESSED_KEY);
			$(CONST.SELECTOR.WHITE_KEY).removeClass(CONST.CSS.PRESSED_KEY);
		};


		/**
		 * Display notes details
		 * @param {string} chord - The id of the chord selected
		 * @param {string} category - The id of the chord category selected
		 */
		this.displayNotes = function(chord, category) {
			self.cleanNotes();
			var notes = notesLookup(chord, category);

			var notesLabels = getNotesProperty(notes, 'label');
			var keys = getNotesProperty(notes, 'key');

			//display chord textual details (notes, keys)
			if (notesTextRow === null) {
				notesTextRow = $('<span>');
				self.container.append(notesTextRow);
			}
			notesTextRow.text(CONST.LABEL.NOTES + ' ' + notesLabels.join() + ' ' + CONST.LABEL.KEYS + ' ' + keys.join());

			//display notes on keyboard, coloring keys
			colorKeys(keys);
		};

		/**
		 * Clean notes details
		 */
		this.cleanNotes = function() {
			if (notesTextRow !== null) {
				notesTextRow.empty();
			}
			cleanKeys();
		};

		init();

	};

}());