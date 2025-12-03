export async function handler(event) {
  try {
    const body = JSON.parse(event.body || "{}");
    const jd = body.jd || "";
    const resume = body.resume || "";

    if (!jd || !resume) {
      return {
        statusCode: 400,
        body: "JD or Resume missing"
      };
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: "API Key missing on server!"
      };
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Job Description: ${jd}\nResume: ${resume}\nGenerate 10 interview questions.`
          }
        ]
      })
    });

    const data = await response.json();

    // Debug if API returns error
    if (!data || data.error) {
      return {
        statusCode: 500,
        body: "OpenAI Error: " + JSON.stringify(data)
      };
    }

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return {
        statusCode: 500,
        body: "No output received from OpenAI!"
      };
    }

    return {
      statusCode: 200,
      body: content
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Server Error: " + err.message
    };
  }
}
