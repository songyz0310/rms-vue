import request from "../utils/request";

const login = (param) => request.post("/user/login", param);

export default {
    login
}