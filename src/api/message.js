import request from "../utils/request";

const recipientList = (param) => request.get("/message/recipient/list", param);
const sendedList = (param) => request.get("/message/send/list", param);
const createFormalMessage = (param) => request.post("/message/create/formal", param);
const createDraftMessage = (param) => request.post("/message/create/draft", param);

export default {
    recipientList,
    sendedList,
    createFormalMessage,
    createDraftMessage,
}