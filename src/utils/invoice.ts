"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Invoice } from "@/types";
import { formatArabicDate } from "@/utils/dates";

export function createInvoiceFromClient(input: Omit<Invoice, "id" | "invoiceNumber" | "createdAt">): Invoice {
  const serial = Date.now().toString().slice(-6);
  return {
    ...input,
    id: `inv-${serial}`,
    invoiceNumber: `ND-${new Date().getFullYear()}-${serial}`,
    createdAt: new Date().toISOString().slice(0, 10),
  };
}

export function downloadInvoicePdf(invoice: Invoice) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  doc.setFont("helvetica");
  doc.setTextColor("#0f172a");
  doc.setFontSize(20);
  doc.text("Nitaaq Data | نطاق داتا", 105, 20, { align: "center" });
  doc.setFontSize(11);
  doc.text(`Invoice: ${invoice.invoiceNumber}`, 190, 34, { align: "right" });
  doc.text(`Date: ${formatArabicDate(invoice.createdAt)}`, 190, 42, { align: "right" });

  autoTable(doc, {
    startY: 54,
    head: [["Field", "Value"]],
    body: [
      ["Client", invoice.clientName],
      ["Phone", invoice.clientPhone],
      ["Service", invoice.serviceName],
      ["Subscription type", invoice.subscriptionType],
      ["Duration", invoice.duration],
      ["Start date", invoice.startDate],
      ["End date", invoice.endDate],
      ["Payment method", invoice.paymentMethod],
      ["Notes", invoice.notes ?? "-"],
    ],
    styles: { halign: "right", font: "helvetica" },
    headStyles: { fillColor: [15, 118, 255] },
  });

  autoTable(doc, {
    startY: (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8,
    head: [["Subtotal", "Tax", "Total"]],
    body: [[`${invoice.subtotal} SAR`, `${invoice.tax ?? 0} SAR`, `${invoice.total} SAR`]],
    styles: { halign: "center", font: "helvetica" },
    headStyles: { fillColor: [15, 23, 42] },
  });

  doc.setFontSize(12);
  doc.text("Thank you for choosing Nitaaq Data", 105, 282, { align: "center" });
  doc.save(`${invoice.invoiceNumber}.pdf`);
}

