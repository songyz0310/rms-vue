import request from "../../utils/request";

const goodslist = (param) => request.get("/goods/list", param);
const createApply = (param) => request.post("/goods/create/apply", param);

export default {
    goodslist,
    createApply,
}
