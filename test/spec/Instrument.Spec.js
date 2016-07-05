describe('chordsWiki.Instrument', function() {

	'use strict';

	var instrument, instrumentContainer;

	var CONST = {
		CSS: {
			KEYBOARD: 'chordsWiki_keyboard',
			WHITE_KEY: 'chordsWiki_white_key',
			BLACK_KEY: 'chordsWiki_black_key',
			PRESSED_KEY: 'chordsWiki_pressed_key',
			KEYBOARD_CONTAINER: 'chordsWiki_keyboard_container'
		},
		ERROR: {
			CHORD_NOT_FOUND: 'Chord not found'
		}
	};

	beforeEach(function() {

		instrument = new chordsWiki.Instrument();
		instrumentContainer = instrument.container.find('> div')[0];

	});

	it('is the function that I need to instantiate to display an Instrument object', function() {
		expect(chordsWiki.Instrument).toBeDefined();
		expect($.isFunction(chordsWiki.Instrument)).toBeTruthy();
	});

	describe('.container', function() {

		it('is the <div> wrapping the UI', function() {
			expect(instrument.container).toEqual('div');
		});

	});

	describe('.displayChordDetails when invoked', function() {
		beforeEach(function() {
			instrument.displayChordDetails(0,0);
		});
		it('appends a <span> element to the container if it does not exist to display chord details', function() {
			expect(instrument.container.find('> span').length).toEqual(1);
		});

		it('throws an exception if the selected chord is not found in the chords dataset', function() {
			expect(function(){instrument.displayChordDetails(2,2);}).toThrow(new Error(CONST.ERROR.CHORD_NOT_FOUND));
		});
	});

	describe('.cleanChordDetails when invoked', function() {

		it('deletes the content of the <span> element containing chord details, if this element already exists', function() {
			instrument.displayChordDetails(0,0);
			instrument.cleanChordDetails();
			expect(instrument.container.find('> span')[0]).toBeEmpty();
		});

		it('does nothing when the <span> element containing chord details does not exist yet', function() {
			instrument.cleanChordDetails();
			expect(instrument.container.find('> span').length).toEqual(0);
		});
	});
});