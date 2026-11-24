
const KEY="ubuntu26041LaborV1";
const modules=[...document.querySelectorAll(".module")];
const nameInput=document.getElementById("studentName");
const classInput=document.getElementById("studentClass");

function getState(){try{return JSON.parse(localStorage.getItem(KEY)||"{}")}catch(e){return {}}}
function saveState(){
 const s={name:nameInput.value,cls:classInput.value,
 modules:modules.map(m=>m.querySelector(".module-check input").checked),
 evidence:[...document.querySelectorAll(".evidence-check input")].map(x=>x.checked)};
 localStorage.setItem(KEY,JSON.stringify(s));updateProgress();
}
function updateProgress(){
 const done=modules.filter(m=>m.querySelector(".module-check input").checked).length;
 const pct=Math.round(done/modules.length*100);
 document.getElementById("progressBar").style.width=pct+"%";
 document.getElementById("progressLabel").textContent=pct+"%";
 document.getElementById("moduleCount").textContent=`${done} / ${modules.length} kész`;
}
function applyState(){
 const s=getState();nameInput.value=s.name||"";classInput.value=s.cls||"";
 modules.forEach((m,i)=>{const cb=m.querySelector(".module-check input");cb.checked=!!(s.modules&&s.modules[i]);m.classList.toggle("completed",cb.checked);});
 document.querySelectorAll(".evidence-check input").forEach((cb,i)=>cb.checked=!!(s.evidence&&s.evidence[i]));
 updateProgress();
}

