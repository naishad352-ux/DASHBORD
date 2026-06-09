const textarea = document.getElementById("textarea");

const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");
const lineCount = document.getElementById("lineCount");

const densityTable = document.getElementById("densityTable");
const clearBtn = document.getElementById("clearBtn");

// Create A-Z Rows
for (let i = 97; i <= 122; i++) {
    const letter = String.fromCharCode(i);

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${letter.toUpperCase()}</td>
        <td id="letter-${letter}">0</td>
    `;

    densityTable.appendChild(row);
}
// Text Analyzer
textarea.addEventListener("input", () => {

    const text = textarea.value;

    // Character Count
    const characters = text.length;

    // Word Count
    const words =
        text.trim() === ""
            ? 0
            : text.trim().split(/\s+/).length;

    // Line Count
    const lines =
        text === ""
            ? 0
            : text.split("\n").length;

    charCount.textContent = characters;
    wordCount.textContent = words;
    lineCount.textContent = lines;

    // Character Limit
    if (characters > 200) {
        charCount.style.color = "red";
    } else {
        charCount.style.color = "";
    }

    // Reset Counts
    for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i);

        document.getElementById(`letter-${letter}`)
            .textContent = 0;
    }

    // Count Letters
    for (const char of text.toLowerCase()) {

        if (char >= "a" && char <= "z") {

            const cell =
                document.getElementById(`letter-${char}`);

            cell.textContent =
                Number(cell.textContent) + 1;
        }
    }
});

// Clear Button
clearBtn.addEventListener("click", () => {

    textarea.value = "";

    charCount.textContent = 0;
    wordCount.textContent = 0;
    lineCount.textContent = 0;

    for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i);

        document.getElementById(`letter-${letter}`)
            .textContent = 0;
    }
});