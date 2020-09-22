const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userShow: state => state.userInfo.show,
  userInfo: state => state.userInfo.userInfo,
  activityShow: state => state.activityInfo.show,
  activityInfo: state => state.activityInfo.activityInfo,
  activityUserInfo: state => state.activityInfo.activityUserInfo
}
export default getters
