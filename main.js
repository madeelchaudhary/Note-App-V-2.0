function getElement(selector) {
  return document.querySelector(selector);
}

function lowerCase(input) {
  return {
    noteTitle: input.title.toLowerCase(),
    noteContent: input.content.toLowerCase(),
  };
}
const searchElement = document.querySelector("#search-bar");
const userResponseMessage = {
  error: "a same note already exist",
  success: "Note has been added successfully",
  delete: "Note has been deleted successfully",
  makeError(element) {
    element.classList.remove("success");
    element.classList.add("error");
  },
  makeInfo(element) {
    element.classList.remove("error");
    element.classList.add("success");
  },
  clearAll(element) {
    element.classList.remove("success");
    element.classList.remove("error");
  },
};

getElement(".nav-toggle").addEventListener("click", () => {
  getElement(".nav-main").classList.toggle("nav-visible");
});

function addNewNote(newNote) {
  const notes = getNotes();
  const noteId = notes.length;
  newNote.Id = noteId;
  notes.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notes));
  return notes;
}

function getNotes() {
  const notes = localStorage.getItem("notes");
  const notesArray = JSON.parse(notes) || [];
  return notesArray;
}

function validateUserInput(newNote) {
  const notes = getNotes();
  const { noteTitle: newNoteTitle, noteContent: newNoteContent } =
    lowerCase(newNote);
  const result = notes.every((note) => {
    const { noteTitle, noteContent } = lowerCase(note);
    return noteTitle !== newNoteTitle && noteContent !== newNoteContent;
  });
  return result;
}

function showMessage(type) {
  const messageElement = getElement(".message");
  getElement("#messageText").innerText = userResponseMessage[type];
  if (type === "error") {
    userResponseMessage.makeError(messageElement);
  } else {
    userResponseMessage.makeInfo(messageElement);
  }
  getElement(".close-message").addEventListener("click", () => {
    userResponseMessage.clearAll(messageElement);
  });
}

function showNotes(notes) {
  const notesElement = getElement(".notes");
  if (notes.length > 0) {
    const notesHtml = notes.map((note) => {
      return `<article class="note" id="note${note.Id}">
      <header>
          <h3 class="note-title">
              ${note.title}
          </h3>
      </header>
      <div class="note-body">
          <p>${note.content}</p>
      </div>
      <div class="btn-container">
          <button onClick="deleteNote(${note.Id})" class="delete-note"><i class="fas fa-trash-alt"></i></button>
          <button onClick="editNote(${note.Id})" class="edit-note"><i class="far fa-edit"></i></button>
      </div>
    </article>`;
    });
    notesElement.innerHTML = notesHtml.join("");
  } else {
    notesElement.innerHTML =
      "<h3 style='grid-column: 2; text-align: center;'>Nothing to Show!</h3>";
  }
}

function deleteNote(noteId) {
  const notes = getNotes();
  const newNotes = notes.filter((note) => note.Id !== noteId);
  const newNotesId = newNotes.map((note, index) => {
    return { ...note, Id: index };
  });
  localStorage.setItem("notes", JSON.stringify(newNotesId));
  showMessage("delete");
  showNotes(newNotesId);
}

// Editing Notes Paragraph Text
function editNote(noteId) {
  const note = getElement(`#note${noteId}`);
  const noteContent = note.querySelector("p");
  noteContent.setAttribute("contentEditable", true);
  noteContent.focus();
  noteContent.addEventListener("blur", () => {
    noteContent.removeAttribute("contentEditable");
    const notes = getNotes();
    const newNotes = notes.map((note) => {
      if (note.Id === noteId) {
        note.content = noteContent.innerText;
      }
      return note;
    });
    localStorage.setItem("notes", JSON.stringify(newNotes));
  });
}
// Function to create notes
getElement(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const newNote = {
    title: getElement("#noteTitle").value.trim(),
    content: getElement("#textArea").value.trim(),
  };

  if (validateUserInput(newNote)) {
    const notes = addNewNote(newNote);
    e.target.reset();
    showMessage("success");
    showNotes(notes);
  } else {
    showMessage("error");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const notes = getNotes();
  showNotes(notes);
});

searchElement.addEventListener("input", searchNotes);
function searchNotes(e) {
  const notes = getNotes();
  const searchTerm = this.value.toLowerCase();
  if (searchTerm) {
    const newNotes = notes.filter((note) => {
      const { noteTitle, noteContent } = lowerCase(note);
      return noteTitle.includes(searchTerm) || noteContent.includes(searchTerm);
    });
    showNotes(newNotes);
  } else {
    showNotes(notes);
  }
}
