import instance from "@/http/index.js";

export const getUserInfo = id => {
  // const { id } = data;
  console.log("api: ", id);
  return instance({
    url: '/user/getUserInfo',
    method: 'POST',
    data: { id, }
  })
}
