'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CustomerAvatar } from '@/components/ui/CustomerAvatar';
import { Button } from '@/components/ui/Button';
import { Customer } from '@/lib/customers';
import { Phone, Users, Layers, TrendingUp, MoreVertical, Calendar } from 'lucide-react';

interface CustomerCardGridProps {
  customers: Customer[];
  onCardClick: (id: string) => void;
  activeId: string | null;
}

export const CustomerCardGrid = ({ customers, onCardClick, activeId }: CustomerCardGridProps) => {

  const getPlanColor = (plan: Customer['plan']) => {
    switch (plan) {
      case 'Pro': return 'border-purple-500';
      case 'Basic': return 'border-blue-500';
      default: return 'border-gray-400';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
      {customers.map((c) => (
        <Card 
          key={c.id} 
          onClick={() => onCardClick(c.id)}
          className={`group cursor-pointer border-l-4 ${getPlanColor(c.plan)} transition-all duration-300 hover:shadow-soft-lg ${activeId === c.id ? 'ring-2 ring-brand-blue ring-offset-2' : ''}`}
        >
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <CustomerAvatar name={c.instituteName} initials={c.ownerAvatar} size="lg" />
                <div>
                  <h3 className="font-black text-text-slate text-base tracking-tight leading-none mb-1 group-hover:text-brand-blue transition-colors">
                    {c.instituteName}
                  </h3>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none">
                    {c.ownerName} · {c.city}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant={c.plan as any}>{c.plan}</Badge>
                <div className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${c.planStatus === 'Active' ? 'bg-green-50 text-green-500' : 'bg-orange-50 text-orange-500'}`}>
                  {c.planStatus}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1.5 p-2 px-3 rounded-xl bg-bg-soft flex-1">
                <Phone className="w-3.5 h-3.5 text-brand-blue" />
                <span className="text-xs font-bold text-gray-500">{c.phone}</span>
              </div>
              <button className="p-2.5 rounded-xl bg-white border border-gray-100 shadow-sm text-gray-400 hover:text-brand-blue transition-all">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="text-center p-3 rounded-2xl bg-gray-50/50">
                <p className="text-xs font-black text-text-slate">{c.totalStudents}</p>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Students</p>
              </div>
              <div className="text-center p-3 rounded-2xl bg-gray-50/50">
                <p className="text-xs font-black text-text-slate">{c.totalBatches}</p>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Batches</p>
              </div>
              <div className="text-center p-3 rounded-2xl bg-gray-50/50">
                <p className="text-xs font-black text-text-slate">₹{c.mrr}</p>
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">MRR</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6 text-[11px] font-bold text-gray-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>Since {c.startDate} · Expires {c.currentPeriodEnd}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {c.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-slate-100 text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                  {tag}
                </span>
              ))}
            </div>

            <Button variant="ghost" size="sm" className="w-full border-2 border-slate-100 text-slate-400 hover:text-brand-blue hover:border-brand-blue hover:bg-brand-blue/5 rounded-2xl font-black text-[10px] uppercase tracking-widest py-3">
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
