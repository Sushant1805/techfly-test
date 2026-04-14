'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { CheckCircle2, Clock, Phone, Mail, Calendar, CalendarDays } from 'lucide-react';
import { followups } from '@/lib/mockData';

export default function FollowUps() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const getIconForType = (type: string) => {
    if (type === 'Call') return <Phone className="w-4 h-4" />;
    if (type === 'Email') return <Mail className="w-4 h-4" />;
    return <Calendar className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Task Follow-ups</h1>
        <Button onClick={() => setIsScheduleModalOpen(true)} className="gap-2">
          <CalendarDays className="w-4 h-4" /> Schedule Follow-up
        </Button>
      </div>

      <div className="space-y-8">
        {/* Overdue */}
        <div>
          <h3 className="text-sm font-bold text-red-600 mb-3 flex items-center gap-2 uppercase tracking-wider">
            <Clock className="w-4 h-4" /> Overdue
          </h3>
          <div className="space-y-3">
            {followups.filter(f => f.status === 'Overdue').map(f => (
              <Card key={f.id} className="border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900">{f.institute}</h4>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                      <span className="text-red-500 flex items-center gap-1">{getIconForType(f.type)} {f.type}</span> • {f.contact}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Snooze</Button>
                    <Button size="sm" className="bg-red-500 hover:bg-red-600 border-none">Mark Done</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Today */}
        <div>
          <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2 uppercase tracking-wider">
            <CalendarDays className="w-4 h-4" /> Today
          </h3>
          <div className="space-y-3">
            {followups.filter(f => f.status === 'Pending').map(f => (
              <Card key={f.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900">{f.institute}</h4>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                      <span className="text-blue-500 flex items-center gap-1">{getIconForType(f.type)} {f.type}</span> • {f.contact}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Snooze</Button>
                    <Button size="sm" className="gap-2"><CheckCircle2 className="w-4 h-4" /> Mark Done</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={isScheduleModalOpen} onClose={() => setIsScheduleModalOpen(false)} title="Schedule Follow-up">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Customer / Lead</label>
            <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" placeholder="Search..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Type</label>
              <select className="w-full border border-gray-200 bg-white rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]">
                <option>Call</option>
                <option>Email</option>
                <option>Meeting</option>
                <option>Demo</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Date</label>
              <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" />
            </div>
          </div>
           <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Notes</label>
            <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#5E4E99]" rows={3}></textarea>
          </div>
          <div className="pt-4 flex items-center justify-end gap-2 border-t border-gray-100">
            <Button variant="ghost" onClick={() => setIsScheduleModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsScheduleModalOpen(false)}>Schedule</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
