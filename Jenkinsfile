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
                    // Frontend 서비스가 실행 중인지 확인
                    if (sh(script: 'docker-compose ps -q frontend', returnStdout: true).trim()) {
                        sh 'docker-compose stop frontend'  // Frontend 중지
                        sh 'docker-compose rm -f frontend' // 컨테이너 삭제
                    }
                    sh 'docker-compose up --build -d frontend'
                }
            }
        }

        // Back 배포 단계 🚀
        stage('Deploy Back') {
            steps {
                script {
                    // Backend 서비스가 실행 중인지 확인
                    if (sh(script: 'docker-compose ps -q backend', returnStdout: true).trim()) {
                        sh 'docker-compose stop backend'  // Backend 중지
                        sh 'docker-compose rm -f backend' // 컨테이너 삭제
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
