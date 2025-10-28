module.exports = {
  branches: [
    'master',
    {
      name: 'develop',
      prerelease: 'beta',
      channel: 'beta',
    },
  ],
  plugins: [
    // Analyze commits to determine version bump
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          // Custom rules for version bumping
          { type: 'feat', release: 'minor' },
          { type: 'fix', release: 'patch' },
          { type: 'perf', release: 'patch' },
          { type: 'revert', release: 'patch' },
          { type: 'docs', release: false },
          { type: 'style', release: false },
          { type: 'chore', release: false },
          { type: 'refactor', release: 'patch' },
          { type: 'test', release: false },
          { type: 'build', release: false },
          { type: 'ci', release: false },
          // Breaking changes (BREAKING CHANGE in footer or ! after type)
          { breaking: true, release: 'major' },
          // Specific scopes that should trigger releases
          { scope: 'deps', release: 'patch' },
          { scope: 'security', release: 'patch' },
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
        },
      },
    ],

    // Generate release notes
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'angular',
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
        },
        writerOpts: {
          commitsSort: ['subject', 'scope'],
        },
      },
    ],

    // Generate changelog
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],

    // Update package.json version (but don't publish to npm)
    [
      '@semantic-release/npm',
      {
        npmPublish: false, // We handle publishing manually in workflow
      },
    ],

    // Create GitHub release
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'build/*.tgz',
            label: 'npm package',
          },
          {
            path: 'CHANGELOG.md',
            label: 'Changelog',
          },
        ],
        successComment: false,
        failComment: false,
        releasedLabels: ['released'],
      },
    ],

    // Commit changes back to repository
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
