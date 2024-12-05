#!/bin/bash

# Configure git for the commit
git config --global user.email "github-actions@github.com"
git config --global user.name "GitHub Actions"

# Authenticate with GitHub CLI using the token
echo "$GITHUB_TOKEN" | gh auth login --with-token

# Remove existing origin if it exists
git remote remove origin || true

# Add the repository as remote and push
gh repo set-default VK-Lab/telegram-group-link-generator
git remote add origin https://github.com/VK-Lab/telegram-group-link-generator.git
git branch -M main
gh repo sync
