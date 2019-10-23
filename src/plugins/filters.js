import Vue from 'vue'

Vue.filter('addressShortner', function (value , range) {
  if (!value) return ''
  return value.substring(0, range).concat('....');
})
Vue.filter('noToFIxed', function (value , range) {
  if (!value) return ''
  let filtered = Number(value).toFixed(range)
  return filtered
})