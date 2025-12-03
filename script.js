async function loadFile(inputId, textareaId) {
  const fileInput = document.getElementById(inputId);
  const textarea = document.getElementById(textareaId);

  if (!fileInput.files.length) {
    alert("Please select a file!");
    return;
  }

  textarea.value = "Extracting text... Please wait...";

  const file = fileInput.files[0];
  const base64 = await toBase64(file);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_OPENAI_KEY", 
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: [
          { type: "text", text: "Extract all readable text from this document." },
          {
            type: "input_file",
            input_file: {
              data: base64,
              mime_type: file.type
            }
          }
        ]}
      ]
    })
  });

  const data = await response.json();
  textarea.value = data.choices[0].message.content.trim();
}

function toBase64(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result.split(",")[1]);
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
}

async function generate() {
  const output = document.getElementById("output");
  output.innerText = "Generating... Please wait.";

  const jd = document.getElementById("jd").value;
  const resume = document.getElementById("resume").value;

  const res = await fetch("/.netlify/functions/generate", {
    method: "POST",
    body: JSON.stringify({ jd, resume })
  });

  const text = await res.text();
  output.innerText = text;
}
