const shell = require('shelljs')
module.exports = {
  async handle(request, toolbox) {
    const { print } = toolbox

    switch (request.serviceToExpose) {
      case 'Express':
        print.info('Exposing Express service on local port...')
        await shell.exec(
          `kubectl port-forward $(kubectl get pods | grep "^nodeserver" | cut -d " " -f1) 3000:3000`
        )
        break
      case 'Prometheus':
        print.info('Exposing Prometheus service on local port...')
        await shell.exec(
          `kubectl --namespace prometheus port-forward $(kubectl get pods --namespace prometheus -l "app=prometheus,component=server" -o jsonpath="{.items[0].metadata.name}") 9090`
        )
        break
      case 'Grafana':
        print.info('Exposing Grafana service on local port...')
        await shell.exec(
          `kubectl --namespace grafana port-forward $(kubectl get pods --namespace grafana -l "app=grafana" -o jsonpath="{.items[0].metadata.name}") 3000`
        )
        break
      default:
        break
    }
    return
  }
}
