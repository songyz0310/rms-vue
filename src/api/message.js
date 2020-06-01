import request from "../utils/request";

const recipientList = (param) => request.get("/message/recipient/list", param);
const sendList = (param) => request.get("/message/send/list", param);
const createFormalMessage = (param) => request.post("/message/create/formal", param);
const createDraftMessage = (param) => request.post("/message/create/draft", param);

export default {
    recipientList,
    sendList,
    createFormalMessage,
    createDraftMessage,
}