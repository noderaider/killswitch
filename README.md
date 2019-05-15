# killswitch

Looks for a killswitch.json on desktop containing an array of string process names (found in details tab of task manager) and kills them all.

### Requirements

- Must be run as administrator (command prompt or shortcut).
- Requires LTS / current Node.js.

### Install

##### From npm (Recommended)

```sh
npm install -g @raider/killswitch
```

##### From Source

```sh
git clone https://github.com/noderaider/killswitch
cd killswitch
npm install
npm link .
```

### Usage

- Create a `killswitch.json` file on your desktop with something like the following:

```json
[
	"Discord.exe",
	"Razor*",
	"chrome.exe"
]
```

**Note: All standard wildcard matching is supported.**

- From an administrator command prompt (directory doesn't matter):

```sh
killswitch
```

### Other

Please shoot back PRs if you add something interesting. I'll probably add support for multiple profiles since I kill different processes when overclocking and gaming. Will probably also make the location of the `killswitch.json` file go somewhere other than desktop but not a high priority for me at the moment.

You should be able to create a Windows shortcut that points to the script and make it always run as administrator for a simple one-click solution.
