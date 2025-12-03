async function generateQuestions() {
  const jd = document.getElementById("jd").value;
  const resume = document.getElementById("resume").value;

  const resultBox = document.getElementById("result");
  resultBox.textContent = "Generating...";

  try {
    const response = await fetch("/.netlify/functions/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jd, resume }),
    });

    const data = await response.json();

    if (data.error) {
      resultBox.textContent = "Error: " + data.error;
      return;
    }

    resultBox.textContent = data.result;

  } catch (e) {
    resultBox.textContent = "Failed: " + e.message;
  }
}
