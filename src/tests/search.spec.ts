import {browser} from 'protractor';

import {assert} from 'chai';

import {GooglePage} from '../page-objects/google';

import {createTestAttachments} from '../utilities/attachments';

describe('I want to', function () {
	const googlePage = new GooglePage();
	const city = 'Malaga';

	before(async function () {
		await browser.waitForAngularEnabled(false);
		await googlePage.goTo();
		await googlePage.searchCity(city);

		try {
			await googlePage.morePlaces();
		} catch (e) {
			await googlePage.searchCity('Malaga');
			await googlePage.morePlaces();
		}
	});
	
	it(`find clients in ${city}`, async function () {
		await browser.sleep(2000);
		const numberOfElements = await googlePage.getNumberOfCompanies();
		const companiesData = [];

		for (let i = 0; i < numberOfElements; i++) {
			const companyText = await googlePage.getComapniesElementText(i);
			const companyData = companyText.split('\n');
			const companyName = companyData[0];
			let telefon = '';

			for (let j = 0; j < companyData.length; j++) {
				if (companyData[j].indexOf('+34') !== -1) {
					telefon = companyData[j];
					break;
				}
			}

			companiesData.push({
				name: companyName,
				telephone: telefon
			});
			// console.log(`${companyName} telefon: ${telefon}`);
		}

		this.test['attachments'] = [await createTestAttachments(this.test.title)];
		assert.isEmpty(companiesData, 'The companies data should be there!');
	});
});