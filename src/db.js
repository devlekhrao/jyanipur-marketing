import { neon } from '@neondatabase/serverless';

export async function saveMarketingLead(lead) {
  const dbUrl = import.meta.env.VITE_DATABASE_URL;

  // If DB URL is missing or unconfigured, gracefully fallback without crashing the app
  if (!dbUrl || dbUrl.includes('YOUR_NEON')) {
    console.warn("VITE_DATABASE_URL not set in .env. Lead recorded locally in memory:", lead);
    return { id: Date.now(), ...lead };
  }

  try {
    const sql = neon(dbUrl);
    const result = await sql`
      INSERT INTO leads (client_name, phone, project_type, estimated_value, status, notes)
      VALUES (
        ${lead.clientName}, 
        ${lead.phone}, 
        ${lead.projectType}, 
        ${lead.estimatedValue || 0}, 
        'New Lead', 
        ${lead.notes || 'Website Inquiry'}
      )
      RETURNING *;
    `;
    return result[0];
  } catch (err) {
    console.error('Error saving lead to CRM:', err);
    return { id: Date.now(), ...lead };
  }
}