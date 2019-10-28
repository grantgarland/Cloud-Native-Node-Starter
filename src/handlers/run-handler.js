const shell = require('shelljs')
module.exports = {
  async handle(request, toolbox) {
    const { print } = toolbox

    print.info('Exposing Kubernetes cluster on local port...')
    await shell.exec(
      `kubectl --namespace grafana port-forward $(kubectl get pods --namespace grafana -l "app=grafana" -o jsonpath="{.items[0].metadata.name}") 3000`
    )

    return
  }
}
