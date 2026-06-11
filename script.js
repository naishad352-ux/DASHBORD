const input = document.getElementById("textInput");

const warning = document.getElementById("warning");
const freqTable = document.getElementById("freqTable");
const words = document.getElementById("words");
const chars = document.getElementById("chars");
const spaces = document.getElementById("spaces");
const lines = document.getElementById("lines");
const readingTime = document.getElementById("readingTime");
const progressBar = document.getElementById("progressBar");

const LIMIT = 200;

// Load Saved Text
input.value = localStorage.getItem("savedText") || "";

analyze();

input.addEventListener("input", () => {
    localStorage.setItem("savedText", input.value);
    analyze();
});

function analyze(){

    const text = input.value;

    // Words
    const wordArray = text
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 0);

    words.textContent = wordArray.length;

    // Characters
    chars.textContent = text.length;

    // Spaces
    spaces.textContent = (text.match(/\s/g) || []).length;
    
    // Lines
    lines.textContent =
        text.length === 0
        ? 0
        : text.split("\n").length;

    // Reading Time
    readingTime.textContent =
        Math.ceil(wordArray.length / 200) +
        " min";

    // Progress Bar
    const percentage =
        (text.length / LIMIT) * 100;

    progressBar.style.width =
        Math.min(percentage,100) + "%";

    if(text.length > LIMIT){
        warning.textContent =
            "⚠ Character limit exceeded!";
        progressBar.style.background =
            "red";
    }else{
        warning.textContent = "";
        progressBar.style.background =
            "limegreen";
    }

    updateFrequency(text);
}

function updateFrequency(text){

    const counts = {};

    const cleanText =
        text
        .toLowerCase()
        .replace(/[^a-z]/g,'');

    for(let char of cleanText){
        counts[char] =
            (counts[char] || 0) + 1;
    }

    let html = "<tr>";

    for(let i = 65; i <= 90; i++){

        let char =
            String.fromCharCode(i)
            .toLowerCase();

        html += `
            <td>
                <b>${char.toUpperCase()}</b>
                <br>
                ${counts[char] || 0}
            </td>
        `;

        if((i - 64) % 6 === 0){
            html += "</tr><tr>";
        }
    }

    html += "</tr>";

    freqTable.innerHTML = html;
}

function copyText(){

    navigator.clipboard.writeText(
        input.value
    );

    alert("Copied Successfully!");
}

function clearText(){

    input.value = "";

    localStorage.removeItem(
        "savedText"
    );

    analyze();
}

function toggleTheme(){

    document.body.classList.toggle(
        "dark"
    );
}