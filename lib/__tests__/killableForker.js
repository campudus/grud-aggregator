"use strict";

var start = require("../../lib/aggregationProcess").start;
var longRunningAggregator = "".concat(__dirname, "/killableForkerAggregator.js");
var aggregatorPid, parentPid;
process.on("message", function (message) {
  if (/^\d+$/.test(message)) {
    parentPid = message;
    start({
      aggregatorFile: longRunningAggregator,
      pid: parentPid,
      progress: function progress(p) {
        if (/^\d+/.test(p.message)) {
          aggregatorPid = p.message;
          process.kill(aggregatorPid, "SIGHUP");
        }
        process.send(p.message);
      }
    });
  }
});
process.send("INIT");