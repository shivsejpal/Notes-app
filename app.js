const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')
const { describe, demandOption, argv } = require('yargs')

//customize yargs version
yargs.version('1.1.0')

// Welcome Help
yargs.command({
  command: 'cmd',
  describe: 'helping commands',
  handler: () => {
    console.log(chalk.inverse('Welcome to Notes Application'))
    console.log('.')
    console.log('.')
    console.log('use >> node app add --title="Note Title Here" --body="Note Details" //To add note')
    console.log('use >> node app remove --title="Note Title Here" //To remove Note');
    console.log('use >> node app read --title="Note Title Here" //To read Note');
    console.log('use >> node app list //List all available Notes');
    console.log('.')
    console.log('.')
  } 
})



//create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'details to be remember',
      demandOption: true,
      type: 'string'      
    }
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body)
  }
})

//create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'title of note',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notes.removeNote(argv.title)
  }
})


//create list command
yargs.command({
  command: 'list',
  describe: 'list all note',
  handler: () => {
    notes.listNotes()
  }
})

//create read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notes.readNote(argv.title)
  }
})

//add, remove, read, list

yargs.parse()
