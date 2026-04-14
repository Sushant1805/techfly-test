'use client';
import React, { useState } from 'react';
import { initialSubjects, Subject } from '@/lib/settingsData';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { 
  BookOpen, Plus, Search, MoreVertical, 
  Trash2, Edit, CheckCircle, Info 
} from 'lucide-react';

export default function SubjectsPanel() {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState<Partial<Subject>>({
    color: '#8B5CF6',
    status: 'Active'
  });

  const filteredSubjects = subjects.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.shortName.toLowerCase().includes(search.toLowerCase())
  );

  const addSubject = () => {
    if (newSubject.name && newSubject.shortName) {
      const subject: Subject = {
        id: `sub-${Date.now()}`,
        name: newSubject.name,
        shortName: newSubject.shortName,
        color: newSubject.color || '#8B5CF6',
        status: 'Active',
        batchesCount: 0
      };
      setSubjects(prev => [...prev, subject]);
      setIsModalOpen(false);
      setNewSubject({ color: '#8B5CF6', status: 'Active' });
    }
  };

  const removeSubject = (id: string) => {
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  const presets = ['#8B5CF6', '#10B981', '#F59E0B', '#3B82F6', '#EF4444', '#EC4899', '#6366F1', '#14B8A6'];

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-purple-600">
          <BookOpen size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Manage Subjects</h2>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="h-10 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold gap-2 text-xs shadow-soft"
        >
          <Plus size={16} /> Add Subject
        </Button>
      </div>

      {/* Toolbar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black" size={16} />
        <Input 
          placeholder="Search subjects..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 border-none bg-gray-50/50 rounded-2xl h-12 text-xs font-black uppercase tracking-widest"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-soft">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <th className="px-8 py-5">Subject Name</th>
              <th className="px-8 py-5">Short Name</th>
              <th className="px-8 py-5">Color</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5">Batches</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredSubjects.map((s) => (
              <tr key={s.id} className="hover:bg-purple-50/20 transition-all group">
                <td className="px-8 py-5">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl shadow-inner flex items-center justify-center text-white" style={{ backgroundColor: s.color }}>
                         <BookOpen size={14} />
                      </div>
                      <span className="text-xs font-black text-gray-900 group-hover:text-purple-600 transition-colors uppercase tracking-tight">{s.name}</span>
                   </div>
                </td>
                <td className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest italic">{s.shortName}</td>
                <td className="px-8 py-5 capitalize">
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{s.color}</span>
                   </div>
                </td>
                <td className="px-8 py-5">
                   <Badge className={`text-[9px] font-black uppercase tracking-tighter ${
                     s.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                   }`}>
                      {s.status}
                   </Badge>
                </td>
                <td className="px-8 py-5">
                   <span className="text-xs font-black text-gray-900">{s.batchesCount}</span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-purple-100 text-purple-600 rounded-lg transition-colors"><Edit size={14}/></button>
                    <button onClick={() => removeSubject(s.id)} className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"><Trash2 size={14}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-purple-50/50 rounded-3xl border border-purple-100 flex items-start gap-4">
         <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-purple-600 shrink-0 shadow-soft">
            <Info size={20} />
         </div>
         <div className="space-y-1">
            <h4 className="text-xs font-black text-purple-900 uppercase tracking-tight">System Note</h4>
            <p className="text-[11px] font-bold text-purple-700 leading-relaxed uppercase tracking-tighter">
               Assign colors to subjects to differentiate them in the Timetable and Analytics dashboard. Colors help teachers quickly identify their classes.
            </p>
         </div>
      </div>

      {/* Add Subject Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Subject"
        footer={(
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button className="bg-purple-600 text-white hover:bg-purple-700" onClick={addSubject}>Add Subject</Button>
          </>
        )}
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Subject Name *</label>
            <Input 
              placeholder="e.g. Mathematics"
              value={newSubject.name || ''}
              onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
              className="rounded-2xl h-12"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Short Name *</label>
            <Input 
              placeholder="e.g. MATHS"
              value={newSubject.shortName || ''}
              onChange={(e) => setNewSubject({...newSubject, shortName: e.target.value})}
              className="rounded-2xl h-12 uppercase"
              maxLength={8}
            />
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Choose Subject Color</label>
            <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              {presets.map(c => (
                <button
                  key={c}
                  onClick={() => setNewSubject({...newSubject, color: c})}
                  className={`w-8 h-8 rounded-full transition-all duration-300 border-2 ${
                    newSubject.color === c ? 'border-purple-600 scale-110 shadow-glow' : 'border-white'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <div className="ml-auto flex items-center gap-2">
                 <span className="text-[9px] font-black text-gray-400">CUSTOM:</span>
                 <input 
                  type="color" 
                  value={newSubject.color} 
                  onChange={(e) => setNewSubject({...newSubject, color: e.target.value})}
                  className="w-10 h-10 p-0 border-none bg-transparent cursor-pointer"
                 />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
