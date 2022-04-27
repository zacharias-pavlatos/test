//inputs
const core = require("@actions/core");
const github = require("@actions/github");
//const octokit = github.getOctokit();

const axios = require("axios");

const main = async () => {
  const sha = core.getInput("sha", { required: true });
  const octokit = github.getOctokit(token);
  const context = github.context;
  const result = await octokit.rest.repos.listPullRequestsAssociatedWithCommit({
    owner: context.repo.owner,
    repo: context.repo.repo,
    commit_sha: sha,
  });
};

main();
//Environment Variables
//const token = core.getInput("github-token");
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
    //const result =
    // await octokit.rest.repos.listPullRequestsAssociatedWithCommit({
    //   owner: context.repo.owner,
    //   repo: context.repo.repo,
    //   commit_sha: sha,
    // });

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
  // hash: github.context.payload.head_commit.id,
  // commitUrl: github.context.payload.head_commit.url,
  // pusher: github.context.payload.pusher.name,
  // author: github.context.payload.head_commit.author,
  // timestamp: github.context.payload.head_commit.timestamp,
  // title: github.context.payload.head_commit.message.split("\n")[0],
  // message: github.context.payload.head_commit.message.split("\n")[1],
  // commits: github.context.payload.commits,
  //
  // "GITHUB_REF": "refs/pull/34/merge",
  // "GITHUB_REF_NAME": "34/merge",
  // prNumber: github.context.payload.number, //34
  // prUrl: github.context.payload.pull_request._links.html.href, //"https://github.com/zacharias-pavlatos/test/pull/34"
  data: {
    github,
    process: process.env,
    // result,
  },
});
