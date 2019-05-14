pipeline {
    agent any
    
    stages {    
      stage('build') {
      steps {
        sh "npm install"
      }
    }

      stage('parallel') {
      parallel {
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
        stage('tester e') {
          steps {
              
           sh "npx cypress run --record --key c6a0355c-4706-45df-a0a3-51ff1614022b --parallel"
          }
        }
      }

    }
}
}