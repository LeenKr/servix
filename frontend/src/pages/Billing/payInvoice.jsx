// src/pages/Billing/PayInvoice.jsx
import { useEffect, useState } from "react";
const API = import.meta.env.VITE_API_BASE_URL || "";

export default function PayInvoice() {
  const inv = new URLSearchParams(location.search).get("inv");
  const [invoice, setInvoice] = useState(null);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (!inv) return;
    const load = async () => {
      const r = await fetch(`${API}/payments/invoice/${inv}`, { credentials: "include" });
      const j = await r.json();
      setInvoice(j);
      setStatus(j.status);
    };
    load();
    const t = setInterval(load, 3000);
    return () => clearInterval(t);
  }, [inv]);

  async function payTap() {
    const r = await fetch(`${API}/payments/tap/create-charge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ invoiceId: inv })
    });
    const j = await r.json();
    if (!r.ok || j.ok === false) return alert(j.message || "Failed to start Tap payment");
    if (j.paymentUrl) window.open(j.paymentUrl, "_blank");
  }

  function payWhish() {
    alert("Whish coming next 👀");
  }

  if (!inv) return <div className="p-6">Missing invoice id.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Complete your payment</h1>

      <div className="rounded-lg border p-4">
        <p>Invoice: <b>{inv}</b></p>
        <p>Amount: <b>{(invoice?.amount_cents||0)/100} {invoice?.currency||"USD"}</b></p>
        <p>Status: <b className="uppercase">{status}</b></p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <button onClick={payTap} className="rounded-lg border px-4 py-3 hover:bg-slate-50">
          Pay by Card (Tap)
        </button>
        <button onClick={payWhish} className="rounded-lg border px-4 py-3 hover:bg-slate-50">
          Pay by Wallet (Whish)
        </button>
      </div>

      {status === "paid" && (
        <div className="rounded-lg border border-green-300 bg-green-50 p-4">
          🎉 Payment received. <a className="text-blue-600 underline" href="/admin">Go to dashboard</a>.
        </div>
      )}
    </div>
  );
}
