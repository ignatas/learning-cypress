pipeline {
    agent any
    // this stage runs end-to-end tests, and each agent uses the workspace
    // from the previous stage
    stages {    
      stage('build') {
      steps {
        // there a few default environment variables on Jenkins
        // on local Jenkins machine (assuming port 8080) see
        // http://localhost:8080/pipeline-syntax/globals#env
        npm install
      }
    }

      stage('parallel') {
      parallel {
        // start several test jobs in parallel, and they all
        // will use Cypress Dashboard to load balance any found spec files
        stage('tester a') {
          steps {
              
           sh "npx cypress run --record --key c6a0355c-4706-45df-a0a3-51ff1614022b --parallel"
          }
        }
        stage('tester b') {
          steps {
              
           sh "npx cypress run --record --key c6a0355c-4706-45df-a0a3-51ff1614022b --parallel"
          }
        }
        stage('tester c') {
          steps {
              
           sh "npx cypress run --record --key c6a0355c-4706-45df-a0a3-51ff1614022b --parallel"
          }
        }
        stage('tester d') {
          steps {
              
           sh "npx cypress run --record --key c6a0355c-4706-45df-a0a3-51ff1614022b --parallel"
          }
        }

        // second tester runs the same command
        stage('tester e') {
          steps {
              
           sh "npx cypress run --record --key c6a0355c-4706-45df-a0a3-51ff1614022b --parallel"
          }
        }
      }

    }
}
}