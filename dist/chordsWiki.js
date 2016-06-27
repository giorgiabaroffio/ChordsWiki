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
	 * @param {jquery} params.rootElement
	 * @param {Object} params.dataSource
	 * @param {Object} params.instrument
	 * @constructor
	 */
	chordsWiki.WikiManager = function(params) {

		var CONST = {
			CSS: {
				EAST_AREA: 'chordsWiki_east_area',
				WEST_AREA: 'chordsWiki_west_area',
			},
			LABEL: {
				SUBTITLE_EAST: 'Chord selection',
				SUBTITLE_WEST: 'Chord details',
			},
			SELECTOR: {
				EAST_AREA: '.chordsWiki_east_area',
				WEST_AREA: '.chordsWiki_west_area',
			}
		};

		var config = {
			rootElement: $('body'),
			dataSource: chordsWiki.chordsData,
			instrument: null
		};

		$.extend(config, params);

		this.container = $('<div>');

		var eastContainer = null;
		var westContainer = null;

		var wiki = null;
		var instrument = null;

		var self = this;

		var init = function() {
			render();
			initWiki();
			instrument = config.instrument;
			appendExternalContent();
			config.rootElement.append(self.container);
		};

		var initWiki = function() {
			wiki = new chordsWiki.Wiki({
				dataSource: chordsWiki.chordsData
			});
			wiki.addObserver(self);
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

		var appendExternalContent = function() {
			eastContainer.append(wiki.container);
			if(instrument !== null){
				westContainer.append(instrument.container);
			}

		};

		init();

		this.onSelectionChangedHandler = function(data){
			if(instrument !== null){
				instrument.displayChordDetails(data.chord, data.category);
			}
		};

		this.onSelectionResetHandler = function(data){
			if(instrument !== null){
				instrument.cleanChordDetails();
			}
		};

	};

}());

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
					self.notifyObservers('selectionReset', {});
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