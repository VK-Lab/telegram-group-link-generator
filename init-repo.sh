#!/bin/bash

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Telegram Invite Link Generator

- Command-line interface for generating invite links
- Support for custom expiration times and member limits
- Input validation and error handling
- Complete documentation"

echo "Repository initialized and first commit created!"
echo "Next steps:"
echo "1. Create a new repository on GitHub"
echo "2. Add the remote repository:"
echo "   git remote add origin https://github.com/yourusername/telegram-invite-link-generator.git"
echo "3. Push the code:"
echo "   git push -u origin main"
