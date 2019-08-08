import request from './request'
export function getSong(params) {
  return request({
    url: '/music/url',
    method: 'get',
    params
  })
}

export function getLyric(params) {
  return request({
    url: '/lyric',
    method: 'get',
    params
  })
}
