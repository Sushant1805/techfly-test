'use client';
import React, { useState, useRef } from 'react';
import { mockTemplates, MessageTemplate } from '@/lib/settingsData';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { 
  MessageSquare, Smartphone, CheckCircle, 
  Plus, Edit, Eye, Info, AlertTriangle, 
  Send, Variable, RefreshCcw, ChevronDown
} from 'lucide-react';

export default function SMSPanel() {
  const [templates, setTemplates] = useState<MessageTemplate[]>(mockTemplates);
  const [editingTemplate, setEditingTemplate] = useState<MessageTemplate | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEdit = (template: MessageTemplate) => {
    setEditingTemplate({ ...template });
  };

  const insertVariable = (variable: string) => {
    if (!textareaRef.current || !editingTemplate) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = editingTemplate.whatsappTemplate;
    
    const before = text.substring(0, start);
    const after = text.substring(end);
    
    const newText = before + variable + after;
    setEditingTemplate({ ...editingTemplate, whatsappTemplate: newText });

    // Move cursor after variable
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + variable.length, start + variable.length);
    }, 0);
  };

  return (
    <div className="space-y-12 pb-10">
      {/* SMS Provider Config */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-purple-600">
          <Smartphone size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">SMS Configuration</h2>
        </div>
        
        <div className="p-8 bg-gray-50/50 rounded-[40px] border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden">
           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">SMS Provider</label>
                 <div className="relative">
                    <select className="w-full rounded-2xl border border-gray-100 bg-white h-12 px-5 font-bold outline-none appearance-none cursor-pointer">
                       <option>Twilio</option>
                       <option>MSG91</option>
                       <option>Fast2SMS</option>
                       <option>TextLocal</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Account SID</label>
                 <Input value="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" type="password" readOnly className="rounded-2xl h-11 border-gray-100 bg-white px-5 font-bold text-gray-400" />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">From Number</label>
                 <Input value="+91-XXXXXXXXXX" readOnly className="rounded-2xl h-11 border-gray-100 bg-white px-5 font-bold text-gray-400" />
              </div>
           </div>

           <div className="p-8 bg-white rounded-[32px] border border-gray-100 shadow-soft flex flex-col items-center justify-center text-center gap-4 group">
              <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                 <CheckCircle size={32} />
              </div>
              <div className="space-y-1">
                 <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">Status: Connected</h4>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">All systems operational</p>
              </div>
              <Button variant="outline" className="h-10 px-6 rounded-xl font-bold gap-2 text-xs border-green-100 text-green-600 hover:bg-green-50">
                 <RefreshCcw size={14} /> Test Connection
              </Button>
           </div>
           
           <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
        </div>
      </section>

      <hr className="border-gray-50 shrink-0" />

      {/* Message Templates Table */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-600">
            <MessageSquare size={20} />
            <h2 className="text-sm font-black uppercase tracking-widest">Message Templates</h2>
          </div>
          <Button className="h-10 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold gap-2 text-xs">
            <Plus size={16} /> New Template
          </Button>
        </div>

        <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-soft">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-8 py-5">Template Name</th>
                <th className="px-8 py-5">Channel</th>
                <th className="px-8 py-5">Last Edited</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {templates.map((t) => (
                <tr key={t.id} className="hover:bg-purple-50/20 transition-all group">
                  <td className="px-8 py-5">
                    <span className="text-xs font-black text-gray-900 uppercase tracking-tight transition-colors group-hover:text-purple-600">{t.name}</span>
                  </td>
                  <td className="px-8 py-5">
                    <Badge className="bg-purple-100 text-purple-600 text-[10px] font-black px-3 py-1 uppercase">{t.channel}</Badge>
                  </td>
                  <td className="px-8 py-5 text-[10px] font-bold text-gray-400 italic uppercase">{t.lastEdited}</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button 
                        onClick={() => handleEdit(t)}
                        className="p-2 hover:bg-purple-100 text-purple-600 rounded-lg transition-colors"
                       ><Edit size={14} /></button>
                       <button className="p-2 hover:bg-gray-100 text-gray-400 rounded-lg transition-colors"><Eye size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Template Editor Modal */}
      <Modal
        isOpen={!!editingTemplate}
        onClose={() => setEditingTemplate(null)}
        title={`Edit Template: ${editingTemplate?.name}`}
        width="max-w-2xl"
        footer={(
          <>
            <Button variant="outline" onClick={() => setEditingTemplate(null)}>Cancel</Button>
            <Button className="bg-purple-600 text-white hover:bg-purple-700" onClick={() => setEditingTemplate(null)}>Save Template</Button>
          </>
        )}
      >
        {editingTemplate && (
          <div className="space-y-8 py-2">
            <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-[28px] border border-gray-100">
               <div className="space-y-1">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Selected Channel</span>
                  <div className="flex gap-2">
                     <Badge className="bg-purple-600 text-white px-3">SMS</Badge>
                     <Badge className="bg-green-600 text-white px-3">WhatsApp</Badge>
                  </div>
               </div>
               <div className="space-y-1 text-right">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Template ID</span>
                  <p className="font-mono text-xs font-black text-gray-700 uppercase">{editingTemplate.id}</p>
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex justify-between items-center px-1">
                  <label className="text-[11px] font-black text-gray-900 uppercase tracking-tight">Content Layout</label>
                  <span className={`text-[10px] font-bold ${editingTemplate.whatsappTemplate.length > 150 ? 'text-amber-500' : 'text-gray-400'}`}>
                     {editingTemplate.whatsappTemplate.length} / 160 Characters
                  </span>
               </div>
               
               <div className="relative group">
                  <textarea 
                    ref={textareaRef}
                    rows={6}
                    className="w-full rounded-[32px] border-2 border-gray-100 bg-gray-50/50 p-6 font-bold text-gray-800 outline-none focus:ring-8 focus:ring-purple-500/10 focus:border-purple-200 transition-all resize-none leading-relaxed"
                    value={editingTemplate.whatsappTemplate}
                    onChange={(e) => setEditingTemplate({...editingTemplate, whatsappTemplate: e.target.value})}
                    placeholder="Enter message content..."
                  />
                  <div className="absolute bottom-4 right-4 animate-bounce">
                     <Variable size={16} className="text-purple-300" />
                  </div>
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex items-center gap-2 text-gray-400 px-1">
                  <Plus size={14} className="text-purple-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Available Variables (Click to Insert)</span>
               </div>
               <div className="flex flex-wrap gap-2 p-5 bg-purple-50/30 rounded-[28px] border border-purple-50 shadow-inner">
                  {editingTemplate.variables.map(v => (
                    <button
                      key={v}
                      onClick={() => insertVariable(v)}
                      className="px-4 py-2 bg-white border border-purple-100 rounded-xl text-[10px] font-black text-purple-700 shadow-sm hover:scale-105 hover:bg-purple-500 hover:text-white hover:shadow-glow transition-all uppercase tracking-tight"
                    >
                      {v}
                    </button>
                  ))}
               </div>
            </div>

            <div className="p-5 bg-amber-50 rounded-[28px] border border-amber-100 flex items-start gap-4">
               <AlertTriangle className="text-amber-600 shrink-0" size={20} />
               <div className="space-y-1">
                  <h4 className="text-[10px] font-black text-amber-900 uppercase tracking-widest leading-none">Character Limit Policy</h4>
                  <p className="text-[10px] font-bold text-amber-800 leading-relaxed uppercase tracking-tighter italic">
                     Messages exceeding 160 characters will be split into multiple SMS segments, resulting in higher provider costs. Keep it concise!
                  </p>
               </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
