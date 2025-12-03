async function generate() {
  const jd = document.getElementById("jd").value.trim();
  const resume = document.getElementById("resume").value.trim();
  const output = document.getElementById("output");

  output.textContent = "Generating... Please wait.";

  const response = await fetch("/.netlify/functions/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jd, resume })
  });

  const data = await response.json();

  output.textContent = data.result || "No output received.";
}