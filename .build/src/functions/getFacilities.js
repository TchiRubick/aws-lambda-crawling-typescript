"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const chrome_aws_lambda_1 = __importDefault(require("chrome-aws-lambda"));
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const url = 'https://www.booking.com/hotel/fr/refuges-des-hauts.fr.html';
const handler = async (event) => {
    let config = {
        headless: false,
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        args: ['--incognito'],
        userDataDir: '/dev/null'
    };
    if (!process.env.IS_OFFLINE) {
        config = {
            executablePath: await chrome_aws_lambda_1.default.executablePath,
            args: chrome_aws_lambda_1.default.args,
            headless: chrome_aws_lambda_1.default.headless,
        };
    }
    const browser = await puppeteer_core_1.default.launch({ ...config });
    try {
        const page = await browser.newPage();
        await page.goto(url);
        const data = await page.evaluate(() => {
            const facilitiesEl = Array.from(document.querySelectorAll('#hp_facilities_box > div > div > .a6541fb018 > div > div > .e5e0727360 > .a815ec762e'));
            return facilitiesEl.map((facilityDom) => {
                const facility = facilityDom.querySelector('div > span > div > span')?.innerText || 'Not found';
                return facility;
            });
        });
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    }
    catch (error) {
        return {
            statusCode: 200,
            body: error.message,
        };
    }
    finally {
        await browser.close();
    }
};
exports.handler = handler;
