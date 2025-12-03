async function generate() {
  const jd = document.getElementById("jd").value.trim();
  const resume = document.getElementById("resume").value.trim();
  const output = document.getElementById("output");

  if (!jd || !resume) {
    output.textContent = "Please enter both JD and Resume.";
    return;
  }

  output.textContent = "Generating... Please wait.";

  try {
    const response = await fetch("/.netlify/functions/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jd, resume }),
    });

    const text = await response.text();  // Read raw text, not JSON

    // 🔥 Debug: show raw response in console
    console.log("RAW RESPONSE:", text);

    output.textContent = text;
  } catch (err) {
    output.textContent = "Error: " + err.message;
  }
}
