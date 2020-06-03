import request from "../../utils/request";


const formalList = (param) => request.get("/receiver/message/formal/list", param);
const rubbishList = (param) => request.get("/receiver/message/rubbish/list", param);
const deleteMessage = (param) => request.delete("/receiver/message/delete", param);
const realDeleteMessage = (param) => request.delete("/receiver/message/real/delete", param);
const markMessage = (param) => request.put("/receiver/message/mark", param);
const revertMessage = (param) => request.put("/receiver/message/revert", param);


export default {
  formalList,
  rubbishList,
  deleteMessage,
  realDeleteMessage,
  markMessage,
  revertMessage,
}
