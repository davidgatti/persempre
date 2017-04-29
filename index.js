#!/usr/bin/env node

let fs = require('fs');
let dir = require('node-dir');
let spawn = require('child_process').spawn;
let cluster = require('cluster');

//
//	1.	Extract the name of the app/file name.
//
const cli_name = process.argv[1].split('/').pop();

//
//	2. Save the first provided argument as the server to run
//
const server_to_run = process.argv[2];

//
//	3. Check if the server file name was provided
//
if(!server_to_run)
{
    //
    //    1. Give the user an example how to use the app.
    //
    console.log("\n\tMissing argument! \n\n\tExample: ./%s FILE_NAME \n", cli_name);

    //
    //    -> Exit the app if error.
    //
    process.exit(1);
}

//
//	Depending which process is the master we do different thing
//
if(cluster.isMaster)
{
	//
	//	1.	Let the user know we are starting.
	//
	console.log("Starting");

	//
	//	2.	For a child.
	//
	cluster.fork();

	//
	//	@. Listen for the exit message so we can restart ourself.
	//
	cluster.on('exit', function (worker) {

		//
		//	1.	When the previous child exited, then we recreate it
		//		so we can restart the NodeJS server.
		//
		cluster.fork();

		//
		//	2.	Let the user know what happened.
		//
		console.log("Restarting");

	});
}
else
{
	//
	//	1.	Run the server in a child process
	//
	let node = spawn("node", ['./' + server_to_run]);

	//
	//	2.	Pass the server logs
	//
	node.stdout.on('data', function(data) {

		console.log(`stdout: ${data}`);

	});

	//
	//	3.	Pass the error logs
	//
	node.stderr.on('data', function(data) {

		console.log(`stdout: ${data}`);

	});

	//
	//	4.	The array that will store all the file to check
	//
	let files = []

	//
	//	5.	Get all the file from the folder
	//
	dir.files(process.cwd(), function(err, paths) {

		//
		//	1.	Make sure there was no error
		//
		if(err)
		{
			throw err;
		}

		//
		//	2.	Loop over each found file, and add its path and time stamp
		//		to the array for later monitoring
		//
		paths.forEach(function(file) {

			//
			//	1.	dir to avoid
			//
			let patern = /node_modules/;

			//
			//	2.	Skip unwanted dirs.
			//
			if(!patern.test(file))
			{
				//
				//	1.	Add each individual file to the array with the time
				//		when it was changed.
				//
				files.push({
					file: file,
					time: fs.statSync(file).mtime
				});
			}

		});

		//
		//	3.	Start the main loop
		//
		looper(node, files);

	});


}

//
//	The main loop that will keep checking all the files
//
function looper(node, files)
{
	//
	//	1.	The timer that acts as the loop
	//
	setTimeout(function() {

		//
		//	1.	Loop over each file until we find a file that was changed.
		//
		for(let key in files)
		{
			//
			//	1.	Save the state of the check
			//
			let state = check(files[key]);

			//
			//	2.	If the file was changed then we stop looping since
			//		we already found our suspect ;) and this is enough
			//		for us to restart the process.
			//
			if(state)
			{
				process.kill(node.pid);
				process.exit();
			}
		}

		//
		//	2.	Restart the loop if no file was changed
		//
		looper(node, files);

	}, 4000);
}

//
//	Function to get the edit time for an individual file
//
function check(object)
{
	//
	//	1.	Get file statistic
	//
	let file_stats = fs.statSync(object.file);

	//
	//	2.	Grate a data object out of the file time
	//
	let file_time = new Date(file_stats.mtime);

	//
	//	3.	Compare the old time with the new one
	//
	if(object.time.getTime() !== file_time.getTime())
	{
		//
		//	->	Return true when the time doesn't match
		//
		return true;
	}
}