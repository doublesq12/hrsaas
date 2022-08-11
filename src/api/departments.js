import request from '@/utils/request'
export function getDeptsApi(){
  return request({
    url:'/company/department',
  })
}
//组织架构——根据ID删除部门
export function delDeptsApi(id){
  return request({
    url: '/company/department/' + id,
    method:'DELETE',
  })
}
//组织架构——新增部门
export function addDeptApi(data) {
  return request({
    url: '/company/department/',
    method: 'POST',
    data
  })
}
export function getDeptById(id) {
  return request({
    url:"/company/department/"+id
  })
}
export function editDeptsApi(data) {
  return request({
    url: "/company/department/" + data.id,
    method: 'PUT',
    data
  })
}
export function getEmployeesInfoApi(params) {
  return request({
    url: '/sys/user',
    params
  })
}


