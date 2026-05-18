const input = document.getElementById("cmd");
const output = document.getElementById("output");

let loggedIn = false;
let username = "Guest";

// CLOCK
function updateClock() {
  document.getElementById("clock").textContent = new Date().toLocaleString();
}
setInterval(updateClock, 1000);
updateClock();

// ARTIFACT DATABASE
const artifacts = [
  { id: "001", name: "ORIGIN NODE", link: "pages/artifact-001.html" },
  { id: "002", name: "BLACK SIGNAL", link: "pages/artifact-002.html" },
  { id: "003", name: "NULL ECHO", link: "pages/artifact-003.html" }
];

function showArtifacts() {
  let html = "<h3>ARTIFACT DATABASE</h3><ul>";
  artifacts.forEach(a => {
    html += `<li>[${a.id}] <a href=\"${a.link}\">${a.name}</a></li>`;
  });
  html += "</ul>";
  return html;
}

function setPrompt() {
  document.getElementById("prompt").textContent = `[ ${username}@s80.host : ~ ]`;
}

input.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;

  const cmd = input.value.trim();

  const line = document.createElement("p");
  line.textContent = ">> " + cmd;
  output.appendChild(line);

  const res = document.createElement("p");

  // LOGIN SYSTEM
  if (!loggedIn) {
    const logins = {
      "login operator": "operator",
      "login analyst": "analyst",
      "login observer": "observer",
      "login admin": "admin"
    };

    if (logins[cmd]) {
      loggedIn = true;
      username = logins[cmd];

      document.getElementById("userline").textContent = `You're logged in as "${username}"`;

      document.body.classList.add("logged-in");

      setPrompt();
      res.textContent = "ACCESS GRANTED";
    } else {
      res.innerHTML = `ACCESS REQUIRED<br><br>Available logins:<br>- login operator<br>- login analyst<br>- login observer<br>- login admin`;
    }

    output.appendChild(res);
    input.value = "";
    return;
  }

  // COMMANDS AFTER LOGIN
  if (cmd === "help") {
    res.textContent = "Commands: help, artifacts, clear, status";
  }

  else if (cmd === "status") {
    res.textContent = "PROJECT DARKSTATE: ONLINE // NODE LINK STABLE";
  }

  else if (cmd === "clear") {
    output.innerHTML = "";
    input.value = "";
    return;
  }

  else if (cmd === "artifacts") {
    const div = document.createElement("div");
    div.innerHTML = showArtifacts();
    output.appendChild(div);
    input.value = "";
    return;
  }

  else {
    res.textContent = "UNKNOWN COMMAND";
  }

  output.appendChild(res);
  input.value = "";
});
