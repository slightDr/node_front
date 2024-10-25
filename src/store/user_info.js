import { defineStore } from "pinia";
import { getUserInfo } from "@/api/user_info.js";

export const useUserInfo = defineStore("userinfo", {
  state: () => {
    return {
      imageUrl: '',
      account: 'init',
      name: 'init',
      sex: '男',
      department: 'init',
      identity: 'init',
      email: 'init',
    }
  },
  actions: {
    async userInfo(id) {
      const res = await getUserInfo(id);
      console.log(res);
      const info = res.data.payload[0];
      this.imageUrl = info.image_url;
      this.account = info.account;
      this.name = info.name;
      this.sex = info.sex;
      this.department = info.department;
      this.identity = info.identity;
      this.email = info.email;
    }
  }
}, {
  persist: {
    enabled: true,  // 存储全部数据
    key: 'user_info',
    Storage: localStorage,
  }
})
