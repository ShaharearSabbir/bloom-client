import EarningsChart from "@/components/modules/dashboard/tutor/EarningsEhart";
import EarningsStats from "@/components/modules/dashboard/tutor/EarningsStats";
import TransactionHistory from "@/components/modules/dashboard/tutor/TransactionHistory";

export default function EarningsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Earnings</h1>
        <p className="text-muted-foreground">
          Track your revenue, managed by the Bloom platform.
        </p>
      </div>

      {/* Summary Cards */}
      <EarningsStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Visualization */}
        <div className="lg:col-span-2">
          <EarningsChart />
        </div>

        {/* Payout Information */}
        <div className="space-y-6">
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
}
