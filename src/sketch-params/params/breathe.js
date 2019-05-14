import { getRoundCntToComplete } from '../utils'

const width = 3200
const height = 3200

const R = 840
const r = 120

const roundCntToComplete = getRoundCntToComplete(R, r)

export default {
  width,
  height,
  bg: '#e0e0e1',
  drawList: [
    {
      R,
      r,
      canvasBias: [ width * 0.48, height * 0.48 ],
      speed: 0.5,
      drawMethod: {
        type: 'line',
      },
      roundCnt: roundCntToComplete * 3,
      seriesCnt: 30,
      seriesAngBias: Math.PI / 4,
      drawDisRange: [ 1, 1.8 ],
      totalTranslate: [ 150, 0 ],
      rgb: [ 165, 130, 144 ],
      alpha: [ 0.8, 0.1 ],
    },
  ]
}
