#!/usr/bin/env node

const axios = require("axios");
const execa = require("execa");

const CRITICAL_PERCENTAGE = 95;
const WARNING_PERCENTAGE = 90;
const MAX_SIZE = 950000000000;

const post = msg =>
  axios.post(
    "https://hooks.slack.com/services/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",
    {
      text: msg
    }
  );

const getCurrentDBServerSize = () =>
  execa("psql", [
    "-d",
    "postgres",
    "-A",
    "-t",
    "-c",
    "SELECT SUM(pg_database_size(t1.datname) FROM pg_database t1"
  ]);

(async () => {
  const cur_size = parseInt(await getCurrentDBServerSize());

  console.log(cur_size);

  const cur_percentage = parseInt((cur_size / MAX_SIZE) * 100);

  if (cur_percentage >= CRITICAL_PERCENTAGE) {
    const crit_msg = `*Critical*: database server is at ${cur_percentage}% capacity!`;

    post(crit_msg);

    return console.error(crit_msg);
  }

  if (cur_percentage >= WARNING_PERCENTAGE) {
    const warn_msg = `*Warning*: database server is at ${cur_percentage}% capacity.`;

    post(warn_msg);

    return console.warn(warn_msg);
  }
})();
