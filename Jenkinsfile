pipeline {
    agent any

    stages {
        // Front 빌드 단계
        stage('Build Front') {
            steps {
                script {
                    timeout(time: 10, unit: 'MINUTES') {
                        sh 'docker-compose build frontend'
                    }
                }
            }
        }

        // Back 빌드 단계
        stage('Build Back') {
            steps {
                script {
                    sh 'docker-compose build backend'
                }
            }
        }

        // Front 배포 단계 🚀
        stage('Deploy Front') {
            steps {
                script {
                    def frontendRunning = sh(script: 'docker-compose ps -q frontend', returnStatus: true) == 0
                    if (frontendRunning) {
                        sh 'docker-compose stop frontend'
                        sh 'docker-compose rm -f frontend'
                    }
                    sh 'docker-compose up --build -d frontend'
                }
            }
        }

        // Back 배포 단계 🚀
        stage('Deploy Back') {
            steps {
                script {
                    def backendRunning = sh(script: 'docker-compose ps -q backend', returnStatus: true) == 0
                    if (backendRunning) {
                        sh 'docker-compose stop backend'
                        sh 'docker-compose rm -f backend'
                    }
                    sh 'docker-compose up --build -d backend'
                }
            }
        }

        // Nginx 재시작 단계 (Docker-In-Docker)
        stage('Restart Nginx') {
            steps {
                script {
                    sh 'service nginx restart'
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up temporary files!'
            sh 'docker image prune -f'
        }
        success {
            echo 'Deployment was successful!'
        }
        failure {
            echo 'Deployment failed...'
        }
    }
}
