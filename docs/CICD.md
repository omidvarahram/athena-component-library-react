# 🚀 CI/CD Pipeline Documentation

## Overview

This project uses automated CI/CD with **semantic-release** for version management and publishing to NPM.

## 🔄 Workflow Triggers

### Automatic Release (Production)

- **Trigger**: Push or merge to `master` branch
- **Actions**:
  - ✅ Run quality checks (lint, test, audit, build)
  - 🏷️ Analyze commit messages for version bump
  - 📦 Create GitHub release
  - 📋 Update CHANGELOG.md
  - 🚀 Publish to NPM (if version changed)

### Development Testing

- **Trigger**: Push to `develop` branch
- **Actions**:
  - ✅ Run quality checks
  - 🏷️ Create beta pre-release (e.g., 1.0.0-beta.1)

### Pull Request Validation

- **Trigger**: PR opened/updated to `master`
- **Actions**:
  - ✅ Run quality checks
  - 📊 Report test coverage
  - 🔍 Validate commit messages

## 📝 Commit Message Convention

We use **Conventional Commits** for automated versioning:

```bash
# Patch release (0.1.0 → 0.1.1)
fix: resolve theme switching bug
perf: improve component rendering speed
refactor: simplify persistence logic

# Minor release (0.1.0 → 0.2.0)
feat: add new Button component
feat: support custom theme colors

# Major release (0.1.0 → 1.0.0)
feat!: redesign API structure
feat: remove deprecated props

BREAKING CHANGE: ThemeProvider now requires 'themes' prop
```

### Commit Types

- `feat`: New features → **minor** version bump
- `fix`: Bug fixes → **patch** version bump
- `perf`: Performance improvements → **patch** version bump
- `refactor`: Code refactoring → **patch** version bump
- `docs`: Documentation only → **no release**
- `style`: Code formatting → **no release**
- `test`: Test changes → **no release**
- `chore`: Build/tooling → **no release**
- `ci`: CI configuration → **no release**

## 🏷️ Version Strategy

| Branch    | Version Pattern | NPM Tag  | Description     |
| --------- | --------------- | -------- | --------------- |
| `master`  | `1.0.0`         | `latest` | Stable releases |
| `develop` | `1.0.0-beta.1`  | `beta`   | Pre-releases    |

## 🔐 Secrets Configuration

Required GitHub repository secrets:

```bash
ATHENA_CL_SECRETS_NPM=npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 📦 Publishing Process

### Automatic (Recommended)

1. Create feature branch from `develop`
2. Make changes with conventional commits
3. Open PR to `master`
4. Merge PR → **Automatic release!** 🚀

### Manual Testing

```bash
# Test release process locally (dry-run)
yarn release:dry-run

# Force release manually (use with caution)
yarn release
```

## 🚨 Emergency Releases

If automated release fails:

```bash
# 1. Fix the issue
git checkout master
git pull origin master

# 2. Manual version bump
npm version patch # or minor/major
git push origin master --tags

# 3. Manual NPM publish
yarn build
cd build && npm publish
```

## 📋 Quality Gates

Every release must pass:

- ✅ **Linting**: ESLint with 0 errors (warnings allowed)
- ✅ **Testing**: Jest with 70%+ branch coverage, 90%+ other metrics
- ✅ **Security**: No moderate+ vulnerabilities in production dependencies
- ✅ **Build**: Successful TypeScript compilation and bundling

## 🔍 Monitoring

- **GitHub Actions**: Monitor workflow runs in Actions tab
- **NPM**: Check published versions at `https://www.npmjs.com/package/athena-component-library-react`
- **Coverage**: View reports in PR comments (Codecov integration)

## 🎯 Best Practices

1. **Use conventional commits** - ensures proper versioning
2. **Keep PRs focused** - one feature per PR for cleaner releases
3. **Write tests** - maintain coverage requirements
4. **Update docs** - document new features/breaking changes
5. **Review changelog** - verify release notes before merging
6. **Monitor deployments** - check NPM package after releases
