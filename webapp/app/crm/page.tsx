'use client';
import React from 'react';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { crmLeadsMock } from '@/lib/mockData';

export default function CRMPipeline() {
  const columns = ['New Leads', 'Contacted', 'Demo Done', 'Converted'];

  return (
    <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <h2 className="text-lg font-semibold text-gray-800">Sales Pipeline</h2>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Add Lead
        </Button>
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {columns.map(column => {
          const cards = crmLeadsMock[column as keyof typeof crmLeadsMock] || [];
          return (
            <div key={column} className="bg-gray-100 rounded-xl min-w-[320px] w-[320px] max-h-full flex flex-col">
              <div className="p-4 border-b border-gray-200/50 flex items-center justify-between shrink-0">
                <h3 className="font-medium text-gray-800">{column}</h3>
                <span className="bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full">
                  {cards.length}
                </span>
              </div>
              <div className="p-4 flex-1 overflow-y-auto space-y-3 drop-zone">
                {cards.map((card, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
                    <h4 className="font-bold text-gray-900 mb-1">{card.institute}</h4>
                    <p className="text-sm text-gray-600 mb-3">{card.contact} • {card.phone}</p>
                    <div className="bg-amber-50 text-amber-700 text-xs px-2.5 py-1.5 rounded-md inline-block w-full">
                      {card.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
