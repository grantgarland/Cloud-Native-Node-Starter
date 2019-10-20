const { system, filesystem } = require('gluegun')

const src = filesystem.path(__dirname, '..')

const cli = async cmd =>
  system.run(
    'node ' +
      filesystem.path(src, 'bin', 'cloud-native-node-starter') +
      ` ${cmd}`
  )

test('outputs version', async () => {
  const output = await cli('--version')
  expect(output).toContain('0.0.1')
})

test('outputs help', async () => {
  const output = await cli('--help')
  expect(output).toContain('0.0.1')
})

test('creates new projects', async () => {
  const output = await cli('new my_project')

  expect(output).toContain(
    'Created new project at my_project. cd into my_project/ and run "npm install" to begin'
  )
  const projectDir = filesystem.read('my_project/package.json')

  expect(projectDir).toContain(`{ "name": `)

  // cleanup artifact
  filesystem.remove('my_project/')
})
