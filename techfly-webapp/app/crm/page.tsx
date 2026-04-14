'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SlidePanel } from '@/components/ui/SlidePanel';
import { Flame, Plus, Filter, Phone, Mail, MapPin } from 'lucide-react';
import { crmLeads } from '@/lib/mockData';

const STAGES = ['New Lead', 'Contacted', 'Demo Done', 'Negotiation', 'Converted', 'Lost'];

export default function CRMPipeline() {
  const [leads, setLeads] = useState(crmLeads);
  const [selectedLead, setSelectedLead] = useState<(typeof crmLeads)[0] | null>(null);

  const handleStageChange = (id: string, newStage: string) => {
    setLeads(leads.map(l => l.id === id ? { ...l, stage: newStage } : l));
  };

  return (
    <div className="h-full flex flex-col space-y-4 max-w-[1600px] mx-auto -mt-2">
      {/* Toolbar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shrink-0 shadow-sm">
        <div className="flex gap-2">
          <Button className="gap-2 bg-orange-500 hover:bg-orange-600">
            <Plus className="w-4 h-4" /> Add Lead
          </Button>
        </div>
        <div className="flex gap-2 items-center">
          <input 
            type="text" 
            placeholder="Search leads..." 
            className="w-[200px] px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none"
          />
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {STAGES.map((stage) => {
          const stageLeads = leads.filter(l => l.stage === stage);
          const stageMrr = stageLeads.reduce((acc, l) => acc + l.expectedMrr, 0);

          return (
            <div key={stage} className="min-w-[300px] max-w-[300px] flex flex-col bg-gray-100/50 rounded-xl border border-gray-200">
              <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-white/50 rounded-t-xl shrink-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800 text-sm">{stage}</h3>
                  <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full font-medium">{stageLeads.length}</span>
                </div>
                <p className="text-xs font-semibold text-gray-500">₹{stageMrr / 1000}k</p>
              </div>

              <div className="flex-1 p-2 space-y-3 overflow-y-auto">
                {stageLeads.map((lead) => (
                  <div 
                    key={lead.id} 
                    className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:border-[#5E4E99] hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-900 text-sm">{lead.institute}</h4>
                      <div onClick={(e) => e.stopPropagation()}>
                        <select 
                          className="opacity-0 group-hover:opacity-100 text-[10px] bg-gray-50 border border-gray-200 rounded px-1 py-0.5 outline-none absolute right-3 mt-[-4px]"
                          value={lead.stage}
                          onChange={(e) => handleStageChange(lead.id, e.target.value)}
                        >
                          {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 mb-2 font-medium">{lead.contact} • {lead.city}</p>
                    
                    <Badge variant="default" className="bg-gray-100 text-xs py-0 mb-3">{lead.planInterest} Plan</Badge>
                    
                    <div className="p-2 bg-yellow-50 border border-yellow-100 rounded text-xs text-yellow-800 mb-3 line-clamp-2">
                      {lead.note}
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-[#EAE7F8] flex items-center justify-center">
                          <span className="text-[9px] font-bold text-[#5E4E99]">{lead.assigned.charAt(0)}</span>
                        </div>
                        <span className="text-[10px] text-gray-500">{lead.assigned}</span>
                      </div>
                      <span className="text-[10px] font-medium text-gray-400">{lead.daysInStage} days idle</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <SlidePanel isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} title="Lead Details" width="500px">
        {selectedLead && (
          <div className="space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedLead.institute}</h2>
                <Badge variant="Pending" className="text-xs">{selectedLead.stage}</Badge>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Expected MRR</p>
                <p className="text-xl font-bold text-[#5E4E99]">₹{selectedLead.expectedMrr.toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1 flex items-center gap-2"><Phone className="w-3 h-3" /> Contact</p>
                <p className="font-medium text-gray-900">{selectedLead.contact} ({selectedLead.phone})</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1 flex items-center gap-2"><MapPin className="w-3 h-3" /> Location</p>
                <p className="font-medium text-gray-900">{selectedLead.city}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1 flex items-center gap-2"><Flame className="w-3 h-3" /> Interest</p>
                <p className="font-medium text-gray-900">{selectedLead.planInterest} Plan</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Source</p>
                <p className="font-medium text-gray-900">{selectedLead.source}</p>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="text-sm font-bold text-gray-900 mb-3">Activity Timeline</h4>
              <div className="space-y-3 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-4 h-4 rounded-full bg-[#5E4E99] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow"></div>
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded border border-gray-200 bg-white shadow-sm">
                          <div className="flex items-center justify-between space-x-2 mb-1">
                              <div className="font-bold text-gray-900 text-xs">Note Added</div>
                              <time className="text-[10px] text-gray-500">{selectedLead.dateAdded}</time>
                          </div>
                          <div className="text-xs text-gray-600">{selectedLead.note}</div>
                      </div>
                  </div>
              </div>
              <div className="mt-4">
                <textarea className="w-full text-sm border border-gray-200 rounded-lg p-3 outline-none focus:border-[#5E4E99] focus:ring-1 focus:ring-[#5E4E99] bg-gray-50" rows={3} placeholder="Log new activity or note..."></textarea>
                <div className="flex gap-2 mt-2">
                  <Button size="sm">Log Note</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </SlidePanel>
    </div>
  );
}
