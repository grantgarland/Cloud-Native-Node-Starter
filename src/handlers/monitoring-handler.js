var shell = require('shelljs')
module.exports = {
  async handle(request, toolbox) {
    const { system } = toolbox

    /** Install Prometheus & Grafana */
    const prom_pod_already_present = await system.run(
      `helm ls --all | grep "^prometheus" | cut -d  " " -f1`
    )
    const grafana_pod_already_present = await system.run(
      `helm ls --all | grep "^grafana" | cut -d  " " -f1`
    )
    if (grafana_pod_already_present) {
      await system.run(`helm del --purge grafana`)
    }
    if (prom_pod_already_present) {
      await system.run(`helm del --purge prometheus`)
    }
    await shell.exec(
      `helm install stable/grafana --name grafana --namespace grafana`
    )
    await shell.exec(
      'helm install stable/prometheus --name prometheus --namespace prometheus'
    )
    await shell.exec(
      `export PROM_POD_NAME=$(kubectl get pods --namespace prometheus -l "app=prometheus,component=server" -o jsonpath="{.items[0].metadata.name}")`
    )
    await shell.exec(
      `GRAFANA_POD_NAME=$(kubectl get pods --namespace grafana -l "app=grafana" -o jsonpath="{.items[0].metadata.name}")`
    )

    return
  }
}
