import { hydrateRoot } from "react-dom/client"
import { createFromReadableStream } from "react-server-dom-webpack/client"

const RSCRoot = ({ rscRes }) => {
  return rscRes
}

hydrateRoot(
  document.getElementById("root"),
  <RSCRoot rscRes={createFromReadableStream(window.__READABLE_STREAM__)} />
)
