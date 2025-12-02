document.getElementById("generateBtn").onclick = async () => {
  const jd = document.getElementById("jd").value;
  const resume = document.getElementById("resume").value;

  const res = await fetch("/.netlify/functions/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jd, resume })
  });

  const data = await res.json();
  document.getElementById("output").innerText = data.questions || data.error;
};
