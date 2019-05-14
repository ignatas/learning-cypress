pipeline {
    agent any
    // this stage runs end-to-end tests, and each agent uses the workspace
    // from the previous stage
    stage('cypress parallel tests') {
      

      // https://jenkins.io/doc/book/pipeline/syntax/#parallel
      parallel {
        // start several test jobs in parallel, and they all
        // will use Cypress Dashboard to load balance any found spec files
        stage('tester A') {
          steps {
            cypress run --record --key c6a0355c-4706-45df-a0a3-51ff1614022b --parallel
          }
        }

        // second tester runs the same command
        stage('tester B') {
          steps {
            cypress run --record --key c6a0355c-4706-45df-a0a3-51ff1614022b --parallel
          }
        }
      }

    }
}