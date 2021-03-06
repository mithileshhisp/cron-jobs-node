# cron-jobs-node
create a new Node application with cron-jobs
Install Node Modules
To make this application work we are going to need a couple of dependencies. You can install them by running the following commands:

npm install express node-cron fs

// details
express - powers the web server

node-cron - task scheduler in pure JavaScript for node.js

fs - node file system module

Building the backend server
Create an index.js file and then import the necessary node modules:


Edit the index.js file to look like this:

    // index.js
    const cron = require("node-cron");
    const express = require("express");
    const fs = require("fs");

    app = express();

    [...]
Now here’s where node-cron comes in. After a while, we want to delete the error log files at intervals without having to do it physically. We will use node-cron to do this. Let’s take a look a simple task first. Add the following to your index.js file:

    // index.js
    [...]
    // schedule tasks to be run on the server   
    cron.schedule("* * * * *", function() {
      console.log("running a task every minute");
    });

    app.listen(3128); // hear 3128 is listen port no of node.
    [...]

Now, when we run the server, we get the following result:

    > node index.js

    running a task every minute
    running a task every minute

Different intervals for scheduling tasks
With node-cron, we can schedule tasks for different intervals. Let’s see how to schedule task using different intervals. In the example above, we created a simple Cron job, the parameters passed to the .schedule() function were * * * * * . These parameters have different meanings when used:

     * * * * * *
     | | | | | |
     | | | | | day of week
     | | | | month
     | | | day of month
     | | hour
     | minute
     second ( optional )
Using this example, if we want to delete the log file from the server on the 21st of every month, we update the index.js to look like this:

    // index.js
    const cron = require("node-cron");
    const express = require("express");
    const fs = require("fs");

    app = express();

    // schedule tasks to be run on the server
    cron.schedule("* * 21 * *", function() {
      console.log("---------------------");
      console.log("Running Cron Job");
      fs.unlink("./error.log", err => {
        if (err) throw err;
        console.log("Error file succesfully deleted");
      });
    });

    app.listen("3128");
Now, when the server is run, you get the following output:



NB: To simulate the tasks, intervals were set to shorter period by setting the number of minutes in the parameter for the task scheduler
You can run any actions inside the scheduler. Actions ranging from creating a file, to sending emails and running scripts. Let’s take a look at more use cases

Use Case 2 - Backing Up Database
Ensuring the accessibility of user data is very key to any business. If an unforeseen event happens and your database becomes corrupt, all hell will break loose if you don’t have any form of existing backup for your business. To save yourself the stress in the occurrence of such, you can also use Cron jobs to periodically backup the existing data in your database. Let’s take a look at how to do this.

NB: To simulate the tasks, intervals were set to shorter period by setting the number of minutes in the parameter for the task scheduler
First, we need to install a node module that allows us to run shell scripts:

    npm install shelljs
And also install SQLite if you haven’t:

    npm install sqlite3
Now create a sample database by running the command:

    sqlite3 database.sqlite
To backup your database at 11:59pm every day, update your index.js file to look like this:

    // index.js
    const fs = require("fs");
    let shell = require("shelljs");
    const express = require("express");

    app = express();

    // To backup a database
    cron.schedule("59 23 * * *", function() {
      console.log("---------------------");
      console.log("Running Cron Job");
      if (shell.exec("sqlite3 database.sqlite  .dump > data_dump.sql").code !== 0) {
        shell.exit(1);
      }
      else{
        shell.echo("Database backup complete");
      }
    });
    app.listen("3128");
Now, when you run the server using the command:

    node index.js
You get the following result:



Use Case 3 - Sending emails every n-time interval
You can also use Cron jobs to keep your users up to date as to what is going on with your business by sending them emails at different intervals. For example, you can curate a list of interesting links and then send them to users every Sunday. To do something like this, you’ll need to do the following.

Install nodemailer by running the command:

    npm install nodemailer
Once that is done, update the index.js file to look like this:

    // index.js
    const cron = require("node-cron");
    const express = require("express");
    let nodemailer = require("nodemailer");

    app = express();

    // create mail transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "COMPANYEMAIL@gmail.com",
        pass: "userpass"
      }
    });

    // sending emails at periodic intervals
    cron.schedule("* * * * Wednesday", function(){
      console.log("---------------------");
      console.log("Running Cron Job");
      let mailOptions = {
        from: "COMPANYEMAIL@gmail.com",
        to: "sampleuser@gmail.com",
        subject: `Not a GDPR update ;)`,
        text: `Hi there, this email was automatically sent by us`
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          throw error;
        } else {
          console.log("Email successfully sent!");
        }
      });
    });

    app.listen("3128");
NB: To simulate the tasks, intervals were set to shorter period by setting the number of minutes in the parameter for the task scheduler
Now, when you run the server using the command node index.js , you get the following result:


// forever

$ [sudo] npm install forever -g

forever start app.js
forever stop app.js

forever list
forever stop
forever stopall


  actions:
    start               Start SCRIPT as a daemon
    stop                Stop the daemon SCRIPT by Id|Uid|Pid|Index|Script
    stopall             Stop all running forever scripts
    restart             Restart the daemon SCRIPT
    restartall          Restart all running forever scripts
    list                List all running forever scripts
    config              Lists all forever user configuration
    set <key> <val>     Sets the specified forever config <key>
    clear <key>         Clears the specified forever config <key>
    logs                Lists log files for all forever processes
    logs <script|index> Tails the logs for <script|index>
    columns add <col>   Adds the specified column to the output in `forever list`. Supported columns: 'uid', 'command', 'script', 'forever', 'pid', 'id', 'logfile', 'uptime'
    columns rm <col>    Removed the specified column from the output in `forever list`
    columns set <cols>  Set all columns for the output in `forever list`
    cleanlogs           [CAREFUL] Deletes all historical forever log files
