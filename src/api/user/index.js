import request from "../../utils/request";

const login = (param) => request.post("/user/login", param);
const list = (param) => request.get("/user/list", param);

export default {
  login,
  list,
}
