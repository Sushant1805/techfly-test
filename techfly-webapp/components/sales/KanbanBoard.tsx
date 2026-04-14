'use client';
import React from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Lead, LeadStage } from '@/lib/salesData';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Phone, MoreVertical, Calendar, User, Clock } from 'lucide-react';
import { CustomerAvatar } from '@/components/ui/CustomerAvatar';

interface KanbanBoardProps {
  leads: Lead[];
  onMoveLead: (leadId: string, newStage: LeadStage) => void;
  onSelectLead: (lead: Lead) => void;
}

const STAGES: LeadStage[] = [
  "New Lead",
  "Contacted",
  "Demo Scheduled",
  "Demo Done",
  "Proposal Sent",
  "Negotiation",
];

export const KanbanBoard = ({ leads, onMoveLead, onSelectLead }: KanbanBoardProps) => {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveId(null);
      return;
    }

    const leadId = active.id as string;
    const overId = over.id as string;

    // Determine the stage
    let newStage: LeadStage | null = null;
    if (STAGES.includes(overId as LeadStage) || overId === 'Converted' || overId === 'Lost') {
      newStage = overId as LeadStage;
    } else {
      // Find the stage of the lead we dropped on
      const overLead = leads.find(l => l.id === overId);
      if (overLead) newStage = overLead.stage;
    }

    if (newStage) {
      onMoveLead(leadId, newStage);
    }
    setActiveId(null);
  };

  const activeLead = activeId ? leads.find(l => l.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-10 no-scrollbar min-h-[600px] items-start">
        {STAGES.map((stage) => (
          <KanbanColumn
            key={stage}
            id={stage}
            title={stage}
            leads={leads.filter((l) => l.stage === stage)}
            onSelectLead={onSelectLead}
          />
        ))}

        {/* Collapsed Specific Columns */}
        <CollapsedColumn id="Converted" title="Converted" color="bg-green-500" />
        <CollapsedColumn id="Lost" title="Lost" color="bg-red-500" />
      </div>

      <DragOverlay dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.5',
              },
            },
          }),
        }}>
        {activeLead ? (
          <div className="w-[280px]">
            <LeadCard lead={activeLead} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

interface KanbanColumnProps {
  id: string;
  title: string;
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
}

const KanbanColumn = ({ id, title, leads, onSelectLead }: KanbanColumnProps) => {
  const totalMRR = leads.reduce((acc, l) => acc + l.expectedMRR, 0);

  const getBorderColor = (stage: string) => {
    switch (stage) {
      case 'New Lead': return 'border-t-gray-400';
      case 'Contacted': return 'border-t-brand-blue';
      case 'Demo Scheduled': return 'border-t-purple-500';
      case 'Demo Done': return 'border-t-teal-500';
      case 'Proposal Sent': return 'border-t-amber-500';
      case 'Negotiation': return 'border-t-orange-500';
      default: return 'border-t-gray-200';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-[300px] shrink-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className={`p-5 rounded-[24px] bg-white shadow-soft border-t-4 ${getBorderColor(title)} border border-gray-100 flex flex-col gap-1`}>
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-black text-text-slate uppercase tracking-widest">{title}</h3>
          <Badge variant="info" className="text-[10px] px-2 py-0">{leads.length}</Badge>
        </div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">₹{totalMRR.toLocaleString()}/mo potential</p>
      </div>

      <SortableContext items={leads.map((l) => l.id)} strategy={verticalListSortingStrategy}>
        <div id={id} className="flex flex-col gap-4 min-h-[300px]">
          {leads.map((lead) => (
            <SortableLeadCard 
              key={lead.id} 
              lead={lead} 
              onSelect={() => onSelectLead(lead)} 
            />
          ))}
          {leads.length === 0 && (
            <div className="h-40 rounded-[24px] border-2 border-dashed border-gray-100 flex items-center justify-center text-[10px] font-black uppercase text-gray-300 tracking-widest">
              Drop here
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

const CollapsedColumn = ({ id, title, color }: { id: string, title: string, color: string }) => {
  // Simple thin vertical strip
  return (
    <div className="w-12 h-[60vh] rounded-[24px] bg-white shadow-soft border border-gray-100 flex flex-col items-center py-8 gap-4 shrink-0 transition-all hover:w-16 group cursor-pointer overflow-hidden">
       <div className={`w-1.5 flex-1 rounded-full ${color}/20 flex items-end justify-center pb-2`}>
         <div className={`w-full rounded-full ${color}`} style={{ height: '30%' }} />
       </div>
       <p className="text-[10px] font-black uppercase tracking-[0.4em] rotate-180" style={{ writingMode: 'vertical-rl' }}>{title}</p>
    </div>
  );
};

const SortableLeadCard = ({ lead, onSelect }: { lead: Lead; onSelect: () => void }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-full h-48 rounded-[24px] bg-slate-soft/50 border-2 border-dashed border-brand-blue/20"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onSelect}
    >
      <LeadCard lead={lead} />
    </div>
  );
};

const LeadCard = ({ lead, isDragging }: { lead: Lead; isDragging?: boolean }) => {
  const isHealthy = lead.daysInCurrentStage < 7;
  const isRisk = lead.daysInCurrentStage >= 14;

  return (
    <Card className={`p-5 rounded-[24px] border-gray-100 shadow-soft cursor-grab active:cursor-grabbing transition-all hover:shadow-soft-lg group ${isDragging ? 'rotate-2 scale-105 opacity-100 shadow-glow-blue border-brand-blue/30' : ''}`}>
       <div className="flex justify-between items-start mb-4">
          <Badge variant={lead.interestedPlan === 'Pro' ? 'purple' : 'info'} className="text-[8px] px-2 py-0.5 uppercase">{lead.interestedPlan}</Badge>
          <div className="flex items-center gap-1.5">
             <div className={`w-2 h-2 rounded-full ${lead.priority === 'High' ? 'bg-red-500' : lead.priority === 'Medium' ? 'bg-amber-400' : 'bg-gray-300'}`} />
             <MoreVertical className="w-4 h-4 text-gray-300 group-hover:text-text-slate transition-colors" />
          </div>
       </div>

       <div className="space-y-1 mb-4">
         <h4 className="text-sm font-black text-text-slate tracking-tight truncate uppercase leading-tight">{lead.instituteName}</h4>
         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter truncate">{lead.contactPerson} · {lead.city}</p>
       </div>

       <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-brand-blue text-[10px] font-black">
             <Phone className="w-3.5 h-3.5" /> {lead.phone}
          </div>
          <div className="flex items-center gap-2 text-text-slate text-[10px] font-black">
             💰 ₹{lead.expectedMRR.toLocaleString()}/mo expected
          </div>
          <div className="flex flex-wrap gap-1">
             <span className="px-2 py-1 rounded-md bg-slate-soft text-[8px] font-black text-gray-400 uppercase tracking-tighter">{lead.source}</span>
             {lead.tags.slice(0, 1).map(t => (
               <span key={t} className="px-2 py-1 rounded-md bg-brand-blue/10 text-brand-blue text-[8px] font-black uppercase tracking-tighter">{t}</span>
             ))}
             {lead.tags.length > 1 && <span className="px-2 py-1 rounded-md bg-slate-soft text-[8px] font-black text-gray-400 uppercase tracking-tighter">+{lead.tags.length - 1} more</span>}
          </div>
       </div>

       <div className="pt-4 border-t border-gray-50 flex flex-col gap-3">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-lg bg-brand-blue text-white text-[8px] flex items-center justify-center font-black">{lead.assignedTo.charAt(0)}</div>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">{lead.assignedTo}</span>
             </div>
             <p className={`text-[9px] font-black uppercase tracking-tighter flex items-center gap-1 ${isRisk ? 'text-red-500' : isHealthy ? 'text-green-500' : 'text-amber-500'}`}>
               <Clock className="w-3 h-3" /> {lead.daysInCurrentStage} days
             </p>
          </div>
          {lead.nextFollowupDate && (
             <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-soft/50">
                <Calendar className="w-3 h-3 text-brand-blue" />
                <span className="text-[9px] font-black text-brand-blue uppercase tracking-widest">
                   {new Date(lead.nextFollowupDate).toLocaleDateString() === new Date().toLocaleDateString() ? 'Follow-up: TODAY' : `Follow-up: ${lead.nextFollowupDate}`}
                </span>
             </div>
          )}
       </div>
    </Card>
  );
};
