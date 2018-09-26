/***************************************************************************************************************************************************************
 *
 * PA11Y TEST
 *
 ************************************************************************************************************************************************************* */

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
const Pa11y = require('pa11y');
const chalk = require('chalk');

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// GLOBALS
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// WCAG2AA.Principle2.Guideline2_4.2_4_1.H64.1 is the rule where iframe requires title ( we cannot control Gigya iframes )
const OPTIONS = {
  timeout: 60000,
  hideElements: '.sr-only, #abc-logo',
  ignore: ['WCAG2AA.Principle2.Guideline2_4.2_4_1.H64.1']
};

// These actions use the Developer Toolbar to adjust settings page state before each a11y test
const SettingsDemoCases = [
  {
    name: 'Login page',
    action: [
      'screen capture example.png',
      'click element .test--continue-to-registration'
    ]
  },
  {
    name: 'Logout page',
    action: ['click element #demoLogout']
  },
  {
    name: 'Change email address',
    action: ['click element #demoLogin', 'click element #changeEmail']
  }
];

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// CLI OUTPUT FORMATTING
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
const displayResults = results => {
  const errors = results.filter(result => result.type === 'error');

  if (errors.length) {
    errors.map(error => {
      console.error(chalk.bold.red(`Error found at ${error.selector}`));
      console.error(`${error.context}\n${error.message}\n`);
    });

    process.exit(1);
  } else {
    console.log(chalk.bold.green('No errors'));
  }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// RUN TESTS
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
const Pa11yTest = Pa11y(OPTIONS);

console.log('**************************', process.argv[2]);

// allow user to specify localhost address to run pa11y tests on - We use this for settings app only
if (process.argv[2]) {
  SettingsDemoCases.forEach(action => {
    const TestCaseOption = OPTIONS;
    TestCaseOption.actions = action.action;
    TestCaseOption.log = {
      debug: console.log,
      error: console.error,
      info: console.info
    };
    TestCaseOption.chromeLaunchConfig = {
      ignoreHTTPSErrors: true
    };

    const SettingsPa11yTest = Pa11y(
      'http://localhost:8080/index.html',
      TestCaseOption
    );

    SettingsPa11yTest.then((error, results) => {
      console.log(chalk.bold.cyan(action.name));
      error ? console.error(chalk.bold.red(error)) : displayResults(results);
    }).catch(e => {
      console.error(chalk.bold.red(JSON.stringify(e)));
    });
  });
} else {
  console.error(chalk.bold.red('Please specify what url you want to test'));
}
