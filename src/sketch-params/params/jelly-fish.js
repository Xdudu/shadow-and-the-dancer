import { getRoundCntToComplete } from '../utils'

const width = 2700
const height = 2700

const R = 160
const r = 280

const roundCntToComplete = getRoundCntToComplete(R, r)

export default {
  width,
  height,
  canvasBias: [ width * 0.35, height * 0.48 ],
  speed: 2,
  drawMethod: 'point',
  bg: '#fffdfd',
  roundCnt: roundCntToComplete * 4,
  params: {
    R,
    r,
    seriesCnt: 200,
    seriesAngBias: Math.PI / 1,
    drawDisRange: [ 1, 3 ],
    totalTranslate: [ 1120, 0 ],
    rgb: [ [ 177, 117, 171 ], [ 220, 220, 220 ] ],
    alpha: [ 0.1, 0.05 ],
  },
}
