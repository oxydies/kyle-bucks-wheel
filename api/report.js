export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { name, lostBucks } = req.body;
  
  if (!name || !lostBucks) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    // Send email using Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Kyle Bucks Alert <onboarding@resend.dev>',
        to: 'kyle.allen@ncino.com',
        subject: `🚨 Kyle Bucks Complaint from ${name}`,
        html: `
          <h2>New Kyle Bucks Discrepancy Report</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Claims they lost:</strong> ${lostBucks} Kyle Bucks</p>
          <hr>
          <p><em>They successfully completed the 25-question complaint form. That's dedication.</em></p>
        `
      })
    });
    
    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      throw new Error('Email failed');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send report' 
    });
  }
}
