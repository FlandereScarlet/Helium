/*Variable area*/
var exec = require('child_process').exec;
var discordioinstall = false
try {
  var Discordbot = require('discord.io');
  discordioinstall = true
} catch (err) {
  console.log('God ya big dummy! You need to install discord.io')
  return
}
if (!discordioinstall) {
  return
}
var config = require('./config.json')
var bot = new Discordbot({token: config.bot.token});
if (config.bot.public) {
    console.log('Public = True.\n\nEverything should work fine!')
} else {
    console.log('Public = False.\n\nThis can cause issues later on...')
}

bot.startDate = Date.now();

bot.on("ready", function(rawEvent) {
    console.log(" ");
    console.log("[INFO] " + bot.username + " is now running");
    console.log(" ");
    console.log("[INFO] " + bot.username + "'s ID = " + bot.id);
    console.log(" ");

});

bot.on("message", function(user, userID, channelID, message, rawEvent) {
	console.log(user + " - " + userID);
	console.log("in " + channelID);
	console.log(message);
	console.log("----------");


	message.split(" "); //Split the message on spaces.
	console.log("[DEBUG] message after split: " + message); //Log message variable after splitting
	var msg = message; //Assign message array to a new variable because we'll be changing the message variable
	console.log("[DEBUG] msg: " + msg); //Log msg variable
	message = message[0].toLowerCase(); //Assign message as just the command
	console.log("[DEBUG] message[0]: " + message); //Check if this gives only the command then remove it once it works.
	msg.shift(); //Pops the command out of the message array for ease of access. (Needs working on...)

//////////////////////
//                  //
//     Commands     //
//                  //
//////////////////////

// uptime

    if (message === "!uptime") {
        calcUptime(channelID);
    }

//status

    if (message === "!status") {
        sendMessages(channelID, ["Responsive\n" + calcUptime()]);
    }

// Kill

    if(message === "!kill" && userID == "138862213527109632") {
            sendMessages(channelID, ["**-= Shutting down, Bye! =-**"]);
            setTimeout(function(){ console.log("\n\n\n[INFO] Kill command has been triggered!\n\n") }, 2000);
            setTimeout(function(){ process.exit(0) }, 4000);
    }
    else {
        sendMessages(channelID, [":x: || Only Zacimac can perform this command || :x:"]);
    }

    if (message === "!kill -n" && userID == "138862213527109632") {
        console.log("\n\n\n[INFO] Kill command has been triggered!\n\n")
        setTimeout(function(){ process.exit(0) }, 2000);
    }
    else {
    	sendMessages(channelID, [":x: || Only Zacimac can perform this command || :x:"]);
    }

// info

    if (message === "!info" || message === "!information") {
        sendMessages(channelID, ["**Helium!**\n-------\nCreated 27th of May 2016\nCreated by the public"]);
    }

// Hello

    if (message === "!hi" || message === "!hi!" || message === "!hi!!" || message === "!hi!!!" || message === "!hello" || message === "!hello!" || message === "!hello!!"  || message === "!hello!!!") {
        sendMessages(channelID, ["**Hello!** :smile:\nI'm Helium!"]);
    }

// random name
    if (message === "!name.pick") {
        sendMessages(channelID, [namepicker()]);
    }

// github
    if (message === "!github" || message === "!git") {
        sendMessages(channelID, ["**GitHub**\nhttps://github.com/zacimac/Helium"])
    }

// repeat
    if (message === "!repeat") {
    	var string = msg.join(" "); //Join the msg variable we initialized in the beginning of the checks (line 37);
        sendMessages(channelID, ["\u200B\u180E" + msg]); //CHECK THIS
    }

// eval | CHECK IT! :D
    if (message === "!eval") {
    	if (config.configuration.masters.indexOf(userID) > -1) {
    	  var string = message.substring("!eval ".length);
    	  try {
            sendMessages(channelID, ["```" + eval(string) + "```"]);
    	  } catch (err) {
    	    sendMessages(channelID, ["```" + err + "```"]);
    	  }
    	}
    }

// website
        if (message === "!website" || message === "!site") {
        sendMessages(channelID, ["**My website** :smile:\n-= http://heliumbot.ga =-"]);
    }
});

