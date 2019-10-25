module.exports = {
  async handle(request, toolbox) {
    const { nameOfProject } = request
    const { print, system } = toolbox

    /** Add Docker files */
    await system.run(
      'wget https://raw.githubusercontent.com/CloudNativeJS/docker/master/Dockerfile-run'
    )
    await system.run(
      'wget https://raw.githubusercontent.com/CloudNativeJS/docker/master/.dockerignore'
    )
    toolbox.print.success('Successfully downloaded Dockerfiles')

    await system.run(
      `docker build -t cloud-native-node-starter:1.0.0 -f Dockerfile-run .`
    )
    await system.run(
      `docker run -d -p 3000:3000 -t cloud-native-node-starter:1.0.0`
    )
    print.success('Docker image created sucessfully')
    print.info(
      'Run `docker run -d -p 3000:3000 -t cloud-native-node-starter:1.0.0` to run app within container'
    )

    return
  }
}
