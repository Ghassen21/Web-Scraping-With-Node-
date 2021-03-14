const puppeteer = require("puppeteer");
const Scraper = require("./scrapers/class-based");
const Email = require("./utils/email");




/**
 * Run Standings
 */
(async () => {
    let browser;
    let page;

    try {
        browser = await puppeteer.launch({
            headless: false
        });

        page = await browser.newPage();

        const standings = await new Scraper(browser, page).main();

        // Make sure to uncomment the email code if you want to test out the email functionality.
        // Just remember to add your e-mail credentials in utils/email first.

        await Email.send(
            `<ul style="list-style:none;">
            ${standings.map(
                ([team, points], i) => `<li>${i + 1}: ${team} ${points}</li>`
            )}
          </ul>`.replace(/\,/g, "")
        );
    } catch (error) {
        console.error("error :", error.stack || error)
    };

    await browser.close();
})();