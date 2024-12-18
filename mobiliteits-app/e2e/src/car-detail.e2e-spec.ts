import { browser, by, element } from 'protractor';

describe('Car detail page', () => {
    it('should display car images, rent form, and car details table', async () => {
        // Navigate to the car detail page
        await browser.get('http://localhost:4200/cardetail/BCD567');

        // Wait for the images to load
        await browser.wait(async () => {
            const images = await element.all(by.css('.mySwiper2 img'));
            return images.length > 0;
        }, 5000, 'Images did not load');

        // Check if there is at least one image in the main swiper
        const mainSwiperImages = await element.all(by.css('.mySwiper2 img'));
        expect(mainSwiperImages.length).toBeGreaterThan(0);

        // Check if the rent form is present
        const rentForm = element(by.id('rent_car'));
        expect(await rentForm.isPresent()).toBeTruthy();

        // Check if the car details table is present
        const carDetailsTable = element(by.css('.table-detail'));
        expect(await carDetailsTable.isPresent()).toBeTruthy();
    });
});
