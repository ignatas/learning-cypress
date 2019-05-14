## Preparations
This project was created using nodejs version 8.11.1.
In case of issues with launching test-cases check installed nodejs version.

## Download
Download project files using:
```
git clone https://github.com/ignatas/p1
```
Navigate to the directory with downloaded files and install all required dependencies for project using:
```
npm install
```

## Start

To run test-cases launch cypress using:
```
npx cypress run
```
## Reports

After each launch of test scenario jasmine-allure-reporter grabs results in xml-file locating at:

```
.\allure-results
```

# Note

During multiple test execution of scenarios jasmine-allure-reporter accumulates result files of each execution.
To avoid situation described above and remove obsolete result of test clear the allure folders