export async function handler(event) {
  try {
    console.log("🔵 Function started");

    const body = JSON.parse(event.body || "{}");
    console.log("📨 Received body:", body);

    const jd = body.jd || "";
    const resume = body.resume || "";

    if (!jd || !resume) {
      console.log("❌ Missing JD or Resume");
      return {
        statusCode: 400,
        body: "JD or Resume missing"
      };
    }

    const apiKey = process.env.OPENAI_API_KEY;
    console.log("🔑 API Key present?", apiKey ? "YES" : "NO");

    if (!apiKey) {
      return {
        statusCode: 500,
        body: "API Key missing on server!"
      };
    }

    console.log("📡 Calling OpenAI...");

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

    console.log("📬 Response status:", response.status);

    const data = await response.text();    // <-- READ RAW TEXT
    console.log("📄 Raw response from OpenAI:", data);

    let parsed;
    try {
      parsed = JSON.parse(data);
    } catch (err) {
      console.log("⚠️ JSON parse failed");
      return {
        statusCode: 500,
        body: "OpenAI returned invalid JSON: " + data
      };
    }

    if (parsed.error) {
      console.log(" OpenAI API error:", parsed.error);
      return {
        statusCode: 500,
        body: "OpenAI Error: " + JSON.stringify(parsed.error)
      };
    }

    const content = parsed.choices?.[0]?.message?.content;

    if (!content) {
      console.log(" No content from OpenAI");
      return {
        statusCode: 500,
        body: "No output received!"
      };
    }

    console.log(" Success!");
    return {
      statusCode: 200,
      body: content
    };

  } catch (err) {
    console.log(" SERVER ERROR:", err);
    return {
      statusCode: 500,
      body: "Server Error: " + err.message
    };
  }
}
