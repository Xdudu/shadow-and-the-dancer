import { getRoundCntToComplete } from '../utils'

const width = 2400
const height = 2400

const R = 420
const r = 40

const roundCntToComplete = getRoundCntToComplete(R, r)

export default {
  width,
  height,
  canvasBias: [ width * 0.48, height * 0.48 ],
  speed: 0.6,
  drawMethod: 'line',
  bg: '#962e1a',
  roundCnt: roundCntToComplete * 1,
  params: {
    R,
    r,
    seriesCnt: 300,
    seriesAngBias: Math.PI * 2,
    drawDisRange: [ 0.85, 2.5 ],
    totalTranslate: [ 50, 50 ],
    rgb: [ 231, 163, 67 ],
    alpha: [ 0.22, 0.001 ],
  },
}
