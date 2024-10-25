import instance from "@/http/index.js";

// 获取用户信息
export const getUserInfo = id => {
  return instance({
    url: '/user/getUserInfo',
    method: 'POST',
    data: { id, }
  })
}

// 修改姓名
export const updateUserName = (id, name) => {
  return instance({
    url: '/user/updateUserName',
    method: 'POST',
    data: { id, name, }
  })
}

// 修改性别
export const updateUserSex = (id, sex,) => {
  return instance({
    url: '/user/updateUserSex',
    method: 'POST',
    data: { id, sex, }
  })
}

// 修改邮箱
export const updateUserEmail = (id, email,) => {
  return instance({
    url: '/user/updateUserEmail',
    method: 'POST',
    data: { id, email, }
  })
}

export const bindAccount = (only_id, account, url,) => {
  return instance({
    url: '/user/bindAccount',
    method: 'POST',
    data: { only_id, account, url },
  })
}

// 修改密码
export const updatePassword = (id, old_pwd, new_pwd,) => {
  return instance({
    url: '/user/updatePassword',
    method: 'POST',
    data: { id, old_pwd, new_pwd, }
  })
}
