import { Header } from "../components/ui/Header"

export const Root = ({ createRscRes }) => {
  const rscRes = createRscRes()

  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React server features demo</title>
      </head>
      <body>
        <Header>Root</Header>
        <div id="root">
          {rscRes}
        </div>
      </body>
    </html>
  )
}
