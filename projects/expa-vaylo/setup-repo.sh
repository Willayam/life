#!/bin/bash
# Push expa-vaylo docs to the standalone GitHub repo.
# Run this from the life repo root: ./projects/expa-vaylo/setup-repo.sh

set -e

REPO_URL="https://github.com/Willayam/expa-vaylo.git"
DIR="$(cd "$(dirname "$0")" && pwd)"
TEMP_DIR=$(mktemp -d)

echo "Copying expa-vaylo content to temp directory..."
cp -r "$DIR"/README.md "$DIR"/docs "$DIR"/code "$TEMP_DIR/"

echo "Initializing git repo..."
cd "$TEMP_DIR"
git init
git branch -m main
git add -A
git commit -m "Initial commit: Expa Vaylo project documentation

Shared knowledge base for the Expa Travel project covering:
- Architecture with Mermaid diagrams (Framer, BuildShip, Vaylo)
- Framer website & CMS documentation
- BuildShip backend workflow documentation
- Known issues and open questions
- Access & credentials checklist
- /code directory for Framer custom code"

echo "Pushing to $REPO_URL ..."
git remote add origin "$REPO_URL"
git push -u origin main

echo ""
echo "Done! Content pushed to $REPO_URL"
echo ""
echo "Optional: Set up as submodule in life repo:"
echo "  cd /path/to/life"
echo "  git rm -rf projects/expa-vaylo"
echo "  git submodule add $REPO_URL projects/expa-vaylo"
echo "  git commit -m 'Add expa-vaylo as submodule'"

# Cleanup
rm -rf "$TEMP_DIR"
