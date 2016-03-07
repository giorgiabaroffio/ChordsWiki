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

			},
			SELECTOR: {
				WEST_AREA: '.west_area'
			}
		};

		var config = {
			rootElement: $(CONST.SELECTOR.WEST_AREA)
		};

		$.extend(config, params);

		var self = this;

		this.container = $('<div>');

		var keyboardKeys = null;

		var init = function() {
			self.container.addClass('keyboard');
			render();
			config.rootElement.append(self.container);
		};

		/**
		* Render the UI of the keyboard
		*/
		var render = function() {
			keyboardKeys = $('<span>');
			self.container.append(keyboardKeys);
		};

		/**
		 * Get keys given the notes array
		 */
		var getNotesKeysByIds = function(noteIds) {
			var notes = chordsWiki.chordsData.notes;
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
		this.displayNotes = function(notes){
			var keys = getNotesKeysByIds(notes);
			keyboardKeys.text(keys.join());
		}

		init();

	};

}());