/* global describe it cy require afterEach beforeEach */

var helper = require('../../common/helper');
var { insertImage, deleteImage, assertImageSize } = require('../../common/desktop_helper');

describe('Image Operation Tests', function() {
	var origTestFileName = 'image_operation.ods';
	var testFileName;

	beforeEach(function() {
		testFileName = helper.beforeAll(origTestFileName, 'calc');
	});

	afterEach(function() {
		helper.afterAll(testFileName, this.currentTest.state);
	});

	it('Insert/Delete Image',function() {
		insertImage('calc');

		//make sure that image is in focus
		cy.get('.leaflet-pane.leaflet-overlay-pane svg g.leaflet-control-buttons-disabled')
			.should('exist');

		deleteImage();
	});

	it('Resize image when keep ratio option enabled and disabled', function() {
		insertImage('calc');
		//when Keep ratio is unchecked
		assertImageSize(248, 63);

		cy.contains('.ui-expander-label', 'Position and Size')
			.click();

		helper.waitUntilIdle('#selectwidth input');

		cy.get('#selectwidth input').clear({force:true})
			.type('3{enter}', {force:true});

		helper.waitUntilIdle('#selectheight input');

		cy.get('#selectheight input').clear({force:true})
			.type('2{enter}', {force:true});

		assertImageSize(139, 93);

		//Keep ratio checked
		cy.get('#ratio input').check();

		helper.waitUntilIdle('#selectheight input');

		cy.get('#selectheight input').clear({force:true})
			.type('5{enter}', {force:true});

		assertImageSize(347, 232);
	});
});
