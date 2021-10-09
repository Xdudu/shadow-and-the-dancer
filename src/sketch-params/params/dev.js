import { getRoundCntToComplete } from '../utils'

const width = 2700
const height = 2700

const R = 600
const r = 360

const roundCntToComplete = getRoundCntToComplete(R, r)


export default {
  width,
  height,
  bg: '#fff',
  drawList: [
    {
      R,
      r,
      seriesCnt: 20,
      drawDisRange: [ 1.6, 1.8 ],
      totalTranslate: [ 100, 0 ],
      rgb: [ 10, 10, 10 ],
      alpha: [ 0.7, 0.1 ],
      speed: 5,
      drawMethod: {
        type: 'line',
        weight: 4,
      },
      roundCnt: roundCntToComplete * 1,
      seriesAngBias: Math.PI / 7,
      canvasBias: [ width * 0.5, height * 0.5 ],
    },
  ]
}
