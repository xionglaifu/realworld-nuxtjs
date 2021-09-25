/*
 * @Description:
 * @Author: xionglaifu
 * @Date: 2021-09-24 16:02:50
 * @LastEditors: xionglaifu
 * @LastEditTime: 2021-09-24 16:09:40
 * @company: formssi
 */
export default function({ store, redirect }) {
  // If the user is authenticated redirect to home page
  if (store.state.user) {
    return redirect('/')
  }
}
