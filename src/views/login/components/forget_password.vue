<template>
  <el-dialog
    v-model="state.forgetPasswordDialog"
    title="忘记密码"
    width="400px"
  >
    <el-form class="login-form" :label-position="labelPosition" :rules="rules">
      <el-form-item label="账号" prop="account">
        <el-input v-model="forgetData.account" placeholder="请输入账号"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="forgetData.email" placeholder="请输入邮箱"/>
      </el-form-item>
    </el-form>
    <!-- 底部内容 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.forgetPasswordDialog = false">取消</el-button>
        <el-button type="primary" @click="openChangePassword">
          下一步
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog
    v-model="state.changePasswordDialog"
    title="修改密码"
    width="400px"
  >
    <el-form class="login-form" :label-position="labelPosition" :rules="rules">
      <el-form-item label="新密码" prop="password">
        <el-input v-model="forgetData.account" placeholder="请输入新密码"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input v-model="forgetData.email" placeholder="请确认密码"/>
      </el-form-item>
    </el-form>
    <!-- 底部内容 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.changePasswordDialog=false">取消</el-button>
        <el-button type="primary" @click="state.changePasswordDialog=false">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue"

const labelPosition = ref("top")

interface forgetData {  // 表单对象接口
  account: number;
  email: string;
  password: string;
  repassword: string;
}

const forgetData: forgetData = reactive({  // 表单对象
  account: null,
  email: "",
  password: "",
  repassword: "",
})
const rules = reactive({
  account: [
    {required: true, message: '请输入注册账号', trigger: 'blur'},
  ],
  email: [
    {required: true, message: '请输入注册邮箱', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入新密码', trigger: 'blur'},
  ],
  repassword: [
    {required: true, message: '请输入确认密码', trigger: 'blur'},
  ],
})
const state = reactive({  // 控制弹窗默认关闭
  forgetPasswordDialog: false,
  changePasswordDialog: false,
})

const open = () => {  // 打开弹窗
  state.forgetPasswordDialog = true;
}

const openChangePassword = () => {
  state.forgetPasswordDialog = false;
  state.changePasswordDialog = true;
}

defineExpose({
  open,
})
</script>

<style lang="scss" scoped>

</style>
