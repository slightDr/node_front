import instance from "@/http/index.js"

// 注册接口
export const register = data => {
  const { account, password } = data
  return instance({
    url: '/api/register',
    method: 'post',
    data: { account, password }
  })
}

// 登录接口
export const login = data => {
  const { account, password } = data
  return instance({
    url: '/api/login',
    method: 'post',
    data: { account, password }
  })
}

// 忘记密码验证
export const verify = data => {
  const { account, email } = data;
  return instance({
    url: '/user/verifyAccountEmail',
    method: 'post',
    data: { account, email }
  });
};

// 重置密码
export const updatePassword = data => {
  const { account, new_pwd } = data;
  return instance({
    url: '/user/updateUserPassword',
    method: 'post',
    data: { account, new_pwd }
  });
}
