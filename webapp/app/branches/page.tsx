'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { setupAuthOptions } from '@/lib/api';

export default function BranchesPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (!userStr) return;
        const user = JSON.parse(userStr);
        const instituteSlug = user.instituteId;

        const res = await fetch(`/api/${instituteSlug}/branches`);
        const data = await res.json();
        if (data.success) setBranches(data.branches);
      } catch (error) {
        console.error('Error fetching branches:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-text-slate tracking-tight">Branches</h1>
          <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Manage your institute branches</p>
        </div>
        <Button className="bg-brand-blue text-white rounded-2xl px-6 py-6 font-black text-xs uppercase tracking-widest shadow-glow hover:scale-105 transition-transform flex items-center gap-2">
          <Plus size={16} /> Add Branch
        </Button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-10 font-bold uppercase tracking-widest">Loading branches...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.length === 0 && (
            <div className="col-span-3 text-center text-gray-400 py-10 font-bold uppercase tracking-widest">No branches found.</div>
          )}
          {branches.map(branch => (
            <Card key={branch._id} className="border-none shadow-soft hover:shadow-soft-lg transition-all rounded-[32px]">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-black text-xl">
                    {branch.name.charAt(0)}
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-brand-blue hover:bg-brand-blue/10 transition-colors">
                      <Edit size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-100 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-black text-text-slate mb-1">{branch.name}</h3>
                <p className="text-xs font-bold text-gray-400 mb-6">{branch.address || 'No address provided'}</p>
                
                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-brand-blue text-white flex items-center justify-center text-[10px] font-black">
                      {branch.manager?.name ? branch.manager.name.charAt(0) : '?'}
                    </div>
                    <span className="text-xs font-bold text-gray-500">{branch.manager?.name || 'No Manager'}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-3 py-1.5 rounded-full">Manager</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
