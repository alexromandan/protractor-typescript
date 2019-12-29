import { Config, browser } from 'protractor';
import { remove } from 'fs-extra';

const junitPath = __dirname.replace('tmp', 'results');

export let config: Config = {

  seleniumAddress: 'http://35.189.122.153/wd/hub',

  framework: 'mocha',
  mochaOpts: {
    slow: 90000,
    timeout: 180000,
    reporter: 'mocha-junit-reporter',
    reporterOptions: {
      mochaFile: `${junitPath}/test-[hash].xml`,
      testsuitesTitle: true,
      toConsole: true,
      attachments: true,
      outputs: true,
      suiteTitleSeparatedBy: '.'
    }
  },
  multiCapabilities: [
    {
      browserName: 'chrome',
      specs: ['./src/tests/*.spec.js']
    },
    {
      browserName: 'firefox',
      specs: ['./src/tests/*.spec.js']
    },
  ],
  //specs: ['./src/tests/*.spec.js'],

  onPrepare: async () => {
    remove(junitPath, (err) => {
      if (err) throw err;
    });

    await browser.driver.manage().window().maximize();
    await browser.driver.manage().timeouts().implicitlyWait(500);
  },

  SELENIUM_PROMISE_MANAGER: false,
  allScriptsTimeout: 50000,

  // seleniumAddress: 'http://localhost:4444/wd/hub',

  // You could set no globals to true to avoid jQuery '$' and protractor '$'
  // collisions on the global namespace.
  noGlobals: true
};