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
                    sh 'docker-compose down frontend'
                    sh 'docker-compose up --build -d frontend'
                }
            }
        }

        // Back 배포 단계 🚀
        stage('Deploy Back') {
            steps {
                script {
                    sh 'docker-compose down backend'
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
