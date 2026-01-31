const subjectsDiv = document.getElementById("subjects");

/* Default 6 subjects */
for (let i = 0; i < 6; i++) addSubject();

function addSubject() {
  const div = document.createElement("div");
  div.className = "subject";
  div.innerHTML = `
        <input placeholder="Subject Name">
        <input type="number" class="credits" placeholder="Cr">
        <select class="grade">
            <option value="4">A+</option>
            <option value="4">A</option>
            <option value="3.7">A-</option>
            <option value="3.3">B+</option>
            <option value="3">B</option>
            <option value="2.7">B-</option>
            <option value="2.3">C+</option>
            <option value="2">C</option>
            <option value="1.7">C-</option>
            <option value="1">D</option>
            <option value="0">I</option>
            <option value="0">F</option>
            <option value="T">T</option>
            <option value="X">X</option>
        </select>

        <button class="small-btn" onclick="this.parentElement.remove()">❌</button>
    `;
  subjectsDiv.appendChild(div);
}

function calculateSGPA() {
  const credits = document.querySelectorAll(".credits");
  const grades = document.querySelectorAll(".grade");

  let totalCredits = 0;
  let totalPoints = 0;

  credits.forEach((c, i) => {
    let cr = parseFloat(c.value);
    let g = grades[i].value;

    if (isNaN(cr)) return;
    if (g === "T" || g === "X") return;

    totalCredits += cr;
    totalPoints += cr * parseFloat(g);
  });

  if (totalCredits === 0) {
    sgpaResult.innerText = "Please enter valid data";
    return;
  }

  let sgpa = (totalPoints / totalCredits).toFixed(2);
  sgpaResult.innerText = "SGPA: " + sgpa;
  creditResult.innerText = "Total Credits: " + totalCredits;

  saveHistory(sgpa);
}

function saveHistory(sgpa) {
  let history = JSON.parse(localStorage.getItem("sgpaHistory")) || [];
  history.push(sgpa);
  localStorage.setItem("sgpaHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  let history = JSON.parse(localStorage.getItem("sgpaHistory")) || [];
  document.getElementById("history").innerHTML =
    "<b>SGPA History:</b><br>" + history.join(" , ");
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

renderHistory();
