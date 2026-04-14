'use client';
import React, { useState, useEffect } from 'react';
import { LayoutGrid, FileText, Send, Calendar, Clock, AlertCircle, Plus, X, Upload, CheckCircle2, Eye, Save, Trash2, ArrowRight, Paperclip, Star, ListTodo } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface CreateAssignmentFormProps {
  onCancel: () => void;
}

export default function CreateAssignmentForm({ onCancel }: CreateAssignmentFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: 'Maths',
    batch: 'Batch A',
    type: 'Homework',
    difficulty: 'Medium',
    assignedDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    dueTime: '23:59',
    allowLate: true,
    latePenalty: 10,
    isGraded: true,
    totalMarks: 10,
    passingMarks: 4,
    notifyStudents: true,
    reminderBefore: true,
    instructions: ['Solve all questions', 'Submit in PDF format']
  });

  const [attachments, setAttachments] = useState<{name: string, size: string}[]>([]);
  const [newInstruction, setNewInstruction] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e as any;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e as any).target.checked : value
    }));
  };

  const addInstruction = () => {
    if (newInstruction.trim()) {
      setFormData(prev => ({
        ...prev,
        instructions: [...prev.instructions, newInstruction.trim()]
      }));
      setNewInstruction('');
    }
  };

  const removeInstruction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(f => ({
        name: f.name,
        size: (f.size / (1024 * 1024)).toFixed(1) + ' MB'
      }));
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-20 animate-in fade-in duration-500">
      {/* Form Side */}
      <div className="xl:col-span-2 space-y-8">
        {/* Section 1: Basic Details */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <FileText size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Basic Details</h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Assignment Title *</label>
              <Input 
                name="title" 
                placeholder="e.g. Quadratic Equations — Chapter 4" 
                value={formData.title}
                onChange={handleChange}
                className="h-12 text-base font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Description *</label>
              <textarea 
                name="description" 
                rows={4} 
                placeholder="Detailed description of the assignment tasks..."
                className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm transition-all"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 ml-1">Subject *</label>
                <select 
                  name="subject" 
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option>Maths</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 ml-1">Batch *</label>
                <select 
                  name="batch" 
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm"
                  value={formData.batch}
                  onChange={handleChange}
                >
                  <option>Batch A</option>
                  <option>Batch B</option>
                  <option>Batch C</option>
                  <option>Batch D</option>
                  <option>Batch E</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 ml-1 text-center block">Assignment Type</label>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['Homework', 'Project', 'Practice', 'Research'].map(type => (
                    <button 
                      key={type}
                      onClick={() => setFormData(p => ({...p, type}))}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                        formData.type === type ? 'bg-purple-600 border-purple-600 text-white shadow-md' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-purple-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700 ml-1 text-center block">Difficulty</label>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['Easy', 'Medium', 'Hard'].map(diff => (
                    <button 
                      key={diff}
                      onClick={() => setFormData(p => ({...p, difficulty: diff as any}))}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                        formData.difficulty === diff ? 'bg-gray-900 border-gray-900 text-white shadow-md' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-purple-200'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Schedule */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Calendar size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Schedule</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1 text-center block">Assigned Date</label>
              <Input type="date" name="assignedDate" value={formData.assignedDate} onChange={handleChange} className="h-12" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1 text-center block">Due Date</label>
              <Input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="h-12 border-purple-200 shadow-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1 text-center block">Due Time</label>
              <Input type="time" name="dueTime" value={formData.dueTime} onChange={handleChange} className="h-12" />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="space-y-0.5">
              <div className="text-sm font-bold text-gray-900">Allow Late Submission</div>
              <div className="text-xs text-gray-500 font-medium">Accept submissions after due date with penalty</div>
            </div>
            <div className="flex items-center gap-4">
              {formData.allowLate && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400">Penalty:</span>
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                    <input 
                      type="number" 
                      className="w-10 text-center font-bold text-sm" 
                      value={formData.latePenalty} 
                      onChange={(e) => setFormData(p => ({...p, latePenalty: parseInt(e.target.value)}))} 
                    />
                    <span className="text-xs font-bold text-gray-500">%</span>
                  </div>
                </div>
              )}
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={formData.allowLate} onChange={(e) => setFormData(p => ({...p, allowLate: e.target.checked}))} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Section 3: Marks & File Management (Simplified) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                <Star size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Grading</h2>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-gray-700">Is this graded?</span>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button 
                  onClick={() => setFormData(p => ({...p, isGraded: true}))}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${formData.isGraded ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500'}`}
                >
                  YES
                </button>
                <button 
                  onClick={() => setFormData(p => ({...p, isGraded: false}))}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${!formData.isGraded ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500'}`}
                >
                  NO
                </button>
              </div>
            </div>

            {formData.isGraded && (
              <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">Total Marks</label>
                  <Input type="number" name="totalMarks" value={formData.totalMarks} onChange={handleChange} className="h-12" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">Passing Marks</label>
                  <Input type="number" name="passingMarks" value={formData.passingMarks} onChange={handleChange} className="h-12" />
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                <Paperclip size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Attachments</h2>
            </div>

            <div 
              className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center space-y-3 hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer relative group"
            >
              <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} />
              <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                <Upload size={24} className="text-purple-500" />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-gray-900">Drop files here</div>
                <div className="text-[11px] text-gray-500 font-medium">Supported: PDF, DOCX, ZIP (Max 10MB)</div>
              </div>
            </div>

            {attachments.length > 0 && (
              <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                {attachments.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100 group">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-gray-400" />
                      <span className="text-xs font-bold text-gray-700 line-clamp-1">{file.name}</span>
                    </div>
                    <button onClick={() => setAttachments(prev => prev.filter((_, idx) => idx !== i))} className="p-1 text-gray-400 hover:text-red-500">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Instructions */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
                <ListTodo size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Instructions</h2>
            </div>
            <Button variant="ghost" className="text-purple-600 h-8 font-bold" onClick={addInstruction}>
              + Add
            </Button>
          </div>

          <div className="space-y-3">
            {formData.instructions.map((inst, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-black">{i + 1}</span>
                <Input 
                  value={inst} 
                  onChange={(e) => {
                    const newInsts = [...formData.instructions];
                    newInsts[i] = e.target.value;
                    setFormData(p => ({...p, instructions: newInsts}));
                  }}
                  className="h-10 text-sm"
                />
                <button onClick={() => removeInstruction(i)} className="text-gray-300 hover:text-red-500 transition-colors">
                  <X size={18} />
                </button>
              </div>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-xs font-black">{formData.instructions.length + 1}</span>
              <Input 
                placeholder="Add another instruction..." 
                className="h-10 text-sm border-dashed" 
                value={newInstruction} 
                onChange={(e) => setNewInstruction(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addInstruction()}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6">
          <Button variant="ghost" className="text-gray-500 font-bold" onClick={onCancel}>Cancel</Button>
          <Button variant="outline" className="border-gray-200 font-bold px-8">Save as Draft</Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-black px-12 h-12 shadow-lg shadow-purple-100 uppercase tracking-widest text-sm">
            Publish Assignment
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </div>

      {/* Preview Side */}
      <div className="space-y-4">
        <div className="sticky top-24">
          <div className="flex items-center gap-2 mb-4 px-2">
            <Eye size={16} className="text-gray-400" />
            <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest">Live Card Preview</h3>
          </div>
          
          <Card className="hover:shadow-xl transition-all duration-500 border-t-4 overflow-hidden bg-white" style={{ borderTopColor: '#5E4E99' }}>
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider">{formData.type}</Badge>
                  <div className="px-2 py-0.5 rounded text-[10px] font-bold uppercase border text-amber-600 bg-amber-50 border-amber-100">
                    {formData.difficulty}
                  </div>
                </div>
                <Badge variant="Active" className="text-[10px] uppercase font-bold tracking-wider">
                  ACTIVE
                </Badge>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-gray-900 leading-tight line-clamp-2 min-h-[3rem]">
                  {formData.title || 'Assignment Title Here'}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">{formData.subject}</span>
                  <span className="text-xs font-medium text-gray-400">•</span>
                  <span className="text-xs font-black px-2 py-0.5 bg-purple-50 text-purple-700 rounded-full">{formData.batch}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-[10px] font-bold text-purple-700 leading-none">
                  PS
                </div>
                <span className="text-xs font-bold">Priya Sharma</span>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-black text-gray-800">
                  <Calendar size={14} className="text-purple-500" />
                  <span>Due: {formData.dueDate || 'Select date'} • {formData.dueTime}</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-tighter">
                    <span>0 / 42 submitted</span>
                    <span>0%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full" />
                </div>
                
                <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase">
                  <span>Viewed: 0</span>
                  <span>Avg: —</span>
                </div>
              </div>

              <div className="w-full h-10 border-2 border-dashed border-gray-100 rounded-xl flex items-center justify-center text-gray-300 font-black text-xs uppercase tracking-widest">
                Card Footer Region
              </div>
            </div>
          </Card>

          <div className="mt-6 p-6 bg-purple-50 rounded-2xl border border-purple-100 flex items-start gap-4">
            <div className="p-2 bg-white rounded-lg text-purple-600 shadow-sm">
              <AlertCircle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-purple-900">Pro Tip</h4>
              <p className="text-xs text-purple-700 mt-1 leading-relaxed">
                Add clear, numbered instructions and relevant attachments to help students complete the assignment efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
