'use client';
import React, { useState } from 'react';
import { initialAcademicYear, AcademicYear, Holiday } from '@/lib/settingsData';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { 
  Calendar, Clock, CheckCircle, Plus, 
  Trash2, Edit, Info, AlertTriangle, 
  ChevronDown, Globe, Map
} from 'lucide-react';

export default function AcademicYearPanel() {
  const [academicYear, setAcademicYear] = useState<AcademicYear>(initialAcademicYear);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [newHoliday, setNewHoliday] = useState<Partial<Holiday>>({
    type: 'National'
  });

  const toggleDay = (day: string) => {
    setAcademicYear(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day]
    }));
  };

  const addHoliday = () => {
    if (newHoliday.name && newHoliday.date) {
      const holiday: Holiday = {
        id: `h-${Date.now()}`,
        name: newHoliday.name,
        date: newHoliday.date,
        type: newHoliday.type as any,
        description: newHoliday.description
      };
      setAcademicYear(prev => ({
        ...prev,
        holidays: [...prev.holidays, holiday].sort((a, b) => a.date.localeCompare(b.date))
      }));
      setIsHolidayModalOpen(false);
      setNewHoliday({ type: 'National' });
    }
  };

  const removeHoliday = (id: string) => {
    setAcademicYear(prev => ({
      ...prev,
      holidays: prev.holidays.filter(h => h.id !== id)
    }));
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="space-y-10 pb-10">
      {/* Current Academic Year */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-purple-600">
          <Calendar size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Current Academic Year</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">Academic Year *</label>
            <div className="relative">
              <select 
                className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 h-12 px-5 font-bold outline-none focus:ring-4 focus:ring-purple-500/10 appearance-none"
                value={academicYear.label}
                onChange={(e) => setAcademicYear(prev => ({ ...prev, label: e.target.value }))}
              >
                <option>2024 – 2025</option>
                <option>2025 – 2026</option>
                <option>2026 – 2027</option>
              </select>
              <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">Year Start Date *</label>
            <Input 
              type="date"
              value={academicYear.startDate}
              onChange={(e) => setAcademicYear(prev => ({ ...prev, startDate: e.target.value }))}
              className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 px-5 font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">Year End Date *</label>
            <Input 
              type="date"
              value={academicYear.endDate}
              onChange={(e) => setAcademicYear(prev => ({ ...prev, endDate: e.target.value }))}
              className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 px-5 font-bold"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 p-4 bg-green-50 rounded-2xl border border-green-100 text-green-700 w-fit">
          <CheckCircle size={18} />
          <span className="text-[11px] font-black uppercase tracking-widest">Academic Year Status: Active</span>
        </div>
      </section>

      <hr className="border-gray-50" />

      {/* Terms / Semesters */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-600">
            <Globe size={20} />
            <h2 className="text-sm font-black uppercase tracking-widest">Terms / Semesters</h2>
          </div>
          <Badge className="bg-purple-100 text-purple-600 border-none font-black text-[10px] uppercase px-3 py-1">2 Terms Configured</Badge>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50">
                <th className="px-6 py-4">Term</th>
                <th className="px-6 py-4">Start Date</th>
                <th className="px-6 py-4">End Date</th>
                <th className="px-6 py-4">Label</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {academicYear.terms.map((term, i) => (
                <tr key={term.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4 font-black text-gray-900 text-xs">Term {i + 1}</td>
                  <td className="px-6 py-4 font-bold text-gray-700 text-xs">{term.startDate}</td>
                  <td className="px-6 py-4 font-bold text-gray-700 text-xs">{term.endDate}</td>
                  <td className="px-6 py-4">
                    <Input 
                      value={term.label}
                      className="h-8 rounded-lg text-xs font-bold border-gray-100 min-w-[120px]"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={`text-[9px] font-black uppercase tracking-tighter ${
                      term.status === 'Completed' ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-600'
                    }`}>
                      {term.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button variant="outline" className="h-10 px-6 rounded-xl font-bold gap-2 text-xs border-dashed border-2 border-gray-200 text-gray-400 hover:text-purple-600 hover:border-purple-200 transition-all">
          <Plus size={16} /> Add Term
        </Button>
      </section>

      <hr className="border-gray-50" />

      {/* Working Days & Hours */}
      <section className="space-y-8">
        <div className="flex items-center gap-2 text-purple-600">
          <Clock size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">Working Days & Hours</h2>
        </div>
        
        <div className="space-y-4">
          <label className="text-[11px] font-black text-gray-400 ml-1 uppercase">Weekly Working Days</label>
          <div className="flex flex-wrap gap-3">
            {days.map(day => {
              const isActive = academicYear.workingDays.includes(day);
              return (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all duration-300 border-2 ${
                    isActive 
                      ? 'bg-purple-600 border-purple-600 text-white shadow-glow' 
                      : 'bg-white border-gray-100 text-gray-400 hover:border-purple-200'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase italic">Institute Opens</label>
            <Input 
              type="time"
              value={academicYear.instituteOpenTime}
              className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 px-5 font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 ml-1 uppercase italic">Institute Closes</label>
            <Input 
              type="time"
              value={academicYear.instituteCloseTime}
              className="rounded-2xl border-gray-100 bg-gray-50/50 h-12 px-5 font-bold"
            />
          </div>
        </div>
      </section>

      <hr className="border-gray-50" />

      {/* Holidays Table */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-600">
            <Map size={20} />
            <h2 className="text-sm font-black uppercase tracking-widest">Holidays List</h2>
          </div>
          <Button 
            onClick={() => setIsHolidayModalOpen(true)}
            className="h-10 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold gap-2 text-xs shadow-soft"
          >
            <Plus size={16} /> Add Holiday
          </Button>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Holiday Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {academicYear.holidays.map((h) => (
                <tr key={h.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-gray-900 text-xs">{h.date}</td>
                  <td className="px-6 py-4 font-black text-gray-700 text-xs">{h.name}</td>
                  <td className="px-6 py-4">
                    <Badge className={`text-[9px] font-black uppercase tracking-tighter ${
                      h.type === 'National' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {h.type}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex justify-end gap-2">
                       <button className="p-2 hover:bg-purple-100 text-purple-600 rounded-lg transition-colors"><Edit size={14}/></button>
                       <button 
                        onClick={() => removeHoliday(h.id)}
                        className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                       ><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add Holiday Modal */}
      <Modal
        isOpen={isHolidayModalOpen}
        onClose={() => setIsHolidayModalOpen(false)}
        title="Add New Holiday"
        width="max-w-md"
        footer={(
          <>
            <Button variant="outline" onClick={() => setIsHolidayModalOpen(false)}>Cancel</Button>
            <Button className="bg-purple-600 text-white hover:bg-purple-700" onClick={addHoliday}>Add Holiday</Button>
          </>
        )}
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Holiday Name *</label>
            <Input 
              placeholder="e.g. Holi"
              value={newHoliday.name || ''}
              onChange={(e) => setNewHoliday({...newHoliday, name: e.target.value})}
              className="rounded-2xl h-12"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Date *</label>
            <Input 
              type="date"
              value={newHoliday.date || ''}
              onChange={(e) => setNewHoliday({...newHoliday, date: e.target.value})}
              className="rounded-2xl h-12"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Holiday Type</label>
            <select 
              className="w-full rounded-2xl border border-gray-100 bg-gray-50 h-12 px-5 font-bold outline-none appearance-none"
              value={newHoliday.type}
              onChange={(e) => setNewHoliday({...newHoliday, type: e.target.value as any})}
            >
              <option>National</option>
              <option>State</option>
              <option>Institute</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description (Optional)</label>
            <textarea 
              rows={3}
              placeholder="Brief details..."
              className="w-full rounded-2xl border border-gray-100 bg-gray-50 p-4 font-bold outline-none resize-none"
              value={newHoliday.description || ''}
              onChange={(e) => setNewHoliday({...newHoliday, description: e.target.value})}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