bot.on("presence", function(user, userID, status, gameName, rawEvent) {
	/*console.log(user + " is now: " + status);*/
});

bot.on("debug", function(rawEvent) {
	/*console.log(rawEvent)*/ //Logs every event
});

bot.on("disconnected", function() {
	console.log("\n\n\n[INFO] Bot disconnected :(\n\n\n");
    setTimeout(function(){ console.log("Trying again in:") }, 1000);
    setTimeout(function(){ console.log("10") }, 2000);
    setTimeout(function(){ console.log("9") }, 3000);
    setTimeout(function(){ console.log("8") }, 4000);
    setTimeout(function(){ console.log("7") }, 5000);
    setTimeout(function(){ console.log("6") }, 6000);
    setTimeout(function(){ console.log("5") }, 7000);
    setTimeout(function(){ console.log("4") }, 8000);
    setTimeout(function(){ console.log("3") }, 9000);
    setTimeout(function(){ console.log("2") }, 10000);
    setTimeout(function(){ console.log("1") }, 11000);
    setTimeout(function(){ console.log("-------------------\n\nRECONECTING\n\n-------------------") }, 12000);
    setTimeout(function(){ bot.connect() }, 12005);

});
//DO NOT EDIT THE BELOW IF YOU DON'T WANT THINGS TO BREAK
function sendMessages(ID, messageArr, interval) {
	var callback, resArr = [], len = messageArr.length;
	typeof(arguments[2]) === 'function' ? callback = arguments[2] : callback = arguments[3];
	if (typeof(interval) !== 'number') interval = 1000;

	function _sendMessages() {
		setTimeout(function() {
			if (messageArr[0]) {
				bot.sendMessage({
					to: ID,
					message: messageArr.shift()
				}, function(err, res) {
					if (err) {
						resArr.push(err);
					} else {
						resArr.push(res);
					}
					if (resArr.length === len) if (typeof(callback) === 'function') callback(resArr);
				});
				_sendMessages();
			}
		}, interval);
	}
	_sendMessages();
}
function sendFiles(channelID, fileArr, interval) {
	var callback, resArr = [], len = fileArr.length;
	typeof(arguments[2]) === 'function' ? callback = arguments[2] : callback = arguments[3];
	if (typeof(interval) !== 'number') interval = 1000;

	function _sendFiles() {
		setTimeout(function() {
			if (fileArr[0]) {
				bot.uploadFile({
					to: channelID,
					file: fileArr.shift()
				}, function(err, res) {
					if (err) {
						resArr.push(err);
					} else {
						resArr.push(res);
					}
					if (resArr.length === len) if (typeof(callback) === 'function') callback(resArr);
				});
				_sendFiles();
			}
		}, interval);
	}
	_sendFiles();
}
//OK, you're free to continue editing. Declare new functions here
function calcUptime(cI) {
    var time = 0;
    var days = 0;
    var hrs = 0;
    var min = 0;
    var sec = 0;
    var date = Date.now();
    var temp = Math.floor((date - bot.startDate) / 1000);
    sec = temp % 60;
    temp = Math.floor(temp / 60);
    min = temp % 60;
    temp = Math.floor(temp / 60);
    hrs = temp % 24;
    temp = Math.floor(temp / 24);
    days = temp;
    var dayText = " days, ";
    var hrText = " hours, ";
    var minText = " minutes, ";
    var secText = " seconds.";
    if(days == 1) {
    	dayText = " day, "
    }
    if(hrs == 1) {
    	hrText = " hour, "
    }
    if(min == 1) {
    	minText = " minute, "
    }
    if(sec == 1) {
    	secText = " second."
    }

    sendMessages(cI, ["```xl\nUptime: " + days + dayText
        + hrs + hrText + min + minText + sec + secText + "\n```"]);
}
function namepicker(chID) {
    var things = ['John',
    'Zaci', 'Jack', 'Sophie', 'Darth',
    'Flower', 'Thomas', 'Cameron', 'Luke',
    'James', 'Mike', 'Michael', 'Jessica', 'Jesse']; //Just word-wrap array for
    var rand = things[Math.floor(Math.random() * things.length)];
    return rand;
}
