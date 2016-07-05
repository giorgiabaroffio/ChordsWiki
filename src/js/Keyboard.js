(function() {
	'use strict';
	/**
	 * Constructor of the Keyboard instrument
	 * @constructor
	 * @extend chordsWiki.Instrument
	 */
	chordsWiki.Keyboard = function(params) {

		chordsWiki.superClass(this, chordsWiki.Instrument, arguments);

		var CONST = {
			CSS: {
				KEYBOARD: 'chordsWiki_keyboard',
				WHITE_KEY: 'chordsWiki_white_key',
				BLACK_KEY: 'chordsWiki_black_key',
				PRESSED_KEY: 'chordsWiki_pressed_key',
				KEYBOARD_CONTAINER: 'chordsWiki_keyboard_container'
			},
			LABEL: {
				NOTES: 'Notes',
				KEYS: 'Keys'
			},
			SELECTOR: {
				WHITE_KEY: '.chordsWiki_white_key',
				BLACK_KEY: '.chordsWiki_black_key'
			},
			ATTRIBUTE: {
				KEY: 'data-key'
			},
			ERROR: {
				CHORD_NOT_FOUND: 'Chord not found'
			}
		};

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
		 * @returns {string[]}
		 */
		var notesLookup = function(chord, category) {
			var chordInstances = instrumentChordsData.chord_instances;
			for (var c in chordInstances) {
				if (chordInstances[c].chord_id === parseInt(chord) && chordInstances[c].type_id === parseInt(category)) {
					return chordInstances[c].notes;
				}
			}
			return [];
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
		 * Display textual details about the selected chord
		 * @param {string[]} notes - The array containing the list of notes ids
		 */
		var displayTextualDetails = function(notes){
			var notesLabels = getNotesProperty(notes, 'label');
			if (notesTextRow === null) {
				notesTextRow = $('<span>');
				self.container.append(notesTextRow);
			}
			notesTextRow.text(CONST.LABEL.NOTES + ' ' + notesLabels.join() + ' ' + CONST.LABEL.KEYS + ' ' + notesLabels.join());
		};

		/**
		 * Clean chord textual details
		 */
		var cleanTextualDetails = function(){
			if (notesTextRow !== null) {
				notesTextRow.empty();
			}
		};

		/**
		 * Display notes on keyboard
		 * @param {string[]} notes - The array containing the list of notes ids
		 */
		var colorKeys = function(notes){
			var keys = getNotesProperty(notes, 'key');
			for(var k in keys){
				self.container.find( '['+CONST.ATTRIBUTE.KEY+'= "'+keys[k]+'"]').addClass(CONST.CSS.PRESSED_KEY);
			}
		};

		/**
		 * Clean notes on keyboard
		 */
		var cleanKeys = function(){
			self.container.find(CONST.SELECTOR.BLACK_KEY).removeClass(CONST.CSS.PRESSED_KEY);
			self.container.find(CONST.SELECTOR.WHITE_KEY).removeClass(CONST.CSS.PRESSED_KEY);
		};


		/**
		 * Display chord details
		 * @param {string} chord - The id of the chord selected
		 * @param {string} category - The id of the chord category selected
		 */
		this.displayChordDetails = function(chord, category) {
			//clean notes details
			self.cleanChordDetails();

			//retrieve chord details
			var notes = notesLookup(chord, category);
			if(notes.length===0){
				throw CONST.ERROR.CHORD_NOT_FOUND;
			}

			//display chord textual details (notes, keys)
			displayTextualDetails(notes);

			//display notes on keyboard, coloring keys
			colorKeys(notes);
		};

		/**
		 * Clean chord details
		 */
		this.cleanChordDetails = function() {
			cleanTextualDetails();
			cleanKeys();
		};

		init();

	};

}());