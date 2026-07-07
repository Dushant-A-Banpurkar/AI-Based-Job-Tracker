import {chromium} from 'playwright'

(async () => {
    const browser =await chromium.launch({
        headless:false
    });

    const page=await browser.newPage();

    await page.goto("JOB_LINK");

    const inputs=await page.locator("input").all();

    console.log(inputs.length);
})