//inputs
const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");

//Environment Variables
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

sendPostRequest({
  a: process.env,
  g: github.event,
  c: github.context,
  //   variables: {
  //     hash: github.context.payload.head_commit,
  //     commitUrl: github.context.payload.head_commit.url,
  //     pusher: github.context.payload.head_commit.pusher.name,
  //     author: github.context.payload.head_commit.author,
  //     timestamp: github.context.payload.head_commit.timestamp,
  //     message: github.context.payload.head_commit.message, // needs to be cleaned up at the first \n
  //     commits: github.context.payload.commits, //Array
  //   },
});
