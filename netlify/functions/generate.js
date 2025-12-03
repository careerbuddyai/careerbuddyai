export async function handler(event) {
  try {
    const { jd, resume } = JSON.parse(event.body || "{}");

    if (!jd || !resume) {
      return {
        statusCode: 400,
        body: "JD or Resume missing"
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
            content:
              `Job Description:\n${jd}\n\nResume:\n${resume}\n\nGenerate 10 interview questions.`
          }
        ]
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ result: data.choices?.[0]?.message?.content || "" })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: "Error: " + err.toString()
    };
  }
}