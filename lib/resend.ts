import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY');
}

export const resend = new Resend(RESEND_API_KEY);

const FROM_EMAIL = 'hello@salepulse.ai';

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Welcome to SalesPulse AI',
      html: `
        <h1>Welcome to SalesPulse AI, ${name}!</h1>
        <p>We're excited to have you on board.</p>
        <p>Get started by creating your first video campaign in your dashboard.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard">Go to Dashboard</a>
      `,
    });

    return response;
  } catch (error) {
    console.error('Resend error:', error);
    throw error;
  }
}

export async function sendWeeklyDigest(
  email: string,
  name: string,
  stats: {
    videosGenerated: number;
    replies: number;
    conversions: number;
    conversionRate: number;
  }
) {
  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Your SalesPulse AI Weekly Digest',
      html: `
        <h2>Your Weekly Report, ${name}</h2>
        <p>Here's how your campaigns performed this week:</p>
        <ul>
          <li>Videos Generated: ${stats.videosGenerated}</li>
          <li>Replies: ${stats.replies}</li>
          <li>Conversions: ${stats.conversions}</li>
          <li>Conversion Rate: ${stats.conversionRate.toFixed(2)}%</li>
        </ul>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/analytics">View Full Analytics</a>
      `,
    });

    return response;
  } catch (error) {
    console.error('Resend error:', error);
    throw error;
  }
}

export async function sendBillingEmail(
  email: string,
  name: string,
  invoiceUrl: string,
  amount: number
) {
  try {
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Invoice received - SalesPulse AI',
      html: `
        <h2>Invoice for ${name}</h2>
        <p>We've received a payment of $${(amount / 100).toFixed(2)}.</p>
        <a href="${invoiceUrl}">Download Invoice</a>
      `,
    });

    return response;
  } catch (error) {
    console.error('Resend error:', error);
    throw error;
  }
}
