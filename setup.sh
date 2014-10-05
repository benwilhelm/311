#!/bin/bash

echo ''
if [ ! `which grunt` ]
then

  echo "Installing grunt-cli globally"
  echo "  see http://gruntjs.com/getting-started#installing-the-cli"
  echo "==========================================================="
  echo ""

  cmd='npm install -g grunt-cli'
  echo $cmd
  $cmd
fi

echo ""
echo "Installing project-specific npm dependencies"
echo "============================================"
echo ""
cmd='npm install'
echo $cmd
$cmd

echo ""
echo "Symlinking git hooks"
echo "===================="
echo ""

cmd='cd .git/hooks'
echo $cmd
$cmd

cmd='ln -s ../../git-hooks/pre-commit'
echo $cmd
$cmd

cmd='ln -s ../../git-hooks/post-merge'
echo $cmd
$cmd

cmd='cd ../..'
echo $cmd
$cmd

echo ""
echo ""
echo "Setup is complete." 
echo "Run 'grunt' to start server"
echo "Visit 'http://localhost:3000' in your browser."
echo "See README for more information"
