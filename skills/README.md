# Skills Integration Guide

## Directory Structure

Each skill must be a directory with the following structure:

```
skills/
└── <skill-name>/
    ├── SKILL.md          # Required: skill definition
    ├── package.json      # Optional: npm dependencies
    ├── scripts/          # Optional: helper scripts
    └── ...
```

## SKILL.md Format

Required frontmatter fields:

```yaml
---
name: skill-name        # Must match directory name
description: "..."      # Brief description for AI to decide when to use
---

# Skill content (markdown instructions for AI)
```

## package.json (if skill has npm dependencies)

```json
{
  "name": "skill-name",
  "version": "1.0.0",
  "dependencies": {
    "package": "^x.x.x"
  }
}
```

AI will auto-detect and run `npm install` when `node_modules` is missing.

## Runtime Behavior

1. On app startup, builtin skills are copied to `~/Library/Application Support/goodable/user-skills/` (macOS) or `%APPDATA%/goodable/user-skills/` (Windows)
2. `node_modules` is preserved during updates
3. All skills in user-skills directory are enabled by default

## Key Notes

- Directory name should match `name` field in SKILL.md
- Keep dependencies minimal (affects first-run install time)
- Scripts should use relative paths from skill directory
- Test on both macOS and Windows if using shell scripts
