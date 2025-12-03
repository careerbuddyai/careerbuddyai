async function generate() {
  const jd = document.getElementById("jd").value;
  const resume = document.getElementById("resume").value;
  const output = document.getElementById("output");

  output.textContent = "Generating questions...";

  try {
    const response = await fetch("/.netlify/functions/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ jd, resume })
    });

    const text = await response.text();
    output.textContent = text;

  } catch (err) {
    output.textContent = "Error: " + err.message;
  }
}
