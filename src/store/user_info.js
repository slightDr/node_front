import { defineStore } from "pinia";
import { getUserInfo } from "@/api/user_info.js";

export const useUserInfo = defineStore("userinfo", {
  state: () => {
    return {
      imageUrl: '',
      name: '',
      sex: '',
      department: '',
      identity: '',
    }
  },
  actions: {
    async userInfo(id) {
      console.log("store:", id);
      const res = await getUserInfo(id);
      console.log(res);
    }
  }
}, {
  persist: {
    enabled: true,  // 存储全部数据
    key: 'user_info',
    Storage: localStorage,
  }
})
