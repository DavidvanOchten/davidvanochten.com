const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/offline", (req, resp) => {
  resp.set("Cache-Control", "public, max-age=300, s-maxage=600");
  resp.render("pages/offline", {
    canonical: req.originalUrl,
    title: "Are you still online?",
    description: "Offline page",
    view: "offline"
  });
});

module.exports = router;
