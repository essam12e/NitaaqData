"use client";

import ExcelJS from "exceljs";
import type { Client, Invoice, Renewal } from "@/types";

export async function exportWorkspaceToExcel(clients: Client[], invoices: Invoice[], renewals: Renewal[]) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Nitaaq Data";
  workbook.created = new Date();

  addSheet(workbook, "العملاء", clients);
  addSheet(workbook, "الفواتير", invoices);
  addSheet(workbook, "التجديدات", renewals);

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `nitaaq-data-export-${new Date().toISOString().slice(0, 10)}.xlsx`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function addSheet(workbook: ExcelJS.Workbook, name: string, rows: object[]) {
  const sheet = workbook.addWorksheet(name, { views: [{ rightToLeft: true }] });
  const columns = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
  sheet.columns = columns.map((key) => ({ header: key, key, width: Math.max(16, key.length + 4) }));
  rows.forEach((row) => sheet.addRow(row as Record<string, unknown>));
  sheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  sheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0F172A" } };
}
