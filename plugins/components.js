import Vue from 'vue'
import { BigNumber } from "bignumber.js";

export default () => {

  Vue.filter('amount', val => {
    val = new BigNumber(val)
    BigNumber.config({ FORMAT: {
        prefix: '',
        decimalSeparator: '.',
        groupSeparator: ' ',
        groupSize: 3,
        secondaryGroupSize: 0,
        fractionGroupSeparator: ' ',
        fractionGroupSize: 0,
        suffix: ''
      } })
    return val.toFormat()
  })
}
