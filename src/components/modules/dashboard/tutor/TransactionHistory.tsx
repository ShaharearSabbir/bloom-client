"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const transactions = [
  {
    id: "TX-901",
    student: "Alice L.",
    amount: 50.0,
    date: "Feb 4",
    status: "Paid",
  },
  {
    id: "TX-899",
    student: "Bob M.",
    amount: 35.0,
    date: "Feb 3",
    status: "Paid",
  },
  {
    id: "TX-895",
    student: "Charlie K.",
    amount: 60.0,
    date: "Feb 1",
    status: "Processing",
  },
];

export default function TransactionHistory() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-3 rounded-lg bg-accent/30 text-sm"
          >
            <div>
              <p className="font-semibold">{tx.student}</p>
              <p className="text-xs text-muted-foreground">{tx.date}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-emerald-600">
                +${tx.amount.toFixed(2)}
              </p>
              <Badge variant="outline" className="text-[10px] py-0 h-4">
                {tx.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
