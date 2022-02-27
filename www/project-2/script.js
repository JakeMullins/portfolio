// On document change generate random lesson pulling from lessons object
let lessons = {
    "0": {
        "letters": "ك ش",
        "lessonText": ""
    },
    "1": {
        "letters": "س م",
        "lessonText": ""
    },
    "2": {
        "letters": "ن ي",
        "lessonText": ""
    },
    "3": {
        "letters": "ت ب",
        "lessonText": ""
    },
    "4": {
        "letters": "ا ل",
        "lessonText": ""
    },
    "5": {
        "letters": "د ض",
        "lessonText": ""
    },
    "6": {
        "letters": "ج ص",
        "lessonText": ""
    },
    "7": {
        "letters": "ح ث",
        "lessonText": ""
    },
    "8": {
        "letters": "خ ق",
        "lessonText": ""
    },
    "9": {
        "letters": "ه ف",
        "lessonText": ""
    },
    "10": {
        "letters": "ئ ظ",
        "lessonText": ""
    },
    "11": {
        "letters": "ز ء",
        "lessonText": ""
    },
    "12": {
        "letters": "و ؤ",
        "lessonText": ""
    },
    "13": {
        "letters": "ة ر",
        "lessonText": ""
    },
    "14": {
        "letters": "ى لا",
        "lessonText": ""
    }
}

function generateLessons() {

    // Modifies all lesson text entries in each object
    Object.entries(lessons).forEach(([key, value]) => {
        let currLessonText = "";

        letters = value.letters.split(' ');

        let l1 = letters[0];
        let l2 = letters[1];

        // Add more er
        currLessonText += repeatConsecutiveLetter(l1, 5) + " " + repeatConsecutiveLetter(l2, 5) + "\n";
        currLessonText += repeatAlternatingLetters(l1, l2, 5) + " " + repeatAlternatingLetters(l2, l1, 5) + "\n";
        currLessonText += repeatRandomLetters(l1, l2, 8) + " " + repeatRandomLetters(l1, l2, 8) + "\n";
        currLessonText += repeatRandomLetters(l1, l2, 4) + " " + repeatRandomLetters(l1, l2, 4) + " " + repeatRandomLetters(l1, l2, 4) + " " + repeatRandomLetters(l1, l2, 4);

        value.lessonText = currLessonText;
    })

    document.getElementById("lessonSelectDropdown").innerHTML = generateLessonMenu();
}

function repeatConsecutiveLetter(letter, repeatNum) {
    let result = "";

    for (let i = 0; i < repeatNum; i++) {
        result += letter;
    }

    return result;
}

function repeatAlternatingLetters(l1, l2, repeatNum) {
    let result = "";

    for (let i = 0; i < repeatNum; i++) {
        result += l1 + l2;
    }

    return result;
}

function repeatRandomLetters(l1, l2, repeatNum) {
    let result = "";

    for (let i = 0; i < repeatNum; i++) {
        let rand = Math.round(Math.random());

        if (rand === 1) {
            result += l1;
        } else if (rand === 0) {
            result += l2;
        }
    }
    return result;
}

function generateLessonMenu() {
    let html = "<option value>Select a lesson</option>\n";
    Object.entries(lessons).forEach(([key, value]) => {
        html += "<option value=" + key + ">" + value.letters + "</option>\n";
    })
    return html;
}

document.getElementById("generateQuote").addEventListener("click", (event) => {
    const url = "https://quranapi.azurewebsites.net/api/verse/"
    let quranSection = document.getElementById("quranText")
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            quranSection.innerHTML = json.Text;
        })
    quranSection.innerHTML = "Loading verse";
})

document.getElementById("generateLessonButton").addEventListener("click", (event) => {
    generateLessons();
})


document.getElementById("lessonSelectDropdown").addEventListener("change", () => {
    lessonTextField = document.getElementById("lesson-text");
    lessonValue = document.getElementById("lessonSelectDropdown").value;
    
    renderLesson(lessons[lessonValue].lessonText);
})

// Outputs div w/ class word for each word
function renderLesson(lessonText) {
    let lessonWords = lessons[lessonValue].lessonText.split(/[ \n]/);

    lessonTextField = document.getElementById("lesson-text");
    lessonTextField.innerHTML = "";
    lessonWords.forEach((word) => {
        // Decide structure for each word.
        // 3 states grey green red
        lessonTextField.innerHTML += '<div class="empty-word">' + word + "</div>";
    })
}