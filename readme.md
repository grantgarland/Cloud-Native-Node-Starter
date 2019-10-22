<div align=center>
<h1 style="border:0">Cloud Native Node Starter</h1>
Builds a cloud native Node.js boilerplate application in minutes, complete with monitoring, orchestration, and tracing 
</div>

## Required software

I would recommend using Homebrew to install all other dependencies (Node, Docker, etc.)
[Homebrew](https://brew.sh/)
[Docker Desktop](https://www.docker.com/products/docker-desktop)
[Node.js](https://nodejs.org/en/download/)
[Docker](https://docs.docker.com/v17.09/engine/installation/)

## Installation

```shell
npm install cloud-native-node-starter -g
```

## Usage

```shell
cloud-native-node-starter create <your-app-name>
```

## Publishing to NPM

To package your CLI up for NPM, do this:

```shell
$ npm login
$ npm whoami
$ npm lint
$ npm test
(if typescript, run `npm run build` here)
$ npm publish
```

### License

MIT – See [LICENSE](LICENSE) file.
