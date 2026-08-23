pipeline {

    agent any


    environment {

        DOCKER_IMAGE = "rajkumard92/rajmail"

        DOCKER_CREDENTIALS =
            "dockerhub-credentials"

    }


    stages {


        stage('Checkout') {

            steps {

                echo 'Checking out source code...'

                checkout scm

            }

        }


        stage('Build Docker Image') {

            steps {

                echo 'Building Docker image...'

                sh """

                    docker build \
                    -t ${DOCKER_IMAGE}:${BUILD_NUMBER} \
                    -t ${DOCKER_IMAGE}:latest \
                    .

                """

            }

        }


        stage('Docker Login') {

            steps {

                echo 'Logging into Docker Hub...'

                withCredentials([

                    usernamePassword(

                        credentialsId:
                            "${DOCKER_CREDENTIALS}",

                        usernameVariable:
                            "DOCKER_USERNAME",

                        passwordVariable:
                            "DOCKER_PASSWORD"

                    )

                ]) {

                    sh '''

                        echo "$DOCKER_PASSWORD" |

                        docker login \
                        -u "$DOCKER_USERNAME" \
                        --password-stdin

                    '''

                }

            }

        }


        stage('Push Docker Image') {

            steps {

                echo 'Pushing Docker image...'

                sh """

                    docker push \
                    ${DOCKER_IMAGE}:${BUILD_NUMBER}

                    docker push \
                    ${DOCKER_IMAGE}:latest

                """

            }

        }

    }


    post {

        success {

            echo '''
            ====================================
            BUILD SUCCESSFUL
            Docker image pushed successfully
            ====================================
            '''

        }


        failure {

            echo '''
            ====================================
            BUILD FAILED
            Check Jenkins console output
            ====================================
            '''

        }

    }

}
