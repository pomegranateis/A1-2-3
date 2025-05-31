pipeline {
  agent any

  tools {
    nodejs 'NodeJS-20.x'
  }

  environment {
    DOCKERHUB_CREDENTIALS = credentials('docker-hub-creds')
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/pomegranateis/A_2.git', credentialsId: 'github-creds'
      }
    }

    stage('Install Backend') {
      steps {
        dir('backend') {
          sh 'npm install'
        }
      }
    }

    stage('Test Backend') {
      steps {
        dir('backend') {
          sh 'npm test'
        }
      }
      post {
        always {
          junit 'backend/junit.xml'
        }
      }
    }

    stage('Install Frontend') {
      steps {
        dir('frontend') {
          sh 'npm install'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir('frontend') {
          sh 'npm run build'
        }
      }
    }

    stage('Docker Build & Push Backend') {
      steps {
        script {
          dir('backend') {
            sh 'docker build -t pomegranatei/todolist-backend:latest .'
          }
          sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
          sh 'docker push pomegranatei/todolist-backend:latest'
        }
      }
    }

    stage('Docker Build & Push Frontend') {
      steps {
        script {
          dir('frontend') {
            sh 'docker build -t pomegranatei/todolist-frontend:latest .'
          }
          sh 'docker push pomegranatei/todolist-frontend:latest'
        }
      }
    }
  }
}
