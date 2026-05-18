const input = document.getElementById("cmd");

input.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const cmd = input.value.trim();

    const line = document.createElement("p");
    line.textContent = ">> " + cmd;
    output.appendChild(line);

    handleCommand(cmd);

    input.value = "";
  }
});

function handleCommand(cmd) {
  const res = document.createElement("p");

  // LOGIN
  if (!loggedIn) {

    const logins = {
      "login operator darkstate": "operator",
      "login admin blacksite": "admin",
      "login analyst echo": "analyst",
      "login observer null": "observer"
    };

    if (logins[cmd]) {
      loggedIn = true;

      const username = logins[cmd];

      document.getElementById("userline").textContent = `You are logged in as "${username}"`;

      document.getElementById("prompt").textContent = `[ ${username}@s80.host : ~ ]`;

      // reveal background image after login
      document.getElementById("bg-image").style.opacity = "0.12";

      res.textContent = "ACCESS GRANTED";
    }

    else {
      res.innerHTML = `
      AUTH REQUIRED<br><br>
      Available identities:<br>
      - login operator darkstate<br>
      - login admin blacksite<br>
      - login analyst echo<br>
      - login observer null
      `;
    }

    output.appendChild(res);
    return;
  }

  // ENTITY DATABASE
  if (cmd === "database") {
    const div = document.createElement("div");
    div.innerHTML = listEntities();
    output.appendChild(div);
    return;
  }

  // ADMIN COMMANDS
  if (adminMode && cmd.startsWith("add ")) {
    const parts = cmd.split("|");
    // add 004|NODE-X|ACTIVE|pages/entity-004.html
    const [_, id, name, status, link] = parts;
    addEntity(id, name, status, link);
    res.textContent = "ENTITY ADDED";
  }

  else if (adminMode && cmd.startsWith("edit ")) {
    const parts = cmd.split("|");
    // edit 001|NODE-NEW|ACTIVE
    const id = parts[1];
    const name = parts[2];
    const status = parts[3];
    editEntity(id, { name, status });
    res.textContent = "ENTITY UPDATED";
  }

  else if (adminMode && cmd.startsWith("delete ")) {
    const id = cmd.split(" ")[1];
    deleteEntity(id);
    res.textContent = "ENTITY REMOVED";
  }

  else if (cmd === "help") {
    res.textContent = "Commands: database, status, clear, logout";
  }

  else if (cmd === "status") {
    res.textContent = "PROJECT DARKSTATE NETWORK ONLINE";
  }

  else if (cmd === "clear") {
    output.innerHTML = "";
    return;
  }

  else if (cmd === "logout") {
    location.reload();
    return;
  }

  else {
    res.textContent = "UNKNOWN COMMAND";
  }

  output.appendChild(res);
}
