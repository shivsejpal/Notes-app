const fs = require('fs')
const chalk = require('chalk')



// Adding note
const addNote = (title, body) => {
  const notes = loadNotes()
  
  const duplicateNote = notes.find((note) => note.title === title)
  
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New Note Added!'))
  } else {
    console.log(chalk.red.inverse('Note Title taken!'))
  }
}

// Remove Note
const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse('Note Removed!'))
    saveNotes(notesToKeep)
  } else {
    console.log(chalk.red.inverse('No Note Found!'))
  }
}

// Listing Notes
const listNotes = () => {
  const notes = loadNotes()
  
  const note = notes.find((note) => note.title)

  if (note) {
    console.log(chalk.inverse('>> Your Notes <<'))

    notes.forEach((note) => {
      console.log(note.title)
    })
  } else {
    console.log(chalk.red.inverse('No note found!'))
  }

}

// Reading Note
const readNote = (title) => {
  const notes = loadNotes()
  const note = notes.find((note) => note.title === title)

  if (note) {
    console.log(chalk.greenBright.inverse(note.title))
    console.log(note.body)
  } else {
    console.log(chalk.red.inverse('No note found!'))
  }
}

// save note
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

//view existing notes
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJson = dataBuffer.toString()
    return JSON.parse(dataJson)
  } catch (e) {
    return []
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}