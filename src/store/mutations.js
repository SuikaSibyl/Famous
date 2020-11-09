export default {
    login(state, userinfo) {
        state.userInfo = userinfo;
    },
    setInfo(state) {
        state.userInfo = {
            name: cookie.getCookie("name"),
            token: cookie.getCookie("token"),
        };
        console.log(state.userInfo);
    },
};
