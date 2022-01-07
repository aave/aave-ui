const stats = require('../stats.json');
const masterStats = require('../stats_master.json');

module.exports = async ({ github, context }) => {
  if (context.eventName === 'pull_request') {
    const masterMainChunk = masterStats.results.find((chunk) => /js\/main/.test(chunk.bundleName));
    const masterMB = masterMainChunk.totalBytes / 1024 / 1024;

    const currentMainChunk = stats.results.find((chunk) => /js\/main/.test(chunk.bundleName));
    const currentMB = currentMainChunk.totalBytes / 1024 / 1024;

    const diff = currentMB - masterMB;
    await github.rest.issues.createComment({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: `Bundle size change: ${diff} MB`,
    });
  }
};
