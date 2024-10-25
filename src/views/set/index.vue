<template>
  <breadCrumb ref="bread_crumb" :item="item"></breadCrumb>
  <!-- 外壳 -->
  <div class="common-wrapped">
    <!-- 内容 -->
    <div class="common-content">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="账号详情" name="first">
          <div class="account-info-wrapped">
            <span>用户头像：</span>
            <div class="account-info-content">
              <!-- action: 上传头像 -->
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:3000/user/uploadAvatar"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="userStore.imageUrl" :src="userStore.imageUrl" class="avatar"/>
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus/>
                </el-icon>
              </el-upload>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户账号：</span>
            <div class="account-info-content">
              <el-input v-model="userStore.account" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户密码：</span>
            <div class="account-info-content">
              <el-button type="primary">修改密码</el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户姓名：</span>
            <div class="account-info-content">
              <el-input v-model="userStore.name"></el-input>
            </div>
            <div>
              <el-button type="primary" class="account-save-button">保存</el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户性别：</span>
            <div class="account-info-content">
              <el-select v-model="userStore.sex" placeholder="选择性别">
                <el-option label="男" value="man" />
                <el-option label="女" value="woman" />
              </el-select>
            </div>
            <div>
              <el-button type="primary" class="account-save-button">保存</el-button>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户身份：</span>
            <div class="account-info-content">
              <el-input v-model="userStore.identity" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户部门：</span>
            <div class="account-info-content">
              <el-input v-model="userStore.department" disabled></el-input>
            </div>
          </div>
          <div class="account-info-wrapped">
            <span>用户邮箱：</span>
            <div class="account-info-content">
              <el-input v-model="userStore.email"></el-input>
            </div>
            <div>
              <el-button type="primary" class="account-save-button">保存</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">Config</el-tab-pane>
        <el-tab-pane label="首页管理" name="third">Role</el-tab-pane>
        <el-tab-pane label="其他设置" name="fourth">Task</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import breadCrumb from '@/components/bread_crumb.vue'
import type {TabsPaneContext, UploadProps} from 'element-plus'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useUserInfo } from '@/store/user_info'
import { bindAccount } from '@/api/user_info'

const bread_crumb = ref()
const item = ref({
  first: "系统设置",
})

// 默认打开标签页
const activeName = ref('first')

// 头像上传成功函数
const userStore = useUserInfo()
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
) => {
  console.log(response);
  if (response.status === 0) {
    userStore.$patch({
      imageUrl: response.image_url,
    })
    (async () => {
      await bindAccount(response.only_id, userStore.account, response.image_url);
    }) ()
    ElMessage.success("更新头像成功");

  } else {
    ElMessage.error("更新头像失败，请重新上传");
  }
}

// 头像上传前函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

// 账号
const acount_detail = reactive({
  account: "",
  name: "",
  sex: "",
  identity: "",
  department: "",
  email: "",
})

</script>

<style scoped lang="scss">
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.common-wrapped {
  padding: 8px;
  background: #f5f5f5;
  height: calc(100vh - 85px);

  .common-content {
    padding: 0 10px;
    height: 100%;
    background: #fff;

    .account-info-wrapped {
      display: flex;
      align-items: center;
      padding-left: 50px;
      margin-bottom: 24px;
      color: #000;
      font-size: 16px;
      .account-info-content {
        margin-left: 24px;
        margin-right: 16px;
        width: 240px;
      }
      .account-save-button {
        margin-left: 16px;
      }
    }
  }

  //:deep(.el-input) {
  //  width: 240px;
  //  margin: 0, ;
  //}
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
