const ReactServerDomWebpackNodeRegister = require("react-server-dom-webpack/node-register")
ReactServerDomWebpackNodeRegister()

const BabelRegister = require("@babel/register")
BabelRegister()

const fs = require("fs")
const path = require("path")
const express = require("express")
const React = require("react")
const ReactServerDomWebpackServer = require("react-server-dom-webpack/server")
const { App } = require("../app/App")

const reactClientManifest = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../dist/react-client-manifest.json"),
    "utf-8"
  )
)

const app = express()

app.get("/", (req, res) => {
  const { pipe } = ReactServerDomWebpackServer.renderToPipeableStream(
    React.createElement(App),
    reactClientManifest
  )
  pipe(res)
})

app.listen(3011)
