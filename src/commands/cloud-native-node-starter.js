const chalk = require('chalk')
const figlet = require('figlet')

module.exports = {
  name: 'cloud-native-node-starter',
  run: async toolbox => {
    const { print } = toolbox

    print.info(
      chalk.green(
        figlet.textSync('Cloud Native Node Starter', {
          font: 'mini',
          horizontalLayout: 'default',
          verticalLayout: 'default'
        })
      )
    )

    print.info(
      'Type "cloud-native-node-starter -h" for help building your next project'
    )
  }
}
