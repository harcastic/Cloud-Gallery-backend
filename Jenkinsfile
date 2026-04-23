pipeline{
    agent any

    stages {

        stage('Clone Repos') {
            steps {
                git url: 'https://github.com/harcastic/Cloud-Gallery-backend.git', branch: 'main' 
            }
        }

        stage('build'){
            steps {
                sh 'docker build -t harcastic/cgbackend:latest .'
            }
        }
        stage('push'){
            steps{
                withCredentials([usernamePassword(
                    credentialsId: 'dockerHub',
                    usernameVariable: 'dockeruser',
                    passwordVariable: 'dockerpwd'
                )]) {
                    sh 'docker login -u $dockeruser -p $dockerpwd' 
                    sh 'docker push harcastic/cgbackend:latest'
                }
            }
        }

        stage('pull image'){
            steps{
                sh 'docker pull harcastic/cgbackend:latest'
            }
        }

        stage('deploy'){
            steps{
                sh '''
                    if [ "$(docker ps -aq -f name=cgbackend)" ]; then
                        echo "Container exists. Removing..."
                        docker rm -f cgbackend
                    else
                        echo "No existing container."
                    fi
                '''
                sh 'docker run -d -p 5000:5000 --env-file /home/azureuser/.env --name cgbackend harcastic/cgbackend:latest'
            }
        }
    }

}