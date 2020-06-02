import request from "../utils/request";

const recipientList = (param) => request.get("/message/recipient/list", param);
const sendedList = (param) => request.get("/message/sended/list", param);
const draftList = (param) => request.get("/message/draft/list", param);
const rubbishList = (param) => request.get("/message/rubbish/list", param);
const deletedList = (param) => request.get("/message/deleted/list", param);

const createFormalMessage = (param) => request.post("/message/create/formal", param);
const createDraftMessage = (param) => request.post("/message/create/draft", param);
const deleteRecipientMessage = (param) => request.delete("/message/delete/recipient", param);
const realDeleteRecipientMessage = (param) => request.delete("/message/delete/recipient/real", param);
const deleteMessage = (param) => request.delete("/message/delete", param);

export default {
  recipientList,
  sendedList,
  draftList,
  rubbishList,
  deletedList,
  createFormalMessage,
  createDraftMessage,
  deleteRecipientMessage,
  realDeleteRecipientMessage,
  deleteMessage,
}
