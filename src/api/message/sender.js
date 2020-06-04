import request from "../../utils/request";

/**
 * 收件箱列表接口
 * @param {*} param 
 */
const formalList = (param) => request.get("/sender/message/formal/list", param);

/**
 * 草稿箱列表接口
 * @param {*} param 
 */
const draftList = (param) => request.get("/sender/message/draft/list", param);

/**
 * 保存正式信息
 * @param {*} param 
 */
const saveFormal = (param) => request.post("/sender/message/save/formal", param);

/**
 * 保存草稿信息
 * @param {*} param 
 */
const saveDraft = (param) => request.post("/sender/message/save/draft", param);

/**
 * 删除发件信息
 * @param {*} param 
 */
const deleteMessage = (param) => request.delete("/sender/message/delete", param);

/**
 * 永久删除发件信息
 * @param {*} param 
 */
const realDeleteMessage = (param) => request.delete("/sender/message/real/delete", param);

/**
 * 永久删除发件信息
 * @param {*} param 
 */
const revertMessage = (param) => request.put("/sender/message/revert", param);



export default {
  draftList,
  formalList,
  saveFormal,
  saveDraft,
  deleteMessage,
  realDeleteMessage,
  revertMessage,
}
