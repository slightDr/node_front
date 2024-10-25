<template>
  <div class="common-layout">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-col :span="24">
          <div class="title">
            通用后台管理系统
          </div>
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            text-color="#fff"
            router
          >
            <el-menu-item index="home">
              <el-icon><House /></el-icon>
              <span>首页</span>
            </el-menu-item>

            <el-menu-item index="2">
              <el-icon><Document /></el-icon>
              <span>系统概览</span>
            </el-menu-item>

            <el-sub-menu index="3">
              <template #title>
                <el-icon><User /></el-icon>
                <span>用户管理</span>
              </template>
              <el-menu-item-group title="管理员">
                <el-menu-item index="3-1">产品管理员</el-menu-item>
                <el-menu-item index="3-2">用户管理员</el-menu-item>
                <el-menu-item index="3-3">消息管理员</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="员工">
                <el-menu-item index="3-4">员工列表</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu index="4">
              <template #title>
                <el-icon><Box /></el-icon>
                <span>产品管理</span>
              </template>
              <el-menu-item-group title="入库管理">
                <el-menu-item index="4-1">产品列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="出库管理">
                <el-menu-item index="4-2">出库列表</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu index="5">
              <template #title>
                <el-icon><Message /></el-icon>
                <span>消息管理</span>
              </template>
              <el-menu-item-group title="消息">
                <el-menu-item index="4-1">消息列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="回收站">
                <el-menu-item index="4-2">回收站</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-menu-item index="6">
              <el-icon><icon-menu /></el-icon>
              <span>合同管理</span>
            </el-menu-item>

            <el-menu-item index="7">
              <el-icon><icon-menu /></el-icon>
              <span>操作日志</span>
            </el-menu-item>

            <el-menu-item index="8">
              <el-icon><icon-menu /></el-icon>
              <span>登录日志</span>
            </el-menu-item>

            <el-menu-item index="set">
              <el-icon><Tools /></el-icon>
              <span>系统设置</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>

      <el-container class="header-main">
        <!-- 头部 -->
        <el-header>
          <div class="header-left-content">
            尊敬的 yhb 欢迎您登录本系统
          </div>
          <div class="header-right-content">
            <el-icon :size="20"><Message/></el-icon>
            <el-avatar :size="24" :src="userStore.imageUrl"></el-avatar>
            <el-dropdown>
              <span class="el-dropdown-link">
                设置
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>更改头像</el-dropdown-item>
                  <el-dropdown-item>设置账号</el-dropdown-item>
                  <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>

        <!-- 主体 -->
        <el-main width="1200px">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import {
  Document,
  House,
  Menu as IconMenu, Message, User,
} from '@element-plus/icons-vue'
// import { reactive, toRefs, ref } from 'vue'
import { useRouter } from "vue-router";
import { useUserInfo } from "@/store/user_info"

const userStore = useUserInfo()

// 退出登录
const router = useRouter();
const logout = () => {
  router.push('/login');
}
</script>

<style lang="scss" scoped>
  .el-container {
    width: 100%;
    height: 100%;
  }

  .el-main {
    --el-main-padding: 0;
    background-color: #f3f4fa;
  }

  .el-aside {
    height: 100vh;
    .title {
      padding: 20px;
      display: flex;
      justify-content: center;
      color: #fff;
      background-color: #545c64;
    }
  }

  .header-main {
    width: 1200px;

    .el-header {
      display: flex;
      height: 55px;
      background: #545c64;
      color: #c1c6c8;
      align-items: center;
      justify-content: space-between;
      // 欢迎语
      .header-left-content {
        font-size: 14px;
      }
      // 右边部分
      .header-right-content {
        width: 160px;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }

  .el-menu-item:hover {
    background-color: #006eff;
  }
  :deep(.el-sub-menu__title:hover) {
    background-color: #006eff;
  }
</style>
