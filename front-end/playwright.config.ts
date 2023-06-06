import { PlaywrightTestConfig} from "@playwright/test";

const config: PlaywrightTestConfig = {
  reporter: [['html', {open:'always'}]],
  use: {
    headless: false,
    viewport: { width: 1200, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retry-with-video',
    screenshot: 'only-on-failure',
    launchOptions: {
      slowMo: 1000,
    }
  }
};

export default config;