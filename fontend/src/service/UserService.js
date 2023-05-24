import axiosClient from "../api/axiosClient";

const UserService = {
    login: (datalogin) => {
        const url = "/login";
        return axiosClient.post(url, datalogin);
    },

    logOut: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem("userId");
        localStorage.removeItem("user");
    },
    
    register: (data) => {
        const url = "/register";
        return axiosClient.post(url, data);
    },

    getUserByUserName: (username) => {
        const url = "/users/";
        return axiosClient.get(url);
    },
    setUserId: (username) => {
        UserService.getUserByUserName(username).then((data) => {
            localStorage.setItem("userId", data.id);
            localStorage.setItem("user", JSON.stringify(data));
        });
    }
};

export default UserService;
