module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, overall_score, dimension_scores, top_fixes } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Missing name or email" });
  }

  const dimRows = Object.entries(dimension_scores || {})
    .map(([dim, score]) =>
      `<tr><td style="padding:8px 0;color:#5A5A5A;border-bottom:1px solid #E4E4E0;">${dim}</td><td style="padding:8px 0;text-align:right;font-family:monospace;border-bottom:1px solid #E4E4E0;">${score}/100</td></tr>`
    )
    .join("");

  const fixItems = (top_fixes || [])
    .map(
      (f, i) =>
        `<div style="border:1px solid #D9D5CA;padding:14px 16px;margin-bottom:8px;border-radius:3px;">
          <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:#3A6A5A;margin:0 0 4px;">Fix ${String(i + 1).padStart(2, "0")} — ${f.dim}</p>
          <p style="font-weight:bold;margin:0 0 4px;font-size:15px;">${f.h}</p>
          <p style="color:#5A5A5A;margin:0;font-size:13px;line-height:1.5;">${f.p}</p>
        </div>`
    )
    .join("");

  const html = `
    <div style="max-width:520px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;color:#1A1A1A;">
      <p style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#3A6A5A;">RevArc Process Check</p>
      <h1 style="font-size:26px;margin:8px 0 4px;">Hi ${name}, your score is ${overall_score}/100</h1>
      <p style="color:#5A5A5A;line-height:1.6;">Here is how your portal scored across all five dimensions:</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;border-top:1px solid #D9D5CA;border-bottom:1px solid #D9D5CA;">
        ${dimRows}
      </table>
      <h2 style="font-size:16px;margin:20px 0 8px;">Your top 3 fixes</h2>
      ${fixItems}
      <p style="margin-top:24px;">
        <a href="https://cal.com/field13-r657gn/45min" style="background:#1A1A1A;color:#FAFAF8;padding:14px 24px;text-decoration:none;display:inline-block;font-size:13px;border-radius:3px;">Book your free Process Check call →</a>
      </p>
      <p style="font-size:12px;color:#8A8A8A;margin-top:30px;border-top:1px solid #D9D5CA;padding-top:14px;">3 fixes or it is on us. — FIELD13 / RevArc</p>
    </div>
  `;

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "RevArc Process Check <onboarding@resend.dev>",
        to: [email],
        bcc: ["prajwalburug20501@gmail.com"],
        subject: `Your RevArc Process Check score: ${overall_score}/100`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      throw new Error(errText);
    }

    return res.status(200).json({ sent: true });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({ error: "Email failed to send" });
  }
};
