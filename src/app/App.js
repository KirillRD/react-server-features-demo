import { Suspense } from "react"
import { Counter } from "../components/Counter"
import { Header } from "../components/ui/Header"
import { getF1Teams, getLegendaryTracks } from "../utils/api"
import { F1TeamsList } from "../components/lists/F1TeamsList"
import { LegendaryTracksList } from "../components/lists/LegendaryTracksList"

export const App = async () => {
  const legendaryTracks = await getLegendaryTracks(3000)
  const f1TeamsPromise = getF1Teams(3000)

  return (
    <>
      <Header>App</Header>
      <LegendaryTracksList legendaryTracks={legendaryTracks} />
      <Suspense fallback={<Header>Client component loading...</Header>}>
        <Counter />
      </Suspense>
      <Suspense fallback={<Header>F1 teams loading...</Header>}>
        <F1TeamsList f1TeamsPromise={f1TeamsPromise} />
      </Suspense>
    </>
  )
}
