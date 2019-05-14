import { getRoundCntToComplete } from '../utils'

const width = 3200
const height = 3200

const R = 1050
const r = 900

const roundCntToComplete = getRoundCntToComplete(R, r)

export default {
  width,
  height,
  bg: 'rgb(5, 16, 23)',
  drawList: [
    {
      R,
      r,
      canvasBias: [ width * 0.48, height * 0.48 ],
      speed: 5,
      drawMethod: {
        type: 'line',
      },
      roundCnt: roundCntToComplete * 5 + 0.005,
      seriesCnt: 70,
      seriesAngBias: Math.PI / 4,
      drawDisRange: [ 1, 1.8 ],
      totalTranslate: [ 250, 200 ],
      rgb: [ [ 104, 158, 205 ], [ 34, 108, 155 ] ],
      alpha: [ 0.002, 0.28 ],
    },
  ]
}
