'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { 
  Cpu, Globe, Video, CreditCard, 
  BarChart, Scissors, Cloud, Shield, 
  RefreshCcw, CheckCircle, ExternalLink, Info
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  status: 'Connected' | 'Not Connected';
}

export default function IntegrationsPanel() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: '1', name: 'Google Calendar', description: 'Sync timetable with Google Calendar', icon: Globe, color: 'text-blue-600 bg-blue-50', status: 'Not Connected' },
    { id: '2', name: 'Zoom', description: 'Schedule online classes directly', icon: Video, color: 'text-blue-500 bg-blue-50', status: 'Not Connected' },
    { id: '3', name: 'Razorpay', description: 'Accept online fee payments', icon: CreditCard, color: 'text-blue-900 bg-blue-50', status: 'Not Connected' },
    { id: '4', name: 'Google Sheets', description: 'Sync student data to Sheets', icon: BarChart, color: 'text-green-600 bg-green-50', status: 'Not Connected' },
    { id: '5', name: 'Tally / Accounting', description: 'Export fee records to Tally ERP', icon: Scissors, color: 'text-amber-600 bg-amber-50', status: 'Not Connected' },
    { id: '6', name: 'YouTube', description: 'Link recorded videos to assignments', icon: Video, color: 'text-red-600 bg-red-50', status: 'Not Connected' }
  ]);

  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConnect = () => {
    if (!connectingId) return;
    setIsModalOpen(false);
    
    // Simulate connection delay
    setIntegrations(prev => prev.map(i => i.id === connectingId ? { ...i, name: `${i.name} (Connecting...)` } : i));
    
    setTimeout(() => {
      setIntegrations(prev => prev.map(i => i.id === connectingId ? { ...i, name: i.name.split(' (')[0], status: 'Connected' as const } : i));
      setConnectingId(null);
    }, 2000);
  };

  const selectedIntegration = integrations.find(i => i.id === connectingId);

  return (
    <div className="space-y-10 pb-10">
      <div className="flex items-center gap-2 text-purple-600">
        <Cpu size={20} />
        <h2 className="text-sm font-black uppercase tracking-widest">Available Integrations</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {integrations.map((item) => (
          <div 
            key={item.id} 
            className={`p-10 rounded-[48px] border-2 transition-all group relative overflow-hidden flex flex-col items-center text-center gap-6 ${
              item.status === 'Connected' ? 'bg-white border-purple-100 shadow-soft-lg' : 'bg-gray-50/20 border-gray-100 hover:border-purple-200'
            }`}
          >
             <div className={`w-20 h-20 rounded-[32px] flex items-center justify-center transition-all duration-500 shadow-soft group-hover:scale-110 ${item.color}`}>
                <item.icon size={40} />
             </div>
             
             <div className="space-y-2">
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight group-hover:text-purple-600 transition-colors">
                   {item.name}
                </h3>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                   {item.description}
                </p>
             </div>

             <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.status === 'Connected' ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest italic ${item.status === 'Connected' ? 'text-green-600' : 'text-gray-400'}`}>
                   Status: {item.status}
                </span>
             </div>

             <Button 
               onClick={() => {
                 setConnectingId(item.id);
                 setIsModalOpen(true);
               }}
               disabled={item.status === 'Connected'}
               className={`h-11 px-10 rounded-2xl font-black uppercase tracking-widest text-[10px] gap-3 transition-all ${
                 item.status === 'Connected' 
                   ? 'bg-green-50 text-green-600 cursor-not-allowed shadow-none' 
                   : 'bg-white border-2 border-gray-100 text-gray-700 hover:bg-purple-600 hover:text-white hover:border-purple-600 shadow-soft'
               }`}
             >
                {item.status === 'Connected' ? <CheckCircle size={16} /> : <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-700" />}
                {item.status === 'Connected' ? 'Connected' : `Connect ${item.name.split(' ')[0]}`}
             </Button>

             <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-50 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
          </div>
        ))}
      </div>

      <div className="p-8 bg-purple-50 rounded-[40px] border border-purple-100 flex items-start gap-6 shadow-sm">
         <div className="w-14 h-14 rounded-[24px] bg-white flex items-center justify-center text-purple-600 shrink-0 shadow-soft">
            <Shield size={28} />
         </div>
         <div className="space-y-2">
            <h4 className="text-xs font-black text-purple-900 uppercase tracking-tight italic">Security & API Access</h4>
            <p className="text-[11px] font-bold text-purple-700 leading-relaxed uppercase tracking-tighter">
               EzzyCoach uses industry-standard OAuth2 to securely connect with third-party providers. We never store your passwords and only request the minimum permissions needed to provide the integration features.
            </p>
            <div className="pt-2">
               <span className="text-[10px] font-black uppercase underline cursor-pointer hover:text-purple-900 inline-flex items-center gap-1">
                  Read Integration Privacy Policy <ExternalLink size={10} />
               </span>
            </div>
         </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Connect ${selectedIntegration?.name}`}
        width="max-w-md"
        footer={(
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button className="bg-purple-600 text-white hover:bg-purple-700" onClick={handleConnect}>Connect Service</Button>
          </>
        )}
      >
        <div className="space-y-8 py-2">
           <div className="flex flex-col items-center gap-4 text-center">
              <div className={`w-20 h-20 rounded-[32px] flex items-center justify-center shadow-soft ${selectedIntegration?.color}`}>
                 {selectedIntegration && <selectedIntegration.icon size={40} />}
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
                 Enter your credentials to link your <span className="text-purple-600 font-black">{selectedIntegration?.name}</span> account with EzzyCoach.
              </p>
           </div>

           <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">API Key / Client ID</label>
              <Input placeholder="Enter key..." className="rounded-2xl h-12 border-gray-100 bg-gray-50/50 px-5 font-bold" />
           </div>

           <div className="flex flex-col gap-2 p-5 bg-gray-50 rounded-3xl border border-gray-100">
              <div className="flex items-center gap-2 text-gray-400">
                 <Info size={14} />
                 <span className="text-[10px] font-black uppercase tracking-widest italic">Where to find this?</span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase tracking-tighter">
                 Go to your {selectedIntegration?.name} Developer Console → API Settings → Credentials.
              </p>
           </div>
        </div>
      </Modal>
    </div>
  );
}
