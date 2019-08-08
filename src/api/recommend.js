import request from './request'

export function getBanner(params) {
  return request({
    url: '/banner',
    method: 'get',
    params
  })
}

export function getRecommend(params) {
  return request({
    url: '/personalized',
    method: 'get',
    params
  })
}

