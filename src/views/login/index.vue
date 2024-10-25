<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header_wrapped">
        <div class="header-content">
          <h3>通用后台管理系统</h3>
          <span class="welcome">欢迎您的登录</span>
        </div>
      </el-header>
      <el-main>
        <div class="login-wrapped">
          <el-card class="box-card">
              <el-tabs v-model="activeName" class="demo-tabs" :stretch="true">
                <el-tab-pane label="登录" name="first">
                  <el-form class="login-form">
                    <el-form-item label="账号">
                      <el-input v-model="loginData.account" placeholder="请输入账号"/>
                    </el-form-item>
                    <el-form-item label="密码">
                      <el-input v-model="loginData.password" placeholder="请输入密码" show-password/>
                    </el-form-item>

                    <div class="footer-wrapped">
                      <div class="forget-password">
                        <span class="forget-password-button"
                              @click="openForgetPassword">
                          忘记密码
                        </span>
                      </div>
                    </div>

                    <div class="footer-button">
                      <el-button type="primary" @click="clickLogin">登录</el-button>
                    </div>

                    <div class="footer-go-register">
                      还没有账号?
                      <span class="go-register">
                        马上注册
                      </span>
                    </div>
                  </el-form>
                </el-tab-pane>

                <el-tab-pane label="注册" name="second">
                  <el-form class="login-form">
                    <el-form-item label="账号">
                      <el-input v-model="registerData.account" placeholder="账号长度6-10位"/>
                    </el-form-item>
                    <el-form-item label="密码">
                      <el-input v-model="registerData.password" placeholder="密码长度6-12位, 含字母数字" show-password/>
                    </el-form-item>
                    <el-form-item label="确认密码">
                      <el-input v-model="registerData.repassword" placeholder="重复输入密码" show-password/>
                    </el-form-item>

                    <div class="footer-button">
                      <el-button type="primary" @click="clickRegister">注册</el-button>
                    </div>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
          </el-card>
        </div>
      </el-main>
      <el-footer class="footer-wrapped">
        <div class="footer-content">
          <div class="title">
            <span>阿里云博客专家</span> |
            <span>阿里云博客专家</span> |
            <span>阿里云博客专家</span>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
  <forget ref="forgetPassword"></forget>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { ElMessage } from 'element-plus'
  import forget from "./components/forget_password.vue"
  import { register, login } from "@/api/login.js"
  import { useRouter } from "vue-router";
  import { useUserInfo } from '@/store/user_info';

  const activeName = ref('first');

  // 表单接口
  interface formData {
    account: number;
    password: string;
    repassword ?: string;  // ?: 可以没有该参数
  };

  // 登录表单数据
  const loginData: formData = reactive({
    account: null,
    password: '',
  });

  // 注册表单数据
  const registerData = reactive({
    account: null,
    password: "",
    repassword: "",
  })

  // 打开忘记密码窗口
  const forgetPassword = ref()
  const openForgetPassword = () => {
    forgetPassword.value.open();
  }

  // 调后端注册用户
  const clickRegister = async () => {
    if (registerData.password === registerData.repassword) {
      const res = await register(registerData);
      console.log(res);
      ElMessage({
        message: res.data.message,
        type: res.data.status === 0 ? 'success' : 'error',
      });
      if (res.data.status === 0) {
        activeName.value = 'first'
      }
    } else {
      ElMessage.error("两次密码不一致")
    }
  }

  // 点击登录
  const router = useRouter();
  const store = useUserInfo();
  const clickLogin = async () => {
    const res = await login(loginData);
    console.log(res);
    const { id } = res.data.result;
    ElMessage({
      message: res.data.message,
      type: res.data.status === 0 ? 'success' : 'error',
    });
    if (res.data.status === 0) {
      const { token } = res.data;
      localStorage.setItem('token', token);
      store.userInfo(id);
      // 跳转
      await router.push('/home');
    }
  }


</script>

<style lang="scss" scoped>
  //外壳
  .header_wrapped {
    .header-content {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .welcome {
        font-size: 13px;
      }
    }
  }

  //主体部分
  .el-main{
    background-image: url("@/assets/logo.svg");
    height: 600px;
    --el-main-padding: 0;
    .login-wrapped {
      width: 1200px;
      height: 600px;
      margin: 0 auto;

      .box-card {
        width: 350px;
        height: 375px;
        float: right;
        position: relative;
        top: 14px;

        .login-form {
          .footer-wrapped {
            display: flex;
            flex-direction: column;

            .forget-password {
              display: flex;
              justify-content: flex-end;
              margin-top: 10px;
              .forget-password-button {
                font-size: 12px;
                color: #409eff;
                cursor: pointer;
              }
            }
          }
          .footer-button {
            width: 100%;
            display: flex;
            justify-content: center;
          }

          .footer-go-register {
            font-size: 12px;
            margin: 12px 0;
            display: flex;
            justify-content: center;

            .go-register {
                font-size: 12px;
                color: #409eff;
                cursor: pointer;  // 鼠标移入效果
            }
          }
        }
      }
    }
  }

  //脚注外壳
  .footer-wrapped {
    margin-top: 10px;
    .footer-content {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .span {
        color: #666;
        font-size: 12px;
      }
      .title {
        color: #666;
      }
    }
  }

  //表单边距
  .el-form {
    margin-top: 30px;
  }

  //tabs标签
  :deep(.el-tabs__item) {
    color: #333;
    font-size: 18px;
  }

  //输入框高度
  :deep(.el-input__inner) {
    height: 40px;
  }

  //输入框标签字体高度
  :deep(.el-form-item__label) {
    height: 40px;
    line-height: 40px;
  }

  //登录按钮
  :deep(.el-button) {
    width: 300px;
    height: 40px;
    font-size: 16px;
  }
</style>
