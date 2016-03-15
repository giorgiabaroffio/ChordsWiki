describe('chordsWiki.Wiki', function() {

	'use strict';

	var wiki, customWiki;
	var mainElement, eastDivElement, westDivElement, chordSelection, categorySelection;
	var customRootElement, customSourceData, customInstrument, customChordSelection, customCategorySelection, customWestArea;

	var CONST = {
		CSS: {
			EAST_AREA: 'east_area',
			WEST_AREA: 'west_area',
			DETAILS_ROW: 'details_row'
		},
		CHORDS_LABEL: {
			C_CUSTOM: 'C_custom',
			D_CUSTOM: 'D_custom',
			MAJOR_CUSTOM: 'major_custom',
			MINOR_CUSTOM: 'minor_custom'
		}
	};

	beforeEach(function() {

		wiki = new chordsWiki.Wiki({});

		customRootElement = $('<div>');

		/* jshint ignore:start */
		customSourceData = getJSONFixture('customData.json');
		/* jshint ignore:end */

		customInstrument = new chordsWiki.Keyboard();

		customWiki = new chordsWiki.Wiki({
			rootElement: customRootElement,
			dataSource: customSourceData,
			instrument: customInstrument
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

						describe('when <select> fields change values: ', function() {

							var chordSelectionWithCustomInstrument, categorySelectionWithCustomInstrument;
							var keyboard;

							beforeEach(function() {
								var customContainer = $('<div>');
								keyboard = new chordsWiki.Keyboard();
								spyOn(keyboard, 'displayNotes');
								spyOn(keyboard, 'cleanNotes');
								var wikiWithCustomInstrument = new chordsWiki.Wiki({
									rootElement: customContainer,
									dataSource: customSourceData,
									instrument: keyboard
								});

								var mainElementWithCustomInstrument = wikiWithCustomInstrument.container.children('main:first');
								var eastDivElementWithCustomInstrument = mainElementWithCustomInstrument.children('div:nth-child(1)');

								chordSelectionWithCustomInstrument = eastDivElementWithCustomInstrument.children('select')[0];
								categorySelectionWithCustomInstrument = eastDivElementWithCustomInstrument.children('select')[1];
							});

							it('if both <select> fields have a valid selection, Keyboard.displayNotes is invoked', function() {

								$(chordSelectionWithCustomInstrument).val(1).change();
								$(categorySelectionWithCustomInstrument).val(1).change();

								expect(keyboard.displayNotes).toHaveBeenCalled();

							});

							it('if only the first <select> field has a valid selection, Keyboard.cleanNotes is invoked', function() {

								$(categorySelectionWithCustomInstrument).val(0).change();
								$(chordSelectionWithCustomInstrument).val(1).change();


								expect(keyboard.cleanNotes).toHaveBeenCalled();

							});

							it('if only the second <select> field has a valid selection, Keyboard.cleanNotes is invoked', function() {

								$(chordSelectionWithCustomInstrument).val(0).change();
								$(categorySelectionWithCustomInstrument).val(1).change();

								expect(keyboard.cleanNotes).toHaveBeenCalled();

							});

							it('if both the <select> fields have a not valid selection, Keyboard.cleanNotes is invoked', function() {

								$(chordSelectionWithCustomInstrument).val(0).change();
								$(categorySelectionWithCustomInstrument).val(0).change();

								expect(keyboard.cleanNotes).toHaveBeenCalled();

							});
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

	describe('optionally accepts rootElement, dataSource and instrument as input parameters', function() {

		beforeEach(function() {
			customChordSelection = customWiki.container.children('main:first').children('div:nth-child(1)').children('select')[0];
			customCategorySelection = customWiki.container.children('main:first').children('div:nth-child(1)').children('select')[1];
			customWestArea = customWiki.container.children('main:first').children('div:nth-child(2)');
		});

		it('if the parameter rootElement is undefined .container is appended to the body', function() {
			expect($(wiki.container).parent().is('body')).toEqual(true);
		});

		it('if the parameter rootElement is defined .container is appended to it', function() {
			expect($(customWiki.container).parent().is(customRootElement)).toEqual(true);
		});

		it('if the parameter instrument is defined its container is appended to the west area', function() {
			expect($($(customWestArea).find('> div')[0]).is(customInstrument.container)).toEqual(true);
		});

		describe('if the parameter sourceData is defined the selection fields are populated with custom data: ', function() {

			describe('the first <select> element: ', function() {

				it('has a placeholder label with empty value as first option', function() {
					expect($(customChordSelection).children('option:first').val()).toEqual('');
				});
				it('has an element with label ' + CONST.CHORDS_LABEL.C_CUSTOM + ' as second option', function() {
					expect($(customChordSelection).children()[1].label).toEqual(CONST.CHORDS_LABEL.C_CUSTOM);
				});
			});

			describe('the second <select> element: ', function() {

				it('has a placeholder label with empty value as first option', function() {
					expect($(customCategorySelection).children('option:first').val()).toEqual('');
				});
				it('has an element with label ' + CONST.CHORDS_LABEL.MAJOR_CUSTOM + ' as second option', function() {
					expect($(customCategorySelection).children()[1].label).toEqual(CONST.CHORDS_LABEL.MAJOR_CUSTOM);
				});
			});


		});

	});

});