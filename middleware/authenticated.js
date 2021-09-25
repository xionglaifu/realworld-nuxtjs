/*
 * @Description:
 * @Author: xionglaifu
 * @Date: 2021-09-24 16:01:46
 * @LastEditors: xionglaifu
 * @LastEditTime: 2021-09-24 16:01:46
 * @company: formssi
 */
/**
 * 验证是否登录的中间件
 */
export default function({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.user) {
    return redirect('/login')
  }
}
