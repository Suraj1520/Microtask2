const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/api",  function (req, res) {
  if (req.url === "/favicon.icon") {
    res.end();
  }

 const json = fs.readFileSync("count.json", "utf-8");
 const obj = JSON.parse(json);

 obj.pageviews = obj.pageviews + 1;
 if (req.query.type == "visit-pageview") {
   obj.visits = obj.visits + 1;
 }

 const newJSON = JSON.stringify(obj);

 fs.writeFileSync("count.json", newJSON);
 res.send(newJSON);
  
});

module.exports = router;