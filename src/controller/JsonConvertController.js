const express = require("express");
const JsonToTS = require("json-to-ts");
const JsonToGo = require("json-to-go");
const jsonToJavaBean = require("../common/jsonToJavaBean");
const fs = require("fs");

const router = express.Router();

/**
 * JSON 转换为Typescript
 */
router.post("/jsonToTS", (req, res) => {
  // 获取POST请求体中的数据
  let json = req.body;
  console.log(json);
  if (!json) {
    res.send("JSON不能为空");
    return;
  }

  let content = "";
  JsonToTS(json).forEach((typeInterface) => {
    content += "export " + typeInterface + "\n";
  });
  res.send(content);
});
/**
 * JSON 转换为GO
 */
router.post("/jsonToGO", (req, res) => {
  // 获取POST请求体中的数据
  let json = req.body;
  if (!json) {
    res.send("JSON不能为空");
    return;
  }

  const convert = JsonToGo(JSON.stringify(json), "", true, false, false);
  res.send(convert.go);
});

router.post("/jsonToJava", (req, res) => {
  // 获取POST请求体中的数据
  let { json, package } = req.body;
  if (!json) {
    res.send("JSON不能为空");
    return;
  }

  const convert = jsonToJavaBean(json, package);
  res.send(convert);
});

module.exports = router;
