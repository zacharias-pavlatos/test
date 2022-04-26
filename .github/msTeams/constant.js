import * as core from "@actions/core";

export const workflow = process.env.GITHUB_WORKFLOW;
export const repository = process.env.GITHUB_REPOSITORY;
export const branch = process.env.GITHUB_REF;
export const githubEventPayloadFile =
  process.env.GITHUB_EVENT_PATH || defaultJsonPath;
export const triggerEventName = process.env.GITHUB_EVENT_NAME;
export const eventName =
  core.getInput("event_id") || triggerEventName || "event";
export const status = core.getInput("job_status");
