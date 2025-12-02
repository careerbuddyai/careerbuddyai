document.getElementById("generateBtn").onclick = async function () {
  const jd = document.getElementById("jd").value.trim();
  const resume = document.getElementById("resume").value.trim();

  if (!jd || !resume) {
    alert("Please paste both job description and resume.");
    return;
  }

  try {
    const response = await fetch("/.netlify/functions/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jd, resume })
    });

    const result = await response.text();
    document.getElementById("output").innerText = result;

  } catch (err) {
    document.getElementById("output").innerText = "Error: " + err.message;
  }
};
