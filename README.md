# Chicago 311 Woes

This is an application to allow Chicago residents to report instances of miscommunication (or lack of communication) on the part of multiple city services when attempting to address a 311 issue. 

The app can currently be found at http://chicago311woes.herokuapp.com

## Requirements

* [node.js and npm](http://nodejs.org)
* [mongodb](http://www.mongodb.org/downloads)

## Dev Setup

After installing the requirements above and starting mongodb...

    $ git clone https://github.com/benwilhelm/311.git
    $ cd 311
    $ ./setup.sh
    $ grunt

The `grunt` command starts the development server on port 3000  
Now visit `http://localhost:3000` in your browser

###What `setup.sh` is doing...

`Setup.sh` is taking care of some dependency installations for you. Here are the details of what it's doing:

* Install Grunt CLI globaly: `npm install -g grunt-cli`  
  This command only runs if you have not yet installed the [Grunt](gruntjs.com) javascript task runner. We use Grunt to handle the starting and restarting of the node server when files are changed, running the test suite, and compiling LESS source files into CSS.
  
* Install app dependencies: `npm install`  
  This installs the application dependencies as defined in `package.json`

  
* Symlink Git hooks  
  Symlinking the scripts in git-hooks into .git/hooks automates some tasks for you when committing, pulling, and merging. The `pre-commit` hook runs the test suite via `grunt test` in order to ensure that you are not introducing any regressions with your commit. The `post-merge` hook prunes and installs any new npm dependencies, runs any database migrations, and runs the test suite.
  

## MIT Open Source License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


  
