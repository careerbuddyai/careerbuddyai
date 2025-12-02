import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { jd, resume } = JSON.parse(event.body);

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
            content: `Job Description: ${jd}\nResume: ${resume}\nGenerate 10 interview questions only.`
          }
        ]
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "OpenAI API Error", details: data })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ questions: data.choices[0].message.content })
    };
  }
  catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
