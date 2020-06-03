import request from "../../utils/request";

const deletedList = (param) => request.get("/message/deleted/list", param);

export default {
  deletedList,
}
