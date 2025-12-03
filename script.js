document.getElementById("generateBtn").onclick = async () => {
  const jd = document.getElementById("jd").value;
  const resume = document.getElementById("resume").value;

 fetch("/.netlify/functions/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jd, resume })
})
.then(res => res.json())
.then(data => {
    document.getElementById("output").innerText = data.text;
});

