const core = require("@actions/core");

const msTeamsWebhook = core.getInput("ms-teams-webhook-uri", {
  required: true,
});

console.log("eeee Ela mwre", msTeamsWebhook);
