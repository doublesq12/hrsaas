<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" @click="addDialogVisible = true"
            >角色管理</el-button
          >
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button type="success" @click="showRightsDialog"
                  >分配权限</el-button
                >
                <el-button type="primary">编辑</el-button>
                <el-button type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            layout="sizes,prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="currentChange"
            :page-sizes="[3, 5, 10, 20]"
            @size-change="handelSizeChange"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input disabled v-model="companyInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                disabled
                v-model="companyInfo.companyAddress"
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled v-model="companyInfo.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input disabled v-model="companyInfo.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 添加角色对话框 -->
    <el-dialog
      title="新增角色"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="dialogClose"
    >
      <el-form
        ref="form"
        label-width="80px"
        :model="addRoleForm"
        :rules="addRoleFormRules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button c>取 消</el-button>
        <el-button type="primary" @click="onAddRole">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 给角色分配权限 -->
    <el-dialog
      title="给角色分配权限"
      :visible.sync="setRightsDialog"
      width="50%"
    >
      <el-tree
        :data="permissions"
        :props="{label:'name'}"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defaultChecKeys"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightsDialog = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi, addRoleApi } from '@/api/role'
import { getCompanyInfoApi } from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { transListToTree } from '@/utils'
export default {
  data() {
    return {
      activeName: '',
      tableData: [],
      total: 0,
      pageSize: 2,
      page: 1,
      addDialogVisible: false,
      companyInfo: '',
      addRoleForm: {
        name: '',
        description: '',
      },
      addRoleFormRules: {
        name: [{ required: true, message: '请填写部门名称', trigger: 'blur' }],
      },
      setRightsDialog: false,
      permissions: [],
      defaultChecKeys:['1', '1063315016368918528'] 
    }
  },

  created() {
    this.getRoles()
    this.getCompanyInfo()
    this.getPermissions()
  },

  methods: {
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pageSize,
      })
      this.tableData = rows
      this.total = total
    },
    currentChange(val) {
      this.page = val
      this.getRoles()
    },
    handelSizeChange(val) {
      this.pageSize = val
      this.getRoles()
    },
    onClose() {
      this.addDialogVisible = false
    },
    //点击取消
    async onAddRole() {
      await this.$refs.form.validate()
      console.log('表单校验通过，发送请求')
    },
    async onAddRole() {
      await this.$refs.form.validate()
      await addRoleApi(this.addRoleForm)
      this.$message.success('添加成功')
      this.addDialogVisible = false
      this.getRoles()
    },
    //监听对话框关闭
    dialogClose() {
      //添加成功数据重置
      this.$refs.form.resetFields()
      this.addRoleForm.description = ''
    },
    async getCompanyInfo() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId,
      )
      // console.log(res);
      this.companyInfo = res
    },
    //点击分配权限显示对话框
    showRightsDialog() {
      this.setRightsDialog = true
    },
    //获取权限列表
    async getPermissions() {
      const res = await getPermissionList()
      // console.log(res);
      const treePermission = transListToTree(res, '0')
      console.log(treePermission)
      this.permissions = treePermission
    },
  },
}
</script>

<style scoped lang="less"></style>
