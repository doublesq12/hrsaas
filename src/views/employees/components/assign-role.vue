<template>
  <el-dialog :visible="visible" title="分配角色" @close="close" @open="onOpen">
    <el-checkbox-group v-model="checkList">
      <el-checkbox :label="item.id" v-for="item in roles" :key="item.id">
        {{item.name}}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="assignRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {getRolesApi} from '@/api/role'
import {getUserDetail} from '@/api/user'
import {assignRoles} from '@/api/employees'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    employeesId:{
      type:String,
      required:true
    }
  },
  data() {
    return {
      checkList: [],
      roles:[]
    }
  },

  created() {},

  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    //获取角色列表
    async getRolesList(){
      const {rows}=await getRolesApi()
      // console.log(roles);
      this.roles=rows
    },
    //监听对话框打开
    onOpen(){
      this.getRolesList()
      this.getEmployeesRoles()
    },
    //获取员工角色
    async getEmployeesRoles(){
      const{roleIds}=await getUserDetail(this.employeesId)
      console.log(roleIds);
      this.checkList=roleIds
    },
    //分配角色
    async assignRole(){
      if(!this.checkList.length)return this.$message.error('请选择角色')
      console.log(this.checkList);
     await assignRoles({
        id:this.employeesId,
        roleIds:this.checkList
      })
      this.$message.success('分配成功')
      this.close()
    }
  },
}
</script>

<style scoped></style>
