pipeline {
    agent any

    stages {
        stage('Build Front') {
            steps {
                script {
                    timeout(time: 10, unit: 'MINUTES') {
                        // Frontend 서비스 빌드
                        sh 'docker-compose build frontend'
                    }
                }
            }
        }

        // Back 빌드 단계
        // stage('Build Back') {
        //     steps {
        //         script {
        //             // Backend 서비스 빌드
        //             sh 'docker-compose build backend'
        //         }
        //     }
        // }

        stage('Deploy Front') {
            steps {
                script {
                    // Frontend 서비스 배포
                    sh 'docker-compose stop frontend'
                    sh 'docker-compose up -d frontend'
                }
            }
        }

        // Back 배포 단계
        // stage('Deploy Back') {
        //     steps {
        //         script {
        //             // Backend 서비스 배포
        //             sh 'docker-compose stop backend'
        //             sh 'docker-compose up -d backend'
        //         }
        //     }
        // }
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
