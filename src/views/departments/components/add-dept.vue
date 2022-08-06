<template>
  <el-dialog
    :title="diologTitle"
    :visible="visible"
    width="50%"
    @close="onClose"
  >
    <!-- <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button>取 消</el-button>
    <el-button type="primary">确 定</el-button>
  </span> -->
    <el-form
      ref="form"
      label-width="100px"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          placeholder="请输入部门名称"
          v-model="formData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          placeholder="请输入部门编码"
          v-model="formData.code"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <!-- <el-input placeholder="请输入部门负责人"></el-input> -->
        <el-select
          placeholder="请输入部门负责人"
          style="width: 100%"
          v-model="formData.manager"
        >
          <el-option
            :label="item.username"
            :value="item.username"
            v-for="item in employees"
            :key="item.id"
          ></el-option>
          <!-- <el-option label="李四" value="beijing"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <!-- <el-input placeholder="请输入部门介绍"></el-input> -->
        <el-input
          type="textarea"
          placeholder="请输入部门介绍"
          v-model="formData.introduce"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDeptsApi,addDeptApi,getDeptById ,editDeptsApi} from '@/api/departments'
import{getEmployeesApi} from '@/api/employees'
export default {
  data() {
    const checkDeptName = async(rule, value, callback) => {
      if(this.formData.id){
        const { depts } = await getDeptsApi()
        const filterDepts=depts.filter(
          (item)=>item.pid===this.formData.pid&&item.id!==this.formData.id
        )
        const isRepeat=filterDepts.some((item)=>item.name===value)
        isRepeat ? callback(new Error('部门重复')) : callback()
      }else{
if(!this.currentNode.children)return callback()
      // console.log(this.currentNode);
      const isRepeat = this.currentNode.children.some(
        (item) => item.name === value
      )
      isRepeat ? callback(new Error('部门重复')) : callback()
      }

    }
    const checkDeptCode = async (rule, value, callback) => {
      const { depts } = await getDeptsApi()
      let isRepeat
      if(this.formData.id){
        isRepeat = depts.filter((item)=>item.id!==this.formData.id).some((item) => item.code === value)
      }else{
        isRepeat=depts.some((item) => item.code === value)
      }
      isRepeat ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
      },
      employees:[],
      formRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { validator: checkDeptName, trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          { validator: checkDeptCode, trigger: 'blur' },
        ],
        manager: [
          { required: true, message: '请输入部门负责人', trigger: 'change' },
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' },
        ],
      },
    }
  },
  props: {
    visible: {
      tye: Boolean,
      required: true,
    },
    currentNode: {
      type: Object,
      required: true,
    },
  },

  created() {
    this.getEmployeesList()
  },

  methods: {
   async getEmployeesList(){
    const res=await getEmployeesApi()
    // console.log(res);
    this.employees=res
    },
    onClose(){
      this.$emit('update:visible',false)
      this.$refs.form.resetFields()
      this.formData={
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
      }

    },
    async onSave(){
      await this.$refs.form.validate()
      try {
        if(this.formData.id){
          await editDeptsApi(this.formData)
          this.$message.success('编辑成功')
          this.onClose()
          this.$emit('add-success')
        }else{
this.formData.pid=this.currentNode.id
  await addDeptApi(this.formData)
        this.$message.success('新增部门成功')
        this.onClose()
        this.$emit('add-success')
        }

      } catch (error) {
        this.$message.error('操作部门失败')
      
    }
  },


    async getDeptById(id){
      // console.log(id);
      this.formData=await getDeptById(id)
    }
  },
  computed:{
    diologTitle(){
      return this.formData.id?'编辑部门':'添加部门'
    }
  }

}
</script>

<style scoped></style>
