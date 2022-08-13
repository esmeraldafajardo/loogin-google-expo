/* eslint-disable no-template-curly-in-string */
module.exports = {
  repositoryUrl: 'https://gitlab.com/r1896/rod-mobile.git',
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'beta',
    'main',
    'next',
    'next-major',
    {
      name: 'beta',
      prerelease: true,
    },
    {
      name: 'alpha',
      prerelease: true,
    },
  ],
  verifyConditions: [
    'semantic-release-expo',
    '@semantic-release/npm',
    'semantic-release-git-branches',
    '@semantic-release/gitlab',
  ],
  analyzeCommits: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
      },
    ],
  ],
  verifyRelease: [],
  generateNotes: ['@semantic-release/release-notes-generator'],
  prepare: [
    {
      path: '@semantic-release/npm',
      npmPublish: false,
    },
    {
      path: 'semantic-release-expo',
      versions: {
        version: '${next.raw}',
        android: '${code}',
        ios: '${next.raw}',
      },
    },
    {
      path: 'semantic-release-git-branches',
      assets: ['package.json', 'yarn.json', 'CHANGELOG.md', 'app.json'],
      branchMerges: ['beta'],
      message:
        'chore: create new release ${nextRelease.version}\n\n${nextRelease.notes}',
    },
  ],
  publish: ['@semantic-release/gitlab'],
  fail: [],
  success: [],
  addChannel: [],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/gitlab',
  ],
};
