<template>
  <div>
    <div>导入页面</div>
    <upload-excel :beforeUpload="excelSuccess" :onSuccess="onSuccess" />
  </div>
</template>

<script>
import employees from '@/constant/employees'
const { importMapKeyPath } = employees
import { importEmployees } from '@/api/employees'
import {formatTime} from '@/filters'
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    //利用beforeUpload对文件类型进行限制
    excelSuccess({ name }) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请选择xlsx文件')
        return false
      }
      return true
    },
    //利用onSuccess可获取上传成功的数据
    async onSuccess({ header, results }) {
      // console.log(header);
      // console.log(results);
      const newArr = results.map((item) => {
        const obj = {}
        for (let key in importMapKeyPath) {
          if (key === '入职如期' || key === '转正日期') {
            const timestamp = item[key]
            const date = new Date((timestamp - 1) * 24 * 3600000)
            date.setFullYear(date.getFullYear() - 70)
            obj[importMapKeyPath[key]] = formatTime(date)
          } else {
            obj[importMapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      console.log(newArr)
      await importEmployees(newArr)
      this.$message.success('导入成功')
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped></style>
