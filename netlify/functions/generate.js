import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { jd, resume } = JSON.parse(event.body);

    const payload = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content:
            `Job Description:\n${jd}\n\nResume:\n${resume}\n\nGenerate 10 relevant interview questions.`
        }
      ]
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    // Log API error if any
    if (data.error) {
      console.error("OpenAI Error:", data.error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: data.error.message })
      };
    }

    return {
      statusCode: 200,
      body: data.choices[0].message.content
    };

  } catch (err) {
    console.error("Function crashed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
