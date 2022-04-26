const core = require("@actions/core");

const msTeamsWebhook = core.getInput("ms-teams-webhook-uri", {
  required: true,
});

(async () => {
  const rawResponse = await fetch(msTeamsWebhook, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ a: 1, b: "Textual content" }),
  });
  const content = await rawResponse.json();

  console.log(content);
})();
