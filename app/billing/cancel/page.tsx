export default async function BillingSuccessPage({
    searchParams,
  }: {
    searchParams: Promise<{ session_id?: string }>;
  }) {
    const { session_id } = await searchParams;
  
    return (
      <main style={{ padding: 24 }}>
        <h1>Billing Success</h1>
        <p>Checkout session: {session_id ?? "(missing)"}</p>
        <p>You can close this tab and return to the app.</p>
      </main>
    );
  }
  