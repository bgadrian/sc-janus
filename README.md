# StarCitizen Janus - private discord version
Janus is a funny discord bot, made specific for private organisations.
If your org has a discord server you can use Janus to entertain your members or do boring admin tasks.

Built with love for SC community by [http://StarCitizen.center].

##Features
* custom command prefix (usefull when you already have a bot with "!")
* easy to setup (only a config file)
* auto delete commands and replies - keep your public channels clean
* accept commands on private messages and public text channels
* responds as private message - global and per command option
* custom name - if you don't like Janus, you can change it
* commands with multiple parameters and/or flags

##Commands
* **isMember**: Confirms that a RSI handler exists and that is part of our organisation
* **confirm**: Allow your users to confirm their affiliation to your organisation and automatically add your Membership discord role.
* **beer**: Any user can order a free random beer, it replies with a random real-life beer name and image using https://beeroverip.org/random/
* **decide**: Allow your members to take decisions, they ask a question and the bot replies with (yes 40%, no 40%, maybe 10% chance).
* **latest**: Returns the latest 5 reddit posts from /r/starcitizen Works great with the Discord preview thumbnails.
* **pledge**: Fetch the latest CIG pledge details like Funds raised so far, number of pledgers and their ship bought count.
* **time**: Returns the current time for multiple timezones (customizable list).
* **release**: Returns the release date for StarCitizen.
* **your-command**: add a new .js file in /lib/commands folder.

#Technical

##details
* needs minimal technical knowledge to setup (bash, json)
* built as a node.js app
* script to run it inside a docker (recommended)
* easy to extend - add new commands as simple as adding a new file
* uses https://github.com/mellamopablo/clapp and https://github.com/hydrabolt/discord.js


## Setup
1. Make a bot app on discord and get it's token
2. Make a discord server
3. Invite the bot on your discord Ex: https://discordapp.com/oauth2/authorize?&client_id=111111111111&scope=bot&permissions=0  (you need to be a moderator/admin)

*Note: I recommend to make a new bot and server for testing/development process.*

##Tech setup
 1. Clone this repo
 2. Make a config and populate it
```bash
cp config.example.js config.js
vim config.js
```
3. Install the dependencies
```bash
npm install --production
```
4. Run the bot (see below)


*Note: DO not run multiple instances with the same config file, the universe will explode.*

If you have trouble with the Discord website you can follow this tutorial [https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token]

### Run as local process

```bash
node ./lib/index.js
```

### Run it as a Docker container
Requires Docker to be installed locally.

```bash
chmod +x *.sh
./docker_rebuild.sh
#see the errors
docker logs -f janusbot
```

##Thanks
If you appreciate and use my work see more on [http://StarCitizen.center] and consider giving credits (back link) and making a donation.
