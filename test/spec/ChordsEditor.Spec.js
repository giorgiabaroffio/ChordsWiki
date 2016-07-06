describe('chordsWiki.WikiManager', function() {

	'use strict';

	var chordsEditor;
	var mainElement, eastDivElement, westDivElement;
	var customChordsEditor, customRootElement, customSourceData;

	var CONST = {
		CSS: {
			EAST_AREA: 'chordsWiki_east_area',
			WEST_AREA: 'chordsWiki_west_area',
		}
	};

	beforeEach(function() {
		loadFixtures('selectsTemplate.htm');
		chordsEditor = new chordsWiki.ChordsEditor({});

		customRootElement = $('<div>');

		/* jshint ignore:start */
		customSourceData = getJSONFixture('customData.json');
		/* jshint ignore:end */

		customChordsEditor = new chordsWiki.ChordsEditor({
			rootElement: customRootElement,
			dataSource: customSourceData
		});

	});

	it('is the function that I need to instantiate to display a chords editor', function() {
		expect(chordsWiki.ChordsEditor).toBeDefined();
		expect($.isFunction(chordsWiki.ChordsEditor)).toBeTruthy();
	});

	describe('.container', function() {

		it('is the <div> wrapping the UI', function() {
			expect(chordsEditor.container).toEqual('div');
		});

		describe('contains: ', function() {

			it('a <main> child element', function() {
				expect(chordsEditor.container.find('> main').length).toEqual(1);
			});

			describe('contains: ', function() {

				beforeEach(function() {
					mainElement = chordsEditor.container.children('main:first');
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

	describe('optionally accepts rootElement and dataSource as input parameters', function() {

		it('if the parameter rootElement is undefined .container is appended to the body', function() {
			expect($(chordsEditor.container).parent().is('body')).toEqual(true);
		});

		it('if the parameter rootElement is defined .container is appended to it', function() {
			expect($(customChordsEditor.container).parent().is(customRootElement)).toEqual(true);
		});


	});

	describe('initialize a Wiki object', function() {
		it('instantiating it and appending the ChordsEditor UI to the west area', function() {
			expect($(westDivElement).find('> div').length).toBeGreaterThan(0);
		});
	});

	describe('initialize a NotesPicker object', function() {
		it('instantiating it and appending the ChordsEditor UI to the east area', function() {
			expect($(eastDivElement).find('> div').length).toEqual(1);
		});
	});

});