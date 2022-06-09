pipeline {
  agent any

  options {
    buildDiscarder(logRotator(artifactNumToKeepStr: '10'))
  }

  stages {
    stage('build') {
      steps {
        sh "npm prune --ignore-scripts"
        sh "rm -rf node_modules/inuits-* node_modules/vue-3-component-library"
        sh "npm install --ignore-scripts"
        sh "rm -rf dist verzekeringen.zip"
        sh "npm run build"
        sh "zip -r verzekeringen.zip dist/*"
      }
    }

    stage('archive') {
      when {
        anyOf {
          branch "production"
          branch "staging"
        }
      }
      steps {
        rtUpload (
          serverId: 'artifactory',
          spec: '''{
            "files": [
              {
                "pattern": "verzekeringen.zip",
                "target": "verzekeringen-frontend/${BRANCH_NAME}/${BUILD_ID}/"
              }
           ]
          }'''
        )
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
    to: "tvl@scoutsengidsenvlaanderen.be,ricardo@inuits.eu,${env.CHANGE_AUTHOR_EMAIL}",
    subject: "[Jenkins] ${currentBuild.fullDisplayName} ${currentBuild.currentResult}",
    body: """${currentBuild.fullDisplayName} ${currentBuild.currentResult}

${currentBuild.absoluteUrl}"""
  )
}
