import React from 'react';
import { Button } from '@/components/ui/Button';
import { Send, MoveHorizontal, Download, Trash2, X } from 'lucide-react';

interface BulkActionsBarProps {
  selectedCount: number;
  onClear: () => void;
  onAction: (action: string) => void;
}

export const BulkActionsBar: React.FC<BulkActionsBarProps> = ({ selectedCount, onClear, onAction }) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-10 fade-in duration-300">
      <div className="bg-white/90 backdrop-blur-2xl border border-white shadow-soft-lg rounded-[32px] px-8 py-4 flex items-center gap-8 ring-1 ring-black/5">
        <div className="flex items-center gap-3 pr-8 border-r border-gray-100">
          <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-sm">
            {selectedCount}
          </div>
          <span className="font-bold text-text-slate text-sm whitespace-nowrap">Students Selected</span>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 h-11 px-5 rounded-2xl hover:bg-brand-blue/10 hover:text-brand-blue font-bold text-xs uppercase tracking-widest text-gray-500"
            onClick={() => onAction('SMS')}
          >
            <Send className="w-4 h-4" /> Send SMS
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 h-11 px-5 rounded-2xl hover:bg-brand-blue/10 hover:text-brand-blue font-bold text-xs uppercase tracking-widest text-gray-500"
            onClick={() => onAction('Batch')}
          >
            <MoveHorizontal className="w-4 h-4" /> Change Batch
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 h-11 px-5 rounded-2xl hover:bg-brand-blue/10 hover:text-brand-blue font-bold text-xs uppercase tracking-widest text-gray-500"
            onClick={() => onAction('Export')}
          >
            <Download className="w-4 h-4" /> Export
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 h-11 px-5 rounded-2xl hover:bg-red-50 hover:text-red-500 font-bold text-xs uppercase tracking-widest text-gray-400"
            onClick={() => onAction('Delete')}
          >
            <Trash2 className="w-4 h-4" /> Delete
          </Button>
        </div>

        <button 
          onClick={onClear}
          className="ml-4 w-10 h-10 rounded-full bg-bg-soft flex items-center justify-center text-gray-400 hover:text-brand-blue hover:bg-white hover:shadow-soft transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
