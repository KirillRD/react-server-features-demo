import { resolve } from "path"
import { readFile } from "fs/promises"

const wait = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms))

const getFile = async (fileName) => await readFile(resolve(__dirname, `../../data/${fileName}`))

const readFileWithWait = async (fileName, ms) => {
  await wait(ms)
  return JSON.parse(await getFile(fileName))
}

export const getLegendaryTracks = async (ms) => await readFileWithWait("legendary_tracks.json", ms)

export const getF1Teams = async (ms) => await readFileWithWait("f1_teams_2024.json", ms)
