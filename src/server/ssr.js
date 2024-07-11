const BabelRegister = require("@babel/register")
BabelRegister()

const fs = require("fs")
const path = require("path")
const stream = require("stream")
const express = require("express")
const React = require("react")
const ReactDomServer = require("react-dom/server")
const ReactServerDomWebpackClient = require("react-server-dom-webpack/client")
const { Root } = require("../app/Root")

const reactSsrManifest = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../../dist/react-ssr-manifest.json"),
    "utf-8"
  )
)

const app = express()

app.use("/dist", express.static("dist"))

app.get("/", (req, res) => {
  fetch("http://localhost:3011").then((rscStreamRes) => {
    const [nodeStream, rscPayloadStream] = rscStreamRes.body.tee()

    let rscRes

    const createRscRes = () => {
      if (!rscRes) {
        rscRes = ReactServerDomWebpackClient.createFromNodeStream(
          stream.Readable.fromWeb(nodeStream),
          reactSsrManifest
        )
      }

      return rscRes
    }

    const { pipe } = ReactDomServer.renderToPipeableStream(
      React.createElement(Root, { createRscRes }),
      {
        bootstrapScripts: ["/dist/main.js"],
        bootstrapScriptContent: `
        window.__READABLE_STREAM__ = new ReadableStream({
          start: (controller) => {
            window.__READABLE_STREAM_CONTROLLER__ = controller
          }
        })
        window.__TEXT_ENCODER__ = new TextEncoder()
        `,
        onShellReady: () => {
          pipe(new stream.Transform({
            transform: async (chunk, encoding, callback) => {
              let newChunk = chunk.toString("utf8")
              if (newChunk.includes("</body></html>")) {
                let scripts = ""
                for await (const rscPayloadChunk of rscPayloadStream) {
                  scripts += `<script>window.__READABLE_STREAM_CONTROLLER__.enqueue(window.__TEXT_ENCODER__.encode(${JSON.stringify(Buffer.from(rscPayloadChunk).toString("utf8"))}))</script>`
                }
                newChunk = newChunk.replace("</body></html>", `${scripts}</body></html>`)
              }
              callback(null, Buffer.from(newChunk, "utf8"))
            }
          })).pipe(res)
        }
      }
    )
  })
})

app.listen(3010)
