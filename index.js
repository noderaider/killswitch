#!/usr/bin/env node

const tasklist = require("tasklist");
const taskkill = require("taskkill");
const minimatch = require("minimatch");
const path = require("path");
const chalk = require("chalk");
const figlet = require("figlet");

console.log(chalk.red(figlet.textSync("killswitch", { font: "graffiti" })));

const getTargets = () => {
  const KILLSWITCH_PATH = path.resolve(process.env["USERPROFILE"], "Desktop", "killswitch.json");
  try {
    const targets = require(KILLSWITCH_PATH);
    if (Array.isArray(targets)) {
        return targets;
    }
    console.error(`No readable file of correct array format exists at: ${KILLSWITCH_PATH}\nCreate a file on desktop named killswitch.json containing a single array of process names. Supports wildcards.`);
    process.exit(1);
  } catch(err) {
    console.error(`No readable file exists at: ${KILLSWITCH_PATH}\nCreate a file on desktop named killswitch.json containing a single array of process names. Supports wildcards.`);
    process.exit(1);
  }
}

const targets = getTargets();

const targetFilter = task => targets.some(target => {
  try {
    return minimatch(task.imageName, target);
  } catch(err) {
    console.error(`Error occurred filtering task "${task.imageName}" with target "${target}"`);
    process.exit(1);
  }
});

const work = async () => {
  const tasks = await tasklist();
  const hits = tasks.filter(targetFilter);

  console.log("CONTRACTING HITS...");
  console.log(hits.map(task => `\t${task.imageName}`).join("\n"));
  console.log(chalk.red(figlet.textSync("engage", { font: "graffiti" })));

  const pids = hits.map(task => task.pid);

  try {
    await taskkill(pids, { force: true, tree: true });
    console.log(`${pids.length} tasks murdered.`)
  } catch(err) {
    if (err.message.includes("Access is denied")) {
      console.error("I can't kill anything if you don't give me the privilege...");
      process.exit(1);
    } else {
      throw err;
    }
  }

};

work();