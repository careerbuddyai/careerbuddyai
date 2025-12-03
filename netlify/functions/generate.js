import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { jd, resume } = JSON.parse(event.body || "{}");

    if (!jd || !resume) {
      return {
        statusCode: 400,
        body: "Missing JD or Resume input"
      };
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Job Description:\n${jd}\n\nResume:\n${resume}\n\nGenerate 10 interview questions:`
          }
        ]
      })
    });

    const data = await response.json();

    if (!data.choices) {
      return {
        statusCode: 500,
        body: JSON.stringify(data)
      };
    }

    return {
      statusCode: 200,
      body: data.choices[0].message.content
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: "Server Error: " + err.message
    };
  }
}
