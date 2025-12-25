let issues = [];
const logs = document.getElementById("logs");

function log(msg){
  const d = document.createElement("div");
  d.innerText = new Date().toLocaleTimeString() + " - " + msg;
  logs.prepend(d);
}

userRole.onchange = function(){
  citizenPanel.classList.add("hidden");
  govPanel.classList.add("hidden");
  workerPanel.classList.add("hidden");

  if(this.value === "Citizen") citizenPanel.classList.remove("hidden");
  if(this.value === "Government Official") govPanel.classList.remove("hidden");
  if(this.value === "Worker") workerPanel.classList.remove("hidden");

  renderTables();
};

cPhoto.onchange = e => {
  cPreview.src = URL.createObjectURL(e.target.files[0]);
  cPreview.classList.remove("hidden");
};

function submitIssue(){
  const issue = {
    title: cTitle.value,
    zone: cZone.value,
    status: "Pending"
  };
  issues.push(issue);
  log("Citizen reported issue: " + issue.title);
  renderTables();
  cTitle.value = "";
  cDesc.value = "";
  cPreview.classList.add("hidden");
}

function assignIssue(i){
  issues[i].status = "Assigned";
  log("Government assigned issue: " + issues[i].title);
  renderTables();
}

function resolveIssue(i){
  issues[i].status = "Resolved";
  log("Worker resolved issue: " + issues[i].title);
  renderTables();
}

function renderTables(){
  govTable.innerHTML = "";
  workerTable.innerHTML = "";

  issues.forEach((iss,i)=>{
    const g = document.createElement("tr");
    g.innerHTML = `
      <td>${iss.title}</td>
      <td>${iss.zone}</td>
      <td class="status-${iss.status.toLowerCase()}">${iss.status}</td>
      <td>${iss.status==="Pending" ? 
        `<button onclick="assignIssue(${i})">Assign</button>` : ""}</td>`;
    govTable.appendChild(g);

    if(iss.status==="Assigned"){
      const w = document.createElement("tr");
      w.innerHTML = `
        <td>${iss.title}</td>
        <td>${iss.zone}</td>
        <td class="status-assigned">Assigned</td>
        <td><button onclick="resolveIssue(${i})">Resolve</button></td>`;
      workerTable.appendChild(w);
    }
  });
}