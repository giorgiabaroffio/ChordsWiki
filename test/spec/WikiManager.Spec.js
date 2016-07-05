describe('chordsWiki.WikiManager', function() {

	'use strict';

	var wikiManager, customWikiManager;
	var mainElement, eastDivElement, westDivElement;
	var customRootElement, customSourceData, customInstrument, customChordSelection, customCategorySelection, customEastArea;

	var CONST = {
		CSS: {
			EAST_AREA: 'chordsWiki_east_area',
			WEST_AREA: 'chordsWiki_west_area',
			DETAILS_ROW: 'chordsWiki_details_row'
		},
		CHORDS_LABEL: {
			C_CUSTOM: 'C_custom',
			D_CUSTOM: 'D_custom',
			MAJOR_CUSTOM: 'major_custom',
			MINOR_CUSTOM: 'minor_custom'
		},
		EVENT: {
			SELECTION_CHANGED : 'selectionChanged',
			SELECTION_RESET : 'selectionReset'
		}
	};

	beforeEach(function() {

		wikiManager = new chordsWiki.WikiManager({});

		customRootElement = $('<div>');

		/* jshint ignore:start */
		customSourceData = getJSONFixture('customData.json');
		/* jshint ignore:end */

		customInstrument = new chordsWiki.Keyboard();

		customWikiManager = new chordsWiki.WikiManager({
			rootElement: customRootElement,
			dataSource: customSourceData,
			instrument: customInstrument
		});

	});

	it('is the function that I need to instantiate to display a new chords wiki widget', function() {
		expect(chordsWiki.WikiManager).toBeDefined();
		expect($.isFunction(chordsWiki.WikiManager)).toBeTruthy();
	});

	describe('.container', function() {

		it('is the <div> wrapping the UI', function() {
			expect(wikiManager.container).toEqual('div');
		});

		describe('contains: ', function() {

			it('a <main> child element', function() {
				expect(wikiManager.container.find('> main').length).toEqual(1);
			});

			describe('contains: ', function() {

				beforeEach(function() {
					mainElement = wikiManager.container.children('main:first');
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

						it('one header <h2> element', function() {
							expect(eastDivElement.find('> h2').length).toEqual(1);
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
			customChordSelection = customWikiManager.container.children('main:first').children('div:nth-child(1)').children('select')[0];
			customCategorySelection = customWikiManager.container.children('main:first').children('div:nth-child(1)').children('select')[1];
			customEastArea = customWikiManager.container.children('main:first').children('div:nth-child(1)');
		});

		it('if the parameter rootElement is undefined .container is appended to the body', function() {
			expect($(wikiManager.container).parent().is('body')).toEqual(true);
		});

		it('if the parameter rootElement is defined .container is appended to it', function() {
			expect($(customWikiManager.container).parent().is(customRootElement)).toEqual(true);
		});

		it('if the parameter instrument is defined its container is appended to the east area', function() {
			expect($($(customEastArea).find('> div')[0]).is(customInstrument.container)).toEqual(true);
		});

	});

	describe('initialize a Wiki object', function() {
		it('instantiating it and appending the Wiki UI to the west area', function() {
			expect($(westDivElement).find('> div').length).toEqual(1);
		});
	});

	describe('initialize an Instrument object', function() {

		var customInstrument, customWikiManager, customEastDivElement;

		beforeEach(function(){
			customInstrument = new chordsWiki.Keyboard();
			customWikiManager = new chordsWiki.WikiManager({
				instrument: customInstrument
			});
			var customMainElement = customWikiManager.container.children('main:first');
			customEastDivElement = customMainElement.children('div:nth-child(1)');
		});

		it('either getting it from the input params, if not null, and appending the custom Instrument UI to the east area', function() {
			expect($(customEastDivElement).find('> div').length).toEqual(1);
		});

		it('or instantiating a new object and appending the Instrument UI to the east area', function() {
			expect($(eastDivElement).find('> div').length).toEqual(1);
		});

	});

	describe('listens to the Wiki events: ', function() {

		var chordSelection;
		var categorySelection;

		beforeEach(function(){
			chordSelection = wikiManager.container.find('select')[0];
			categorySelection = wikiManager.container.find('select')[1];
			spyOn(wikiManager, 'onSelectionChangedHandler');
			spyOn(wikiManager, 'onSelectionResetHandler');
		});

		it(CONST.EVENT.SELECTION_CHANGED, function() {
			var chordTypeId = '0';
			var chordCategoryId = '0';
			$(chordSelection).val(chordTypeId);
			$(categorySelection).val(chordCategoryId);
			$(chordSelection).trigger('change');
			expect(wikiManager.onSelectionChangedHandler).toHaveBeenCalled();
		});

		it(CONST.EVENT.SELECTION_RESET, function() {
			var chordTypeId = '0';
			var chordCategoryId = '';
			$(chordSelection).val(chordTypeId);
			$(categorySelection).val(chordCategoryId);
			$(chordSelection).trigger('change');
			expect(wikiManager.onSelectionResetHandler).toHaveBeenCalled();
		});
	});

});