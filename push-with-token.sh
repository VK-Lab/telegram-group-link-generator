#!/bin/bash

# Configure git
git config --global user.email "github-actions[bot]@users.noreply.github.com"
git config --global user.name "github-actions[bot]"

# Remove existing remote if it exists
git remote remove origin 2>/dev/null || true

# Add the remote with token authentication
git remote add origin "https://oauth2:${GITHUB_TOKEN}@github.com/VK-Lab/telegram-group-link-generator.git"

# Push to main branch
git branch -M main
git push -f origin main
