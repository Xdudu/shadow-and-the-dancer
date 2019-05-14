import { getRoundCntToComplete } from '../utils'

const width = 2700
const height = 2700

const R = 220
const r = 110

const roundCntToComplete = getRoundCntToComplete(R, r)

const commonDrawParams = {
  R,
  r,
  seriesCnt: 20,
  drawDisRange: [ 0.2, 0.3 ],
  totalTranslate: [ 110, 0 ],
  rgb: [ [ 12, 120, 20 ], [ 191, 180, 180 ] ],
  alpha: [ 0.5, 0.1 ],
  speed: 1,
  drawMethod: {
    type: 'line',
    weight: 3,
  },
  roundCnt: roundCntToComplete * 1,
}


export default {
  width,
  height,
  bg: '#fff',
  drawList: [
    {
      ...commonDrawParams,
      seriesAngBias: Math.PI / 12 * 2.5,
      canvasBias: [ width * 0.2, height * 0.25 ],
    },
    {
      ...commonDrawParams,
      seriesAngBias: Math.PI / 12 * 3,
      canvasBias: [ width * 0.48, height * 0.25 ],
    },
    {
      ...commonDrawParams,
      seriesAngBias: Math.PI / 12 * 4,
      canvasBias: [ width * 0.75, height * 0.25 ],
    },
    {
      ...commonDrawParams,
      seriesAngBias: Math.PI / 12 * 5,
      canvasBias: [ width * 0.2, height * 0.5 ],
    },
    {
      ...commonDrawParams,
      seriesAngBias: Math.PI / 12 * 8,
      canvasBias: [ width * 0.48, height * 0.5 ],
    },
    {
      ...commonDrawParams,
      seriesAngBias: Math.PI / 12 * 12,
      canvasBias: [ width * 0.75, height * 0.5 ],
    },
    {
      ...commonDrawParams,
      seriesAngBias: Math.PI * 1.5,
      canvasBias: [ width * 0.2, height * 0.75 ],
    },
    {
      ...commonDrawParams,
      seriesAngBias: Math.PI * 2,
      canvasBias: [ width * 0.48, height * 0.75 ],
    },
    {
      ...commonDrawParams,
      seriesAngBias: Math.PI * 3,
      canvasBias: [ width * 0.75, height * 0.75 ],
    },
  ]
}
