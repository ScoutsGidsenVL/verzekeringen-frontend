pipeline {
  agent any

  options {
    buildDiscarder(logRotator(artifactNumToKeepStr: '10'))
  }

  stages {
    stage('build') {
      steps {
        sh "npm prune --ignore-scripts"
        sh "npm install --ignore-scripts"
        sh "rm -rf dist verzekeringen.zip"
        sh "npm run build"
        sh "zip -r verzekeringen.zip dist/*"
      }
    }

    stage('archive') {
      steps {
        archiveArtifacts 'verzekeringen.zip'

        script{
            def artifactory = Artifactory.server 'artifactory'

            def uploadSpec = '''{
              "files": [
                {
                  "pattern": "verzekeringen.zip",
                  "target": "verzekeringen-frontend/${BRANCH_NAME}/${BUILD_ID}/"
                }
             ]
            }'''

            def buildInfo = artifactory.upload spec: uploadSpec

            artifactory.publishBuildInfo buildInfo
        }
      }
    }

    stage('deploy') {
      steps {
        sh 'ssh lxc-deb-rundeck.vvksm.local sudo -u rundeck /opt/deploy-verzekeringen.sh frontend ${BRANCH_NAME}'
      }
    }
  }

  post {
    failure {
      emailen()
    }
    unstable {
      emailen()
    }
    changed {
      emailen()
    }
  }
}

def emailen() {
  mail(
    to: "tvl@scoutsengidsenvlaanderen.be,${env.CHANGE_AUTHOR_EMAIL}",
    subject: "[Jenkins] ${currentBuild.fullDisplayName} ${currentBuild.currentResult}",
    body: """${currentBuild.fullDisplayName} ${currentBuild.currentResult}

${currentBuild.absoluteUrl}"""
  )
}
