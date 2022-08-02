import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
//获取用户信息
export function getUserInfoApi() {
  return request({
    url: 'sys/profile',
    method: 'POST',
  })
}
//根据用户id获取员工详情数据
export function getUserDetail(id) {
  return request({
    url: 'sys/user/'+id
  })
}

