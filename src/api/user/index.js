import request from "../../utils/request";

const login = (param) => request.post("/user/login", param);
const registe = (param) => request.post("/user/registe", param);
const list = (param) => request.get("/user/list", param);

export default {
  login,
  registe,
  list,
}
