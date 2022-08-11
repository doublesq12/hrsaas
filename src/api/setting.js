import request from '@/utils/request'
//企业管理——根据ID查询企业
export function getCompanyInfoApi(companyId) {
  return request({
    url:`/company/${companyId}`
  })
}