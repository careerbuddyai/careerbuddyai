async function generate() {
  const jd = document.getElementById('jd').value;
  const resume = document.getElementById('resume').value;

  document.getElementById('output').innerText = "Generating...";

  const response = await fetch('/.netlify/functions/generate', {
    method: 'POST',
    body: JSON.stringify({ jd, resume })
  });

  const text = await response.text();
  document.getElementById('output').innerText = text;
}
