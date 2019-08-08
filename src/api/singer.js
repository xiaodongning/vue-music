import request from './request'

export function getSinger(params) {
  return request({
    url: '/top/artists',
    method: 'get',
    params
  })
}

export function getSingerSong(params) {
  return request({
    url: '/artists',
    method: 'get',
    params
  })
}
