"use client";

import { Bar, BarChart, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useSyncExternalStore } from "react";
import { Card } from "@/components/ui";
import type { Client, Invoice } from "@/types";

const colors = ["#06b6d4", "#2563eb", "#8b5cf6", "#22c55e", "#f97316"];

export function ChartsPanel({ clients, invoices }: { clients: Client[]; invoices: Invoice[] }) {
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const revenue = invoices.map((invoice) => ({ name: invoice.createdAt.slice(5), value: invoice.total }));
  const months = clients.map((client) => ({ name: client.addedAt.slice(5), value: client.price }));
  const types = Object.entries(
    clients.reduce<Record<string, number>>((acc, client) => {
      acc[client.subscriptionType] = (acc[client.subscriptionType] ?? 0) + 1;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));

  if (!mounted) {
    return (
      <div className="grid gap-5 xl:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <Card key={item}>
            <div className="h-64 animate-pulse rounded-lg bg-slate-100 dark:bg-white/10" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <Card>
        <h3 className="mb-4 font-black">الاشتراكات حسب الشهر</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={months}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card>
        <h3 className="mb-4 font-black">الإيرادات</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenue}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="value" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card>
        <h3 className="mb-4 font-black">توزيع الأنواع</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={types} dataKey="value" nameKey="name" innerRadius={50} outerRadius={88} paddingAngle={4}>
                {types.map((_, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
