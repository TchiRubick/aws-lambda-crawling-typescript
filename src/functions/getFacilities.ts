import type {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import edgeChromium from 'chrome-aws-lambda';
import puppeteer, { type Browser } from 'puppeteer-core';

const url = 'https://www.booking.com/hotel/fr/refuges-des-hauts.fr.html';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  
  let config: Record<string, string | string [] | boolean> = {
    headless: false,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--incognito'],
    userDataDir: '/dev/null'
  };

  if (!process.env.IS_OFFLINE) {
    config = {
      executablePath: await edgeChromium.executablePath,
      args: edgeChromium.args,
      headless: edgeChromium.headless,
    };
  }

  const browser: Browser = await puppeteer.launch({ ...config });

  try {
    const page = await browser.newPage();

    await page.goto(url);

    const data = await page.evaluate(() => {
      const facilitiesEl = Array.from(
        document.querySelectorAll(
          '#hp_facilities_box > div > div > .a6541fb018 > div > div > .e5e0727360 > .a815ec762e'
        )
      );

      return facilitiesEl.map((facilityDom: any) => {
        const facility =
          facilityDom.querySelector('div > span > div > span')?.innerText || 'Not found';

        return facility;
      });
    });

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error: any) {
    return {
      statusCode: 200,
      body: error.message,
    };
  } finally {
    await browser.close();
  }
};
