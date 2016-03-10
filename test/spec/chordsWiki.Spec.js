describe('chordsWiki.Wiki', function() {

	'use strict';

	var wiki, customWiki;
	var uiContainer, mainElement, eastDivElement, westDivElement, chordSelection, categorySelection;
	var data;

	var CONST = {
		CSS: {
			EAST_AREA: 'east_area',
			WEST_AREA: 'west_area',
			DETAILS_ROW: 'details_row'
		}
	};

	beforeEach(function() {
		uiContainer = $('<div>');

		wiki = new chordsWiki.Wiki({
			rootElement: uiContainer
		});

		/* jshint ignore:start */
		data = {
			"chord_types": [{
				"id": 0,
				"label": "C_custom"
			}, {
				"id": 1,
				"label": "D_custom"
			}],
			"chord_categories": [{
				"id": 0,
				"label": "major_custom"
			}, {
				"id": 1,
				"label": "minor_custom"
			}]
		};
		/* jshint ignore:end */

		customWiki = new chordsWiki.Wiki({
			rootElement: uiContainer,
			dataSource: data
		});

	});

	it('is the function that I need to instantiate to display a new chords wiki', function() {
		expect(chordsWiki.Wiki).toBeDefined();
		expect($.isFunction(chordsWiki.Wiki)).toBeTruthy();
	});

	describe('.container', function() {

		it('is the <div> wrapping the UI', function() {
			expect(wiki.container).toEqual('div');
		});

		describe('contains: ', function() {

			it('a <main> child element', function() {
				expect(wiki.container.find('> main').length).toEqual(1);
			});

			describe('contains: ', function() {

				beforeEach(function() {
					mainElement = wiki.container.children('main:first');
				});

				it('two <div> child elements', function() {
					expect(mainElement.find('> div').length).toEqual(2);
				});

				describe('the first <div> element: ', function() {

					beforeEach(function() {
						eastDivElement = mainElement.children('div:nth-child(1)');
					});

					it('has css class ' + CONST.CSS.EAST_AREA, function() {
						expect(eastDivElement).toHaveClass(CONST.CSS.EAST_AREA);
					});

					describe('contains: ', function() {

						beforeEach(function() {
							chordSelection = eastDivElement.children('select')[0];
							categorySelection = eastDivElement.children('select')[1];
						});

						it('one header <h2> element', function() {
							expect(eastDivElement.find('> h2').length).toEqual(1);
						});

						it('two <select> child elements', function() {
							expect(eastDivElement.find('> select').length).toEqual(2);
						});

						describe('the first <select> element: ', function() {

							it('has a placeholder label with empty value as first option', function() {
								expect($(chordSelection).children('option:first').val()).toEqual('');
							});
							it('has other 2 not empty options', function() {
								expect($(chordSelection).children('option:not(:first)').length).toEqual(2);
							});
						});

						describe('the second <select> element: ', function() {

							it('has a placeholder label with empty value as first option', function() {
								expect($(categorySelection).children('option:first').val()).toEqual('');
							});
							it('has other 2 not empty options', function() {
								expect($(categorySelection).children('option:not(:first)').length).toEqual(2);
							});

						});

						it('when both <select> fields have a valid selection, Keyboard.displayNotes is invoked', function() {

							var customContainer = $('<div>');
							var keyboard = new chordsWiki.Keyboard();
							spyOn(keyboard, 'displayNotes');
							var wikiWithCustomInstrument = new chordsWiki.Wiki({
								rootElement: customContainer,
								dataSource: data,
								instrument: keyboard
							});

							var mainElementWithCustomInstrument = wikiWithCustomInstrument.container.children('main:first');
							var eastDivElementWithCustomInstrument = mainElementWithCustomInstrument.children('div:nth-child(1)');

							var chordSelectionWithCustomInstrument = eastDivElementWithCustomInstrument.children('select')[0];
							var categorySelectionWithCustomInstrument = eastDivElementWithCustomInstrument.children('select')[1];

							$(chordSelectionWithCustomInstrument).val(1).change();
							$(categorySelectionWithCustomInstrument).val(1).change();

							expect(keyboard.displayNotes).toHaveBeenCalled();


						});

					});
				});

				describe('the second <div> element: ', function() {

					beforeEach(function() {
						westDivElement = mainElement.children('div:nth-child(2)');
					});

					it('has css class ' + CONST.CSS.WEST_AREA, function() {
						expect(westDivElement).toHaveClass(CONST.CSS.WEST_AREA);
					});

					describe('contains: ', function() {

						it('one header <h2> element', function() {
							expect(westDivElement.find('> h2').length).toEqual(1);
						});

					});
				});
			});
		});

	});

});