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
        <el-button type="primary" @click="verifyAccount">
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
        <el-input v-model="forgetData.password" placeholder="请输入新密码" show-password/>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input v-model="forgetData.repassword" placeholder="请确认密码" show-password/>
      </el-form-item>
    </el-form>
    <!-- 底部内容 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.changePasswordDialog=false">取消</el-button>
        <el-button type="primary" @click="resetPassword">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue"
import {ElMessage} from 'element-plus'
import { verify, updatePassword } from '@/api/login'

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

// 忘记密码验证邮箱
const verifyAccount = async () => {
  const res = await verify(forgetData);
  console.log(res);
  if (res.data.status === 0) {
    ElMessage.success(res.data.message);
    state.forgetPasswordDialog = false;
    state.changePasswordDialog = true;
  } else {
    ElMessage.error(res.data.message);
  }
}

// 忘记密码修改密码
const resetPassword = async () => {
  if (forgetData.password !== forgetData.repassword) {
    ElMessage.error("两次密码不相同");
    return;
  }
  const new_pwd = forgetData.password, account = forgetData.account;
  const res = await updatePassword({account, new_pwd});
  console.log(res);
  if (res.data.status !== 0) {
    ElMessage.error(res.data.message);
  } else {
    state.changePasswordDialog = false;
    ElMessage.success(res.data.message);
  }
}

defineExpose({
  open,
})
</script>

<style lang="scss" scoped>

</style>
