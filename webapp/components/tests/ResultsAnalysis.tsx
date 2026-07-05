'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, XAxis as LXAxis, YAxis as LYAxis,
  CartesianGrid as LCartesianGrid, Tooltip as LTooltip
} from 'recharts';
import {
  Download, FileDown, TrendingUp, Users,
  Trophy, AlertCircle, ChevronDown, Search,
  Filter, Calendar, PieChart
} from 'lucide-react';

const gradeScale = [
  { grade: 'A+', minPercent: 90, maxPercent: 100, color: '#10b981' },
  { grade: 'A', minPercent: 80, maxPercent: 89, color: '#22c55e' },
  { grade: 'B+', minPercent: 70, maxPercent: 79, color: '#3b82f6' },
  { grade: 'B', minPercent: 60, maxPercent: 69, color: '#8b5cf6' },
  { grade: 'C', minPercent: 50, maxPercent: 59, color: '#f59e0b' },
  { grade: 'D', minPercent: 40, maxPercent: 49, color: '#f97316' },
  { grade: 'F', minPercent: 0, maxPercent: 39, color: '#ef4444' },
];

export const ResultsAnalysis: React.FC = () => {
  const [selectedTestId, setSelectedTestId] = useState<string>('');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tests, setTests] = useState<any[]>([]);
  const [testResults, setTestResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userStr = localStorage.getItem('user');
        if (!userStr) return;

        const user = JSON.parse(userStr);
        const instituteSlug = user.instituteId;

        // Fetch tests
        const testsRes = await fetch(`/api/${instituteSlug}/tests`);
        const testsData = await testsRes.json();

        if (testsData.success) {
          const today = new Date().toISOString().split('T')[0];
          const completedTests = testsData.tests
            .filter((t: any) => t.date < today)
            .map((t: any) => ({
              ...t,
              id: t._id,
              totalMarks: t.maxMarks || 100,
              passingMarks: t.passingMarks || 40,
              scheduledDate: t.date,
              marksEntryDone: false // Will be updated based on results
            }));

          setTests(completedTests);

          // Select first completed test by default
          if (completedTests.length > 0 && !selectedTestId) {
            setSelectedTestId(completedTests[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedTestId) return;

    const fetchTestResults = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (!userStr) return;

        const user = JSON.parse(userStr);
        const instituteSlug = user.instituteId;

        const resultsRes = await fetch(`/api/${instituteSlug}/test-results?testId=${selectedTestId}`);
        const resultsData = await resultsRes.json();

        if (resultsData.success) {
          setTestResults(resultsData.results || []);
        }
      } catch (error) {
        console.error('Error fetching test results:', error);
      }
    };

    fetchTestResults();
  }, [selectedTestId]);

  const completedTests = useMemo(() => tests, [tests]);
  const selectedTest = useMemo(() => tests.find(t => t.id === selectedTestId), [selectedTestId, tests]);

  const testMarks = useMemo(() => {
    return testResults.map((r: any) => {
      const percentage = r.marksObtained && selectedTest
        ? Math.round((r.marksObtained / selectedTest.totalMarks) * 100)
        : 0;
      const grade = gradeScale.find(g => percentage >= g.minPercent && percentage <= g.maxPercent)?.grade || 'F';

      return {
        id: r._id,
        studentId: r.studentId?._id || r.studentId,
        studentName: r.studentId?.name || 'Unknown',
        rollNumber: r.studentId?.rollNumber || 'N/A',
        testId: r.testId,
        marksObtained: r.marksObtained,
        percentage,
        grade,
        isAbsent: r.isAbsent,
        remarks: r.remarks,
      };
    });
  }, [testResults, selectedTest]);

  const metrics = useMemo(() => {
    if (!selectedTest) return null;
    const appeared = testMarks.filter(m => !m.isAbsent).length;
    const absent = testMarks.filter(m => m.isAbsent).length;
    const passCount = testMarks.filter(m => (m.marksObtained || 0) >= selectedTest.passingMarks && !m.isAbsent).length;
    const passPercent = appeared > 0 ? Math.round((passCount / appeared) * 100) : 0;

    const validMarks = testMarks.filter(m => !m.isAbsent && m.marksObtained !== null);
    const marksObtained = validMarks.map(m => m.marksObtained);
    const avg = marksObtained.length > 0
      ? Math.round(marksObtained.reduce((a, b) => a + b, 0) / marksObtained.length)
      : 0;
    const high = marksObtained.length > 0 ? Math.max(...marksObtained) : 0;
    const low = marksObtained.length > 0 ? Math.min(...marksObtained) : 0;

    return {
      total: testMarks.length,
      appeared,
      absent,
      passCount,
      passPercent,
      avg,
      high,
      low
    };
  }, [selectedTest, testMarks]);

  // Histogram Data
  const histogramData = useMemo(() => {
    if (!selectedTest) return [];
    const ranges = [
      { name: '0-20', min: 0, max: 20 },
      { name: '21-40', min: 21, max: 40 },
      { name: '41-60', min: 41, max: 60 },
      { name: '61-80', min: 61, max: 80 },
      { name: '81-100', min: 81, max: 100 },
    ];

    return ranges.map(range => {
      const count = testMarks.filter(m => {
        if (m.isAbsent) return false;
        const p = m.percentage || 0;
        return p >= range.min && p <= range.max;
      }).length;
      return { ...range, count };
    });
  }, [selectedTest, testMarks]);

  const topPerformers = useMemo(() => {
    return [...testMarks]
      .filter(m => !m.isAbsent)
      .sort((a, b) => (b.marksObtained || 0) - (a.marksObtained || 0))
      .slice(0, 3)
      .map((m, idx) => ({ ...m, rank: idx + 1 }));
  }, [testMarks]);

  const needsAttention = useMemo(() => {
    if (!selectedTest) return [];
    return testMarks
      .filter(m => !m.isAbsent && (m.marksObtained || 0) < selectedTest.passingMarks)
      .slice(0, 3);
  }, [selectedTest, testMarks]);

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Analysis Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-6 p-6 rounded-[32px] bg-white shadow-soft">
        <div className="flex flex-wrap items-center gap-4 flex-1">
          <div className="relative flex-1 min-w-[300px]">
            <p className="text-[9px] font-black text-brand-blue uppercase tracking-widest ml-4 mb-1">Analyze results for</p>
            <div className="relative">
               <select
                 className="w-full h-12 rounded-2xl bg-bg-soft/20 border border-gray-100 pl-6 pr-10 text-sm font-black text-text-slate appearance-none focus:outline-none transition-all"
                 value={selectedTestId}
                 onChange={(e) => setSelectedTestId(e.target.value)}
                 disabled={loading || completedTests.length === 0}
               >
                 <option value="" disabled>
                   {loading ? 'Loading tests...' : completedTests.length === 0 ? 'No completed tests available' : 'Select a test...'}
                 </option>
                 {completedTests.map(t => (
                   <option key={t.id} value={t.id}>{t.title} \u2014 {t.batchName} ({t.scheduledDate})</option>
                 ))}
               </select>
               <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
             <Button variant="outline" className="h-12 px-6 rounded-2xl border-gray-100 font-black text-[10px] uppercase tracking-widest gap-2"><Filter className="w-3.5 h-3.5" /> Batch</Button>
             <Button variant="outline" className="h-12 px-6 rounded-2xl border-gray-100 font-black text-[10px] uppercase tracking-widest gap-2"><Calendar className="w-3.5 h-3.5" /> Range</Button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-12 px-8 rounded-2xl border-gray-100 font-black text-[10px] uppercase tracking-widest gap-2 text-gray-400 hover:text-text-slate"><FileDown className="w-4 h-4" /> PDF Result</Button>
          <Button className="h-12 px-8 rounded-2xl bg-text-slate shadow-lg shadow-text-slate/20 font-black text-[10px] uppercase tracking-widest gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>
      </div>

      {loading ? (
        <Card className="p-12 border-none shadow-soft rounded-[32px] bg-white text-center">
          <p className="font-black text-gray-400">Loading test data...</p>
        </Card>
      ) : !selectedTest ? (
        <Card className="p-12 border-none shadow-soft rounded-[32px] bg-white text-center">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="font-black text-gray-400">Select a completed test to view analysis</p>
        </Card>
      ) : testMarks.length === 0 ? (
        <Card className="p-12 border-none shadow-soft rounded-[32px] bg-white text-center">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="font-black text-gray-400">No marks data available for this test</p>
          <p className="text-sm font-bold text-gray-300 mt-2">Enter marks first to view analysis</p>
        </Card>
      ) : (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* 2. Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <StatCard label="Appeared" value={metrics!.appeared} icon={Users} color="text-brand-blue" sub={`of ${metrics!.total}`} />
            <StatCard label="Absent" value={metrics!.absent} icon={AlertCircle} color="text-red-400" sub="Need justification" />
            <StatCard label="Avg Score" value={Math.round((metrics!.avg || 0) / (selectedTest.totalMarks || 1) * 100) + '%'} icon={TrendingUp} color="text-text-slate" sub={`${metrics!.avg}/${selectedTest.totalMarks}`} />
            <StatCard label="Highest" value={metrics!.high || 0} icon={Trophy} color="text-green-500" sub="Top Performer" />
            <StatCard label="Pass %" value={metrics!.passPercent + '%'} icon={PieChart} color={metrics!.passPercent > 70 ? 'text-green-500' : 'text-amber-500'} sub={`${metrics!.passCount} Passed`} />
            <StatCard label="Passing Mark" value={selectedTest.passingMarks} icon={AlertCircle} color="text-orange-400" sub={`of ${selectedTest.totalMarks}`} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* 3. Score Distribution Chart */}
            <Card className="lg:col-span-2 p-10 border-none shadow-soft rounded-[40px] bg-white">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-xl font-black text-text-slate tracking-tight leading-none mb-2">Score Distribution</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Histogram analysis of student percentage ranges</p>
                </div>
                <div className="flex items-center gap-2">
                  {gradeScale.map(g => (
                    <div key={g.grade} className="flex items-center gap-1.5 ml-2">
                      <div className="w-2.5 h-2.5 rounded-full shadow-inner" style={{ backgroundColor: g.color }} />
                      <span className="text-[9px] font-black text-gray-400 uppercase">{g.grade}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={histogramData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#64748B' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#64748B' }} />
                    <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }} />
                    <Bar dataKey="count" radius={[12, 12, 0, 0]} barSize={60}>
                      {histogramData.map((entry, index) => {
                        const colors = ['#f43f5e', '#f59e0b', '#3b82f6', '#8b5cf6', '#10b981'];
                        return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* 4. Top & Weak Performers */}
            <div className="space-y-6">
              <Card className="p-8 border-none shadow-soft rounded-[40px] bg-gradient-to-br from-brand-blue to-[#4D3F87] text-white h-fit">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-xl font-black tracking-tight leading-none flex items-center gap-3"><Trophy className="w-6 h-6 text-amber-300" /> Top Performers</h3>
                   <Badge className="bg-white/10 text-white border-white/20">3🥇</Badge>
                </div>
                <div className="space-y-4">
                  {topPerformers.map((p, idx) => (
                    <div key={p.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="text-xl font-black opacity-40 italic w-4">{idx + 1}</div>
                        <div>
                          <p className="font-black text-sm">{p.studentName}</p>
                          <p className="text-[9px] font-black uppercase text-white/40">{p.rollNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-lg">{p.marksObtained}</p>
                        <p className="text-[9px] font-black uppercase text-white/40">{p.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8 border-none shadow-soft rounded-[40px] bg-red-50 text-red-900 h-fit border-2 border-red-100/50">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-xl font-black tracking-tight leading-none flex items-center gap-3"><AlertCircle className="w-6 h-6 text-red-500" /> Needs Attention</h3>
                   {needsAttention.length > 0 && <Badge className="bg-red-200 text-red-700 border-none">{needsAttention.length}</Badge>}
                </div>
                {needsAttention.length > 0 ? (
                  <div className="space-y-4">
                    {needsAttention.map(p => (
                      <div key={p.id} className="flex items-center justify-between p-4 rounded-2xl bg-white border border-red-100 transition-all shadow-sm group hover:scale-[1.02]">
                        <div>
                           <p className="font-black text-sm text-text-slate leading-none mb-1">{p.studentName}</p>
                           <p className="text-[9px] font-black uppercase text-red-400/60 leading-none">Score: {p.marksObtained}/{selectedTest.totalMarks}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 px-4 rounded-xl text-[9px] font-black uppercase text-red-500 bg-red-50 hover:bg-red-500 hover:text-white border-none">Notify</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-10 text-center space-y-2 opacity-40">
                    <p className="text-sm font-black">All students passed!</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest">Keep up the momentum</p>
                  </div>
                )}
              </Card>
            </div>
          </div>

          {/* 5. Results Table */}
          <section className="space-y-6">
            <h3 className="text-lg font-black text-text-slate tracking-tight px-2 flex items-center gap-3">
              Full Results Table <Badge variant="Inactive" className="px-2.5">{testMarks.length} Students</Badge>
            </h3>
            <Card className="border-none shadow-soft rounded-[40px] overflow-hidden bg-white">
               <table className="w-full text-left">
                  <thead className="bg-bg-soft/30 h-16 border-b border-gray-50">
                    <tr>
                      <th className="pl-10 text-[10px] font-black text-gray-400 uppercase tracking-widest w-20">Rank</th>
                      <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                      <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Marks</th>
                      <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Percent</th>
                      <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Grade</th>
                      <th className="pr-10 text-[10px] font-black text-gray-400 uppercase tracking-widest">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {testMarks.sort((a,b) => (b.marksObtained || 0) - (a.marksObtained || 0)).map(mark => (
                      <tr key={mark.id} className={`h-20 transition-colors group ${mark.isAbsent ? 'opacity-40 grayscale bg-gray-50/50' : 'hover:bg-bg-soft/5 cursor-pointer'}`} onClick={() => !mark.isAbsent && setSelectedStudentId(mark.studentId)}>
                        <td className="pl-10">
                          {mark.rank === 1 && <span className="text-2xl">🥇</span>}
                          {mark.rank === 2 && <span className="text-2xl">🥈</span>}
                          {mark.rank === 3 && <span className="text-2xl">🥉</span>}
                          {(!mark.rank || mark.rank > 3) && <span className="font-black text-gray-300 text-sm ml-1">#{mark.rank || "\u2014"}</span>}
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-xl bg-bg-soft flex items-center justify-center font-black text-brand-blue text-xs group-hover:scale-110 transition-transform">
                               {mark.studentName.charAt(0)}
                             </div>
                             <div>
                                <p className="font-black text-sm text-text-slate leading-none mb-1">{mark.studentName}</p>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{mark.rollNumber}</p>
                             </div>
                          </div>
                        </td>
                        <td>
                          <span className="font-black text-text-slate">{mark.marksObtained !== null ? `${mark.marksObtained}/${selectedTest.totalMarks}` : "ABS"}</span>
                        </td>
                        <td>
                           <span className={`font-black ${mark.percentage ? (mark.percentage >= 70 ? 'text-green-500' : (mark.percentage >= 40 ? 'text-amber-500' : 'text-red-500')) : 'text-gray-300'}`}>
                             {mark.percentage !== null ? `${mark.percentage}%` : "\u2014"}
                           </span>
                        </td>
                        <td className="text-center">
                          {mark.grade ? (
                            <Badge className="font-black text-[9px] uppercase tracking-widest border-none px-3" style={{ backgroundColor: `${gradeScale.find(g => g.grade === mark.grade)?.color}15`, color: gradeScale.find(g => g.grade === mark.grade)?.color }}>
                              {mark.grade}
                            </Badge>
                          ) : "\u2014"}
                        </td>
                        <td className="pr-10">
                          <p className="text-[10px] font-bold text-gray-400 italic">"{mark.remarks || 'Keep it up'}"</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </Card>
          </section>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, sub, color, icon: Icon }: any) => (
  <Card className="p-6 border-none shadow-soft rounded-[32px] bg-white group hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between">
    <div className="w-10 h-10 rounded-xl bg-bg-soft flex items-center justify-center text-brand-blue mb-4 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <h3 className={`text-2xl font-black tracking-tight ${color}`}>{value}</h3>
      <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mt-1.5">{sub}</p>
    </div>
  </Card>
);
