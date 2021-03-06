describe('chordsWiki.Keyboard', function() {

	'use strict';

	var keyboardObject, keyboardContainer, keyboardInstrument;

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

		keyboardObject = new chordsWiki.Keyboard();
		keyboardContainer = keyboardObject.container.find('> div')[0];
		keyboardInstrument = $(keyboardContainer).find('> div')[0];

	});

	it('is the function that I need to instantiate to display a keyboard', function() {
		expect(chordsWiki.Keyboard).toBeDefined();
		expect($.isFunction(chordsWiki.Keyboard)).toBeTruthy();
	});

	describe('.container', function() {

		it('is the <div> wrapping the UI', function() {
			expect(keyboardObject.container).toEqual('div');
		});

		describe('contains: ', function() {
			it('one <div> child element', function() {
				expect(keyboardObject.container.find('> div').length).toEqual(1);
			});
			describe('the child <div> element', function() {

				beforeEach(function() {
					keyboardContainer = keyboardObject.container.find('> div')[0];
				});

				it('has css class ' + CONST.CSS.KEYBOARD_CONTAINER, function() {
					expect(keyboardContainer).toHaveClass(CONST.CSS.KEYBOARD_CONTAINER);
				});

				describe('contains: ', function() {
					it('one <div> child element', function() {
						expect($(keyboardContainer).find('> div').length).toEqual(1);
					});
					describe('the child <div> element', function() {

						beforeEach(function() {
							keyboardInstrument = $(keyboardContainer).find('> div')[0];
						});

						it('has css class ' + CONST.CSS.KEYBOARD, function() {
							expect(keyboardInstrument).toHaveClass(CONST.CSS.KEYBOARD);
						});

						describe('contains: ', function() {
							it('seven <div> children elements, representing the keys', function() {
								expect($(keyboardInstrument).find('> div').length).toEqual(7);
							});
							describe('each child <div> element', function() {
								it('has css class ' + CONST.CSS.WHITE_KEY, function() {
									expect($(keyboardInstrument).find('> div')).toHaveClass(CONST.CSS.WHITE_KEY);
								});
								it('has a "data-key" attribute', function() {
									expect($($(keyboardInstrument).find('> div')[0]).data('key')).toBeDefined();
									expect($($(keyboardInstrument).find('> div')[1]).data('key')).toBeDefined();
									expect($($(keyboardInstrument).find('> div')[3]).data('key')).toBeDefined();
									expect($($(keyboardInstrument).find('> div')[4]).data('key')).toBeDefined();
									expect($($(keyboardInstrument).find('> div')[5]).data('key')).toBeDefined();
								});
							});
							it('the third and seventh <div> children elements do not contain any other <div> element (no black key)', function() {
								expect($($(keyboardInstrument).find('> div')[2]).find('> div').length).toEqual(0);
								expect($($(keyboardInstrument).find('> div')[6]).find('> div').length).toEqual(0);
							});
							describe('the other <div> children elements', function() {
								it('contain one <div> element (black key)', function() {
									expect($($(keyboardInstrument).find('> div')[0]).find('> div').length).toEqual(1);
									expect($($(keyboardInstrument).find('> div')[1]).find('> div').length).toEqual(1);
									expect($($(keyboardInstrument).find('> div')[3]).find('> div').length).toEqual(1);
									expect($($(keyboardInstrument).find('> div')[4]).find('> div').length).toEqual(1);
									expect($($(keyboardInstrument).find('> div')[5]).find('> div').length).toEqual(1);
								});

								describe('each contained <div> element (black key)', function() {
									it('has a "data-key" attribute', function() {
										expect($($($(keyboardInstrument).find('> div')[0]).find('> div')[0]).data('key')).toBeDefined();
										expect($($($(keyboardInstrument).find('> div')[1]).find('> div')[0]).data('key')).toBeDefined();
										expect($($($(keyboardInstrument).find('> div')[3]).find('> div')[0]).data('key')).toBeDefined();
										expect($($($(keyboardInstrument).find('> div')[4]).find('> div')[0]).data('key')).toBeDefined();
										expect($($($(keyboardInstrument).find('> div')[5]).find('> div')[0]).data('key')).toBeDefined();
									});
									it('has css class ' + CONST.CSS.BLACK_KEY, function() {
										expect($($(keyboardInstrument).find('> div')[0]).find('> div')).toHaveClass(CONST.CSS.BLACK_KEY);
										expect($($(keyboardInstrument).find('> div')[1]).find('> div')).toHaveClass(CONST.CSS.BLACK_KEY);
										expect($($(keyboardInstrument).find('> div')[3]).find('> div')).toHaveClass(CONST.CSS.BLACK_KEY);
										expect($($(keyboardInstrument).find('> div')[4]).find('> div')).toHaveClass(CONST.CSS.BLACK_KEY);
										expect($($(keyboardInstrument).find('> div')[5]).find('> div')).toHaveClass(CONST.CSS.BLACK_KEY);
									});
								});
							});
						});

					});
				});

			});
		});

	});

	describe('.displayChordDetails when invoked', function() {
		beforeEach(function() {
			keyboardObject.displayChordDetails(0,0);
		});
		it('appends a <span> element to the container if it does not exist to display chord details', function() {
			expect(keyboardObject.container.find('> span').length).toEqual(1);
		});
		it('colors the keys composing the selected chord, assigning the css class ' + CONST.CSS.PRESSED_KEY, function() {
			expect($(keyboardInstrument).find('> div')[0]).toHaveClass(CONST.CSS.PRESSED_KEY);
			expect($(keyboardInstrument).find('> div')[2]).toHaveClass(CONST.CSS.PRESSED_KEY);
			expect($(keyboardInstrument).find('> div')[4]).toHaveClass(CONST.CSS.PRESSED_KEY);
		});
		it('throws an exception if the selected chord is not found in the chords dataset', function() {
			expect(function(){keyboardObject.displayChordDetails(2,2);}).toThrow(new Error(CONST.ERROR.CHORD_NOT_FOUND));
		});
	});

	describe('.cleanChordDetails when invoked', function() {
		beforeEach(function() {
			keyboardObject.displayChordDetails(0,0);
			keyboardObject.cleanChordDetails();
		});
		it('deletes the content of the <span> element containing chord details, if this element already exists', function() {
			expect(keyboardObject.container.find('> span')[0]).toBeEmpty();
		});
		it('cleans colored keys composing the last selected chord, removing the css class ' + CONST.CSS.PRESSED_KEY, function() {
			expect($(keyboardInstrument).find('div')).not.toHaveClass(CONST.CSS.PRESSED_KEY);
		});
	});
});