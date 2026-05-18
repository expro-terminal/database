// Load from localStorage or default dataset
let entities = JSON.parse(localStorage.getItem("entities")) || [
  { id: "001", name: "NODE-ORIGIN", status: "ACTIVE", link: "pages/entity-001.html" },
  { id: "002", name: "NODE-BLACKOUT", status: "DEAD", link: "pages/entity-002.html" },
  { id: "003", name: "NODE-GAMMA", status: "UNKNOWN", link: "pages/entity-003.html" }
];

function listEntities() {
  let html = "<h3>ENTITY DATABASE</h3><ul>";

  entities.forEach(e => {
    html += `<li>
      [${e.id}] <a href="${e.link}">${e.name}</a> — ${e.status}
    </li>`;
  });

  html += "</ul>";
  return html;
}
