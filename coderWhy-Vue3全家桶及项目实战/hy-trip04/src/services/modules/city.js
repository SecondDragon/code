import hyRequest from '../request'

export function getCityAll() {
  return hyRequest.get({
    url: "/city/all"
  })
}
