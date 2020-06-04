import request from "../../utils/request";

const deletedList = (param) => request.get("/message/deleted/list", param);
const detail = (param) => request.get("/message/detail", param);

export default {
  deletedList,
  detail,
}
