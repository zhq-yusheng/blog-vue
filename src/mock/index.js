import Mock from "mockjs";

let menu = require("../../menu.json")

Mock.setup({
    timeout: '200 - 400'
  });

Mock.mock('/menu', 'post', menu);