export default async function Page() {
  await new Promise((res) => setTimeout(res, 3000))
  return <p>Invoices Page</p>;
}