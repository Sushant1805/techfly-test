'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Modal } from '@/components/ui/Modal';
import { Search, Download, FilePlus, Eye, Bell } from 'lucide-react';
import { invoices } from '@/lib/mockData';

export default function Invoices() {
  const [selectedInvoice, setSelectedInvoice] = useState<(typeof invoices)[0] | null>(null);

  const stats = [
    { label: "Total Invoiced", value: "₹3.2L", color: "text-[#5E4E99]" },
    { label: "Collected", value: "₹2.8L", color: "text-green-600" },
    { label: "Outstanding", value: "₹40,000", color: "text-red-500" },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          <Button className="gap-2">
            <FilePlus className="w-4 h-4" /> Generate Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500 mb-2">{stat.label}</p>
              <h3 className={`text-3xl font-bold ${stat.color}`}>{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-100 justify-between">
          <div className="relative w-full sm:w-[320px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by institute or invoice #..." 
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#5E4E99]"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 outline-none">
              <option>All Status</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Institute</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-semibold text-gray-600">{inv.id}</TableCell>
                <TableCell className="font-medium text-gray-900">{inv.institute}</TableCell>
                <TableCell className="text-gray-500">{inv.date}</TableCell>
                <TableCell className="text-gray-500">{inv.dueDate}</TableCell>
                <TableCell className="font-semibold text-gray-900">₹{inv.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant="default" className="bg-gray-100 text-gray-700">{inv.plan}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={inv.status as any}>{inv.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View" onClick={() => setSelectedInvoice(inv)}>
                      <Eye className="w-4 h-4 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Download PDF">
                      <Download className="w-4 h-4 text-gray-500" />
                    </Button>
                    {inv.status !== 'Paid' && (
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-500" title="Send Reminder">
                        <Bell className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Modal isOpen={!!selectedInvoice} onClose={() => setSelectedInvoice(null)} title="Invoice Details" maxWidth="600px">
        {selectedInvoice && (
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedInvoice.institute}</h3>
                <p className="text-gray-500 text-sm mt-1">Invoice {selectedInvoice.id}</p>
              </div>
              <Badge variant={selectedInvoice.status as any}>{selectedInvoice.status}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Date of Issue</p>
                <p className="text-sm text-gray-900 font-medium">{selectedInvoice.date}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Due Date</p>
                <p className="text-sm text-gray-900 font-medium">{selectedInvoice.dueDate}</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                  <tr>
                    <th className="py-2 px-4 font-medium">Description</th>
                    <th className="py-2 px-4 font-medium text-center">Period</th>
                    <th className="py-2 px-4 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-900 font-medium">{selectedInvoice.plan} Subscription</td>
                    <td className="py-3 px-4 text-gray-500 text-center">1 Month</td>
                    <td className="py-3 px-4 text-gray-900 text-right">₹{selectedInvoice.amount.toLocaleString()}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50">
                    <td colSpan={2} className="py-3 px-4 font-bold text-gray-900 text-right">Total Due</td>
                    <td className="py-3 px-4 font-bold text-gray-900 text-right text-lg text-[#5E4E99]">₹{selectedInvoice.amount.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" className="gap-2"><Download className="w-4 h-4" /> Download PDF</Button>
              {selectedInvoice.status !== 'Paid' && (
                <>
                  <Button variant="outline" className="gap-2 text-blue-600 border-blue-200 hover:bg-blue-50">
                    <Bell className="w-4 h-4" /> Send Reminder
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">Mark as Paid</Button>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
