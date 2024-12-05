#!/bin/bash

# Configure git
git config --global user.email "github-actions@github.com"
git config --global user.name "GitHub Actions"

# Set the repository URL with token
REPO_URL="https://${GITHUB_TOKEN}@github.com/VK-Lab/telegram-group-link-generator.git"

# Add remote and push
git remote add origin "$REPO_URL" || git remote set-url origin "$REPO_URL"
git branch -M main
git push -u origin main
