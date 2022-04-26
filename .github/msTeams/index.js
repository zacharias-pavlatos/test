const core = require("@actions/core");
const axios = require("axios");
const msTeamsWebhook = core.getInput("ms-teams-webhook-uri", {
  required: true,
});

const msTeamsCard = {
  "@type": "MessageCard",
  "@context": "https: //schema.org/extensions",
  themeColor: "0078D7",
  summary: "notificationSummary",
  title: "${{ env.commitMsg }}",
  sections: [
    {
      activityTitle: "${{ env.authorName }}",
      activityImage: "avatar_url",
      activitySubtitle: "sdf",
    },
  ],
  potentialAction: [
    {
      "@context": "http: //schema.org",
      target: "ssdfsdfs",
      "@type": "ViewAction",
      name: "View Workflow Run",
    },
    {
      "@context": "http: //schema.org",
      target: "[commit.data.html_url]",
      "@type": "ViewAction",
      name: "View Commit Changes",
    },
  ],
};

const sendPostRequest = async (msTeamsCard) => {
  try {
    const response = await axios.post(msTeamsWebhook, msTeamsCard, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    core.debug(response.data);
  } catch (error) {
    console.error(error);
  }
};

sendPostRequest();
