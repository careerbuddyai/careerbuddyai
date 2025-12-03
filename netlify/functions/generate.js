export async function handler(event) {
  try {
    const { jd, resume } = JSON.parse(event.body || "{}");

    if (!jd || !resume) {
      return { statusCode: 400, body: "JD or Resume missing." };
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, body: "API Key missing on server." };
    }

    const prompt = `
Using the JD and Resume below, generate interview questions in 3 categories:

### 🔵 Technical Questions (10–20)
### 🟢 HR / Behavioral Questions (10–20)
### 🟣 Resume-Based Questions (10–20)

JD:
${jd}

RESUME:
${resume}
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: data.choices?.[0]?.message?.content || "No output."
    };
  }

  catch (e) {
    return { statusCode: 500, body: "Server error: " + e.message };
  }
}