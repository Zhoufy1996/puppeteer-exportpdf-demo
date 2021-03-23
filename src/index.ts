import puppeteer from 'puppeteer';
import path from 'path';

const address = 'https://www.google.com/';
const output = path.join(__dirname, `assets/${new Date().getTime()}.pdf`);

// https://stackoverflow.com/questions/52497252/puppeteer-wait-until-page-is-completely-loaded
const exportPdf = async () => {
    const browser = await puppeteer.launch({
        devtools: false, // 调试改为true
        defaultViewport: undefined, // 禁用800x600分辨率。然后需要最大分辨率 https://stackoverflow.com/questions/52553311/how-to-set-max-viewport-in-puppeteer
    });
    const page = await browser.newPage();
    await page.goto(address, { waitUntil: 'networkidle2' });
    // 请求数据需要带token
    // page.setCookie({
    //     name: 'access_token',
    //     value: cookie,
    // });
    // page.evaluate(() => {});
    // // 等待id为noprogress的元素包含
    // await page.waitForSelector('#noprogress', {
    //     visible: true,
    // });

    await page.pdf({ path: output, format: 'a4' });
    await browser.close();
};

exportPdf();
