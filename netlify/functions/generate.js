import fetch from "node-fetch";

export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body || "{}");
    const { jd, resume } = body;

    if (!jd || !resume) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing JD or Resume" })
      };
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `
            JD: ${jd}
            Resume: ${resume}
            Generate 10 interview questions only.
            `,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "OpenAI response error", data }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ result: data.choices[0].message.content }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
