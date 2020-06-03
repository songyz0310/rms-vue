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
 * 创建正式信息
 * @param {*} param 
 */
const createFormal = (param) => request.post("/sender/message/create/formal", param);

/**
 * 创建草稿信息
 * @param {*} param 
 */
const createDraft = (param) => request.post("/sender/message/create/draft", param);

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
const revertMessage = (param) => request.delete("/sender/message/revert", param);






export default {
  draftList,
  formalList,
  createFormal,
  createDraft,
  deleteMessage,
  realDeleteMessage,
  revertMessage,
}
