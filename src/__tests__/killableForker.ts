const start = require("../../lib/aggregationProcess").start;

const longRunningAggregator = `${__dirname}/killableForkerAggregator.js`;
var aggregatorPid, parentPid;

process.on("message", (message: string) => {
  if (/^\d+$/.test(message)) {
    parentPid = message;
    start({
      aggregatorFile: longRunningAggregator,
      pid: parentPid,
      progress: (p) => {
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