const evidence=document.getElementById("evidenceChecklist");
for(let i=1;i<=30;i++){
 const l=document.createElement("label");l.className="evidence-check";
 const c=document.createElement("input");c.type="checkbox";c.addEventListener("change",saveState);
 const s=document.createElement("span");s.textContent=`K${String(i).padStart(2,"0")} elkészült és bekerült a dokumentációba`;
 l.append(c,s);evidence.append(l);
}
nameInput.addEventListener("input",saveState);classInput.addEventListener("input",saveState);
modules.forEach(m=>m.querySelector(".module-check input").addEventListener("change",e=>{m.classList.toggle("completed",e.target.checked);saveState()}));
document.getElementById("resetProgress").onclick=()=>{if(confirm("Biztosan törlöd a helyben mentett haladást?")){localStorage.removeItem(KEY);location.reload()}};
document.getElementById("printBtn").onclick=()=>window.print();
document.querySelectorAll("[data-copy]").forEach(box=>{const b=box.querySelector("button");b.onclick=async()=>{const t=box.querySelector("code").innerText;try{await navigator.clipboard.writeText(t)}catch(e){const ta=document.createElement("textarea");ta.value=t;document.body.append(ta);ta.select();document.execCommand("copy");ta.remove()}const old=b.textContent;b.textContent="Másolva";setTimeout(()=>b.textContent=old,900);};});
const QUIZZES={"q1": [["Mit jelent a NAT adapter szerepe ebben a laborban?", ["Az Ubuntu szerver internetelérését biztosítja", "A Windows kliens DHCP-címét adja", "FTP-megosztást készít"], 0], ["Mi az UBUNTULAB?", ["DNS-zóna", "VirtualBox Internal Network neve", "Linux felhasználócsoport"], 1], ["Melyik parancs mutatja tömören az IP-címeket?", ["ip -br address", "apt search", "passwd"], 0]], "q2": [["Mivel konfiguráljuk tartósan az Ubuntu Server hálózatát?", ["Netplan YAML-fájlokkal az /etc/netplan alatt", "/var/www/html fájlokkal", "Kizárólag az ip parancs ideiglenes beállításaival"], 0], ["Melyik port az SSH alapértelmezett portja?", ["21", "22", "80"], 1], ["Miért nincs gateway a belső interfészen?", ["Mert a default route a NAT interfészen marad", "Mert a Windows adja", "Mert Ubuntu nem használ gatewayt"], 0]], "q3": [["Mit jelent könyvtárnál az x jogosultság?", ["Belépés/útvonalon haladás", "Tömörítés", "Titkosítás"], 0], ["Mit jelent a 2770 elején a 2?", ["setgid", "setuid", "sticky bit"], 0], ["Ki írhat a root:projekt, 2770 könyvtárba?", ["Mindenki", "A projekt csoport tagjai és root", "Csak a vendeg"], 1], ["Miért fontos a negatív jogosultságteszt?", ["Bizonyítja, hogy a tiltás is működik", "Gyorsítja a hálózatot", "DNS-t frissít"], 0]], "q4": [["Melyik modern DHCP-szervert használjuk?", ["Kea DHCP4", "Apache2", "BIND9"], 0], ["Mit jelent a DHCP pool?", ["Kiosztható IP-tartomány", "FTP mappa", "DNS rekord"], 0], ["Mit jelent Windows alatt a 169.254.x.x cím?", ["APIPA: nem kapott DHCP-címet", "Sikeres DNS", "Statikus szervercím"], 0]], "q5": [["Melyik DNS rekord ad név → IPv4 feloldást?", ["A", "PTR", "MX"], 0], ["Melyik rekord kell reverse lookuphoz?", ["TXT", "PTR", "CNAME"], 1], ["Mi a labor DNS-zónája?", ["lab.test", "ubuntu.com", "localhost"], 0], ["Melyik parancs ellenőrzi a BIND zónafájlt?", ["named-checkzone", "chmod", "apt"], 0]], "q6": [["Miért csak belső laborban használjuk az FTP-t?", ["Alapból nem titkosít", "Nem használ TCP-t", "Nem ismer felhasználót"], 0], ["Melyik közös mappába írhat anna és bela?", ["/srv/ftp/kozos", "/root", "/boot"], 0], ["Melyik daemon az Ubuntu FTP-szerverünk?", ["vsftpd", "sshd", "named"], 0], ["Melyik port az FTP vezérlőkapcsolat alapportja?", ["21", "22", "53"], 0]], "q7": [["Mi az Ubuntu Apache szolgáltatás neve?", ["apache2", "httpd", "webd"], 0], ["Melyik port az alap HTTP?", ["80", "22", "67"], 0], ["Miért működik a www.lab.test?", ["BIND A rekord a szerver IP-jére mutat", "Kea weboldalt oszt", "PuTTY átírja"], 0]], "q8": [["Melyik tűzfalszabály-rendszert gyakoroljuk közvetlenül Ubuntu alatt?", ["nftables", "firewalld kötelezően", "iptables-services"], 0], ["Melyik parancs listázza a teljes nftables szabálykészletet?", ["nft list ruleset", "ipconfig /all", "apt update"], 0], ["Mi a helyes hibakeresés első lépése?", ["IP és kapcsolat ellenőrzése", "Újratelepítés", "Minden szabály törlése"], 0]]};
document.querySelectorAll(".mini-quiz").forEach(box=>{
 const id=box.dataset.quiz,data=QUIZZES[id];let html="<h4>Gyors önellenőrzés</h4>";
 data.forEach((q,qi)=>{html+=`<div class="quiz-q" data-answer="${q[2]}"><p>${qi+1}. ${q[0]}</p>`;q[1].forEach((a,ai)=>html+=`<label><input type="radio" name="${id}_${qi}" value="${ai}"> ${a}</label>`);html+="</div>";});
 html+=`<div class="quiz-actions"><button class="quiz-check">Ellenőrzés</button><span class="quiz-result"></span></div>`;box.innerHTML=html;
 box.querySelector(".quiz-check").onclick=()=>{let score=0;box.querySelectorAll(".quiz-q").forEach(q=>{q.classList.remove("correct-answer","wrong-answer");const p=q.querySelector("input:checked");if(p&&Number(p.value)===Number(q.dataset.answer)){score++;q.classList.add("correct-answer")}else q.classList.add("wrong-answer");});box.querySelector(".quiz-result").textContent=`${score} / ${data.length} helyes`;}
});
function validUrl(u){return typeof u==="string" && /^https?:\/\//i.test(u)}
function setupDownloads(){
 const cfg=window.LAB_CONFIG||{};
 const items=[
  ["ubuntu",cfg.ubuntuOva],
  ["windows",cfg.windowsOva],
  ["doc",cfg.documentationTemplate]
 ];
 for(const [id,obj] of items){
  if(!obj) continue;
  const title=document.querySelector(`[data-dl-title="${id}"]`); if(title) title.textContent=obj.title||"Letöltés";
  const meta=document.querySelector(`[data-dl-meta="${id}"]`); if(meta) meta.textContent=[obj.filename,obj.size].filter(Boolean).join(" • ");
  const hash=document.querySelector(`[data-dl-hash="${id}"]`); if(hash) hash.textContent=obj.sha256?`SHA256: ${obj.sha256}`:"";
  const a=document.querySelector(`[data-dl-link="${id}"]`);
  if(a){
    const ok=id==="doc" ? !!obj.url : validUrl(obj.url);
    if(ok){a.href=obj.url;a.classList.remove("disabled");a.textContent="Letöltés / megnyitás";}
    else{a.removeAttribute("href");a.classList.add("disabled");a.textContent="A tanár még nem állította be a linket";}
  }
 }
 const lab=document.querySelectorAll("[data-config-lab]"); lab.forEach(x=>x.textContent=cfg.labNetwork||"UBUNTULAB");
 const ip=document.querySelectorAll("[data-config-ip]"); ip.forEach(x=>x.textContent=cfg.serverIp||"192.168.60.1/24");
}
setupDownloads();applyState();
