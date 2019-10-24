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

Vue.filter('stringToFix', function (value , range) {
  if (!value) return ''
  return value.substring(0, range);
})

Vue.filter('capitalize', function (value , range) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
