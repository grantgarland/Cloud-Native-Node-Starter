const shell = require('shelljs')

module.exports = {
  async handle(request, toolbox) {
    const { nameOfProject } = request
    const { filesystem, print } = toolbox

    /** Install Helm from script in bin */
    // await shell.exec(
    //   'curl https://raw.githubusercontent.com/helm/helm/master/scripts/get > get_helm.sh'
    // )
    // await shell.exec('chmod 700 get_helm.sh')
    // await shell.exec('./get_helm.sh')
    // toolbox.print.success('Successfully downloaded Helm')

    /** Add Docker files */
    await shell.exec(
      'wget https://raw.githubusercontent.com/CloudNativeJS/docker/master/Dockerfile-run'
    )
    await shell.exec(
      'wget https://raw.githubusercontent.com/CloudNativeJS/docker/master/.dockerignore'
    )
    toolbox.print.success('Successfully downloaded Dockerfiles')

    await shell.exec(
      `docker build -t ${nameOfProject}:1.0.0 -f Dockerfile-run .`
    )
    await shell.exec(`docker run -i -p 3000:3000 -t ${nameOfProject}:1.0.0`)
    toolbox.print.success('App viewable at localhost:3000')

    return
  }
}
