
let search = document.querySelector("#search-box");




let btnAdd = document.querySelector(".btnAdd");
let textArea = document.getElementById("textArea");
let notesTitle = document.getElementById("noteTitle");


// Function to create notes
btnAdd.addEventListener("click", function () {

    let notes = localStorage.getItem("notes");
    let noteTitle = localStorage.getItem("noteTitle")
    if (notes == null && noteTitle == null) {
        notesObj = [];
        notetit = [];
    }
    else {
        notetit = JSON.parse(noteTitle)
        notesObj = JSON.parse(notes);
    };

    if (textArea.value != "" && notesTitle.value != "") {
        notesObj.push(textArea.value);
        notetit.push(notesTitle.value);
        localStorage.setItem("noteTitle", JSON.stringify(notetit));
        localStorage.setItem("notes", JSON.stringify(notesObj));
        textArea.value = "";
        notesTitle.value = "";
        notestxt();
    }
    else {
        if (textArea.value == "") {
            textArea.value = "Empty is Not Allowed";
            setTimeout(() => {
                textArea.value = ""
            }, 650)
        }
        if (notesTitle.value == "") {
            notesTitle.value = "Empty is Not Allowed";
            setTimeout(() => {
                notesTitle.value = ""
            }, 650)
        }
    }
});

// Function to Create note on Enter Button Press
textArea.addEventListener("keydown", function (e) {
    if (e.keyCode == 13) {
        let notes = localStorage.getItem("notes");
        let noteTitle = localStorage.getItem("noteTitle")
        if (notes == null && noteTitle == null) {
            notesObj = [];
            notetit = [];
        }
        else {
            notetit = JSON.parse(noteTitle)
            notesObj = JSON.parse(notes);
        };
        if (textArea.value != "" && notesTitle.value != "") {
            notesObj.push(textArea.value);
            notetit.push(notesTitle.value);
            localStorage.setItem("notes", JSON.stringify(notesObj));
            localStorage.setItem("noteTitle", JSON.stringify(notetit));
            textArea.value = "";
            notesTitle.value = "";
            notestxt();
        }
        else {
            if (textArea.value == "") {
                textArea.value = "Empty is Not Allowed";
                setTimeout(() => {
                    textArea.value = ""
                }, 650)
            }
            if (notesTitle.value == "") {
                notesTitle.value = "Empty is Not Allowed";
                setTimeout(() => {
                    notesTitle.value = ""
                }, 650)
            }
        };
    }
});


window.onload = notestxt();
// Function to Show Notes
function notestxt() {

    let notes = localStorage.getItem("notes");
    let noteTitle = localStorage.getItem("noteTitle")
    if (notes == null && noteTitle == null) {
        notesObj = [];
        notetit = [];
    }
    else {
        notetit = JSON.parse(noteTitle)
        notesObj = JSON.parse(notes);
    };

    let html = "";
    let indexTit = 0;
    notesObj.forEach(function (element, index) {
        html += `
<div class="note">
        <h3>${notetit.splice(indexTit, 1)}</h3>
        <p id="this${index}" onblur="editNote(${index})" contenteditable="true">${element}</p>
        <button onclick="noteRemove(${index})" class="btn btnRemove">Delete</button>
      </div>
      `;
    })
    indexTit += 1;
    let noteshtml = document.querySelector('.notes');
    if (notesObj != "") {
        noteshtml.innerHTML = html
    }
    else {
        noteshtml.innerHTML = "<h2>Nothing to Show!</h2>"
    }
}

//  To Delete Note From DOM
function noteRemove(index) {
    let notes = localStorage.getItem("notes");
    let noteTitle = localStorage.getItem("noteTitle")
    if (notes == null && noteTitle == null) {
        notesObj = [];
        notetit = [];
    }
    else {
        notetit = JSON.parse(noteTitle)
        notesObj = JSON.parse(notes);
    };
    notetit.splice(index, 1)
    notesObj.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("noteTitle", JSON.stringify(notetit));
    notestxt()
}


// Editing Notes Paragraph Text
function editNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let update = document.getElementById(`this${index}`)
    notesObj[index] = update.innerText;
    localStorage.setItem("notes", JSON.stringify(notesObj));
    notestxt()
}

// Function to Search Notes
search.addEventListener('input', function () {
    let searchValue = search.value.toLowerCase();

    let noteSearch = document.getElementsByClassName('note');
    Array.from(noteSearch).forEach(function (element) {
        let notes = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        let notestitSearch = element.getElementsByTagName('h3')[0].innerText.toLowerCase();
        if (notes.search(searchValue) != -1 && notestitSearch.search(searchValue) != -1) {
            element.style.display = "block"
        }
        else {
            element.style.display = 'none'
        }
    })
})