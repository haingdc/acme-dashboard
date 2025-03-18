import { neon } from '@neondatabase/serverless';
// import process from 'node:process'


// const sql = neon(process.env.POSTGRES_URL!);
const sql = neon("postgres://neondb_owner:npg_iXpeAgQLrY74@ep-nameless-recipe-a168bzgy-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require");

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
}

export async function GET() {
  try {
  	return Response.json(await listInvoices());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
