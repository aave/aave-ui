/**
 * Whenever a pr is merged to master the ci will take a snapshot of the sourcemaps generated.
 * When a pr is created or a commit is pushed the ci will:
 * 1. download that snapshot `stats_head.json`
 * 2. create a new snapshot based on current build `stats.json`
 * Try to do a reasonable comparison.
 *
 * For now the ci will only compare the "main" chunk that is loaded by all users in all cases.
 * We might wanna refine that down the road.
 *
 * When the diff is >1kb, the ci will comment the bundle size difference.
 */
module.exports = async ({ github, context }) => {
  const stats = require(`../stats-${process.env.HEAD}.json`);
  const headStats = require(`../stats-${process.env.BASE}.json`);
  const masterMainChunk = headStats.results.find((chunk) => /js\/main/.test(chunk.bundleName));
  const masterMB = masterMainChunk.totalBytes / 1024 / 1024;

  const currentMainChunk = stats.results.find((chunk) => /js\/main/.test(chunk.bundleName));
  const currentMB = currentMainChunk.totalBytes / 1024 / 1024;

  const diff = currentMB - masterMB;

  if (Math.abs(diff) > 0.001) {
    await github.rest.issues.createComment({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: `Bundle size change: ${diff} MB`,
    });
  }
};
