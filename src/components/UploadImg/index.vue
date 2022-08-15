<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      action="#"
      :http-request="onRequest"
      :file-list="fileList"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      :class="fileList.length ? 'hide' : ''"
      class="custom-upload"
      :before-upload="beforeUpload"
      list-type="picture-card"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="previewImgDialog">
      <img :src="imgUrl" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
import { logger } from 'runjs/lib/common'
const cos = new COS({
  SecretId: 'AKID0tfGdx4zh9sFSSGqAF4f3HHqKvNbaJrF',
  SecretKey: 'DCyWrys9E7nFVpyslXFwdULFA760mNkr',
})
console.log(cos)
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [
        // { name: 'test', url: 'http://destiny001.gitee.io/image/cxk.gif' },
      ],
      previewImgDialog: false,
      imgUrl: '',
      loading:false
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      this.loading=true
      // console.log('我们自己发送请求');
      // console.log(file);
      cos.putObject(
        {
          Bucket: 'hmhr-1313341678' /* 填入您自己的存储桶，必须字段 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，例如ap-beijing，必须字段 */,
          Key: file.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          },
        },
        // function (err, data) {
        //   console.log(err || data)
        // },
        (err, data) => {
          this.loading=false
          if (err || data.statusCode !== 200) {
            return this.$message.error('亲，上传失败，请重试')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location,
          })
        },
      )
    },
    onChange(file, fileList) {
      // console.log('上传图片了',fileList);
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      console.log(file)
      this.previewImgDialog = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      // console.log('上传前的检查',file);
      //可以上传的图片类型
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('、') + '图片')
        return false
      }
      //限制上传的图片大小
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('选择的图片不能超出2mb')
        return false
      }
    },
  },
}
</script>

<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
