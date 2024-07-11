import { Header } from "../ui/Header"

export const LegendaryTracksList = ({ legendaryTracks }) => {
  return (
    <div>
      <Header>Legendary tracks</Header>
      {legendaryTracks.map((legendaryTrack) => <p key={legendaryTrack.name}>{legendaryTrack.name}</p>)}
    </div>
  )
}
