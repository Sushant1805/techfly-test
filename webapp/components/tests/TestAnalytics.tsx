'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  TrendingUp, TrendingDown, Users,
  Award, AlertCircle, BarChart3,
  Filter, Download, Calendar
} from 'lucide-react';

interface TestAnalyticsProps {
  selectedTestId?: string;
}

export const TestAnalytics: React.FC<TestAnalyticsProps> = ({ selectedTestId }) => {
  const [loading, setLoading] = useState(false);
  const [testData, setTestData] = useState<any>(null);
  const [marksData, setMarksData] = useState<any[]>([]);

  useEffect(() => {
    if (!selectedTestId) return;

    const fetchTestAnalytics = async () => {
      try {
        setLoading(true);
        const userStr = localStorage.getItem('user');
        if (!userStr) return;

        const user = JSON.parse(userStr);
        const instituteSlug = user.instituteId;

        // Fetch test details
        const testRes = await fetch(`/api/${instituteSlug}/tests`);
        const testData = await testRes.json();

        if (testData.success) {
          const test = testData.tests.find((t: any) => t._id === selectedTestId || t.id === selectedTestId);
          if (test) {
            setTestData(test);

            // Fetch test results/marks
            const resultsRes = await fetch(`/api/${instituteSlug}/test-results?testId=${selectedTestId}`);
            const resultsData = await resultsRes.json();

            if (resultsData.success) {
              setMarksData(resultsData.results || []);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching test analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestAnalytics();
  }, [selectedTestId]);

  const analyticsData = useMemo(() => {
    if (!testData) {
      return {
        totalStudents: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        passPercentage: 0,
        totalMarks: 100,
        topPerformers: [],
        weakStudents: [],
      };
    }

    const totalMarks = testData.maxMarks || 100;
    const passingMarks = testData.passingMarks || 40;

    if (marksData.length === 0) {
      return {
        totalStudents: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        passPercentage: 0,
        totalMarks,
        topPerformers: [],
        weakStudents: [],
      };
    }

    // Calculate real analytics from marks data
    const validMarks = marksData.filter(m => !m.isAbsent);
    const totalStudents = marksData.length;
    const marksObtained = validMarks.map(m => m.marksObtained);
    const averageScore = marksObtained.length > 0
      ? Math.round(marksObtained.reduce((a, b) => a + b, 0) / marksObtained.length)
      : 0;
    const highestScore = marksObtained.length > 0 ? Math.max(...marksObtained) : 0;
    const lowestScore = marksObtained.length > 0 ? Math.min(...marksObtained) : 0;
    const passedCount = validMarks.filter(m => m.marksObtained >= passingMarks).length;
    const passPercentage = validMarks.length > 0
      ? Math.round((passedCount / validMarks.length) * 100)
      : 0;

    // Sort students by marks for top performers and weak students
    const sortedStudents = [...marksData]
      .filter(m => !m.isAbsent)
      .sort((a, b) => b.marksObtained - a.marksObtained);

    const topPerformers = sortedStudents.slice(0, 5).map(m => ({
      name: m.studentId?.name || 'Unknown',
      score: m.marksObtained,
      batch: m.studentId?.batchId?.name || 'Unknown',
    }));

    const weakStudents = sortedStudents.slice(-5).reverse().map(m => ({
      name: m.studentId?.name || 'Unknown',
      score: m.marksObtained,
      batch: m.studentId?.batchId?.name || 'Unknown',
    }));

    return {
      totalStudents,
      averageScore,
      highestScore,
      lowestScore,
      passPercentage,
      totalMarks,
      topPerformers,
      weakStudents,
    };
  }, [testData, marksData]);

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-text-slate tracking-tight">Test Analytics</h2>
          <p className="text-sm font-bold text-gray-400 mt-1">
            {testData ? `Analytics for ${testData.title}` : 'Select a test to view analytics'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest gap-2">
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button className="h-10 px-4 rounded-xl bg-brand-blue font-black text-[10px] uppercase tracking-widest gap-2">
            <Download className="w-4 h-4" /> Export Report
          </Button>
        </div>
      </div>

      {loading ? (
        <Card className="p-12 border-none shadow-soft rounded-[32px] bg-white text-center">
          <p className="font-black text-gray-400">Loading analytics...</p>
        </Card>
      ) : !testData ? (
        <Card className="p-12 border-none shadow-soft rounded-[32px] bg-white text-center">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="font-black text-gray-400">Select a test to view analytics</p>
        </Card>
      ) : marksData.length === 0 ? (
        <Card className="p-12 border-none shadow-soft rounded-[32px] bg-white text-center">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="font-black text-gray-400">No marks data available for this test</p>
          <p className="text-sm font-bold text-gray-300 mt-2">Enter marks first to view analytics</p>
        </Card>
      ) : (
        <>
      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          icon={Users}
          label="Total Students"
          value={analyticsData.totalStudents}
          color="text-brand-blue"
          bgColor="bg-brand-blue/5"
        />
        <MetricCard
          icon={BarChart3}
          label="Average Score"
          value={`${analyticsData.averageScore}%`}
          color="text-green-500"
          bgColor="bg-green-500/5"
        />
        <MetricCard
          icon={Award}
          label="Highest Score"
          value={analyticsData.highestScore}
          color="text-purple-500"
          bgColor="bg-purple-500/5"
        />
        <MetricCard
          icon={AlertCircle}
          label="Pass Percentage"
          value={`${analyticsData.passPercentage}%`}
          color="text-amber-500"
          bgColor="bg-amber-500/5"
        />
      </div>

      {/* Top Performers & Weak Students */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-8 border-none shadow-soft rounded-[32px] bg-white">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-black text-text-slate">Top Performers</h3>
          </div>
          <div className="space-y-4">
            {analyticsData.topPerformers.length > 0 ? (
              analyticsData.topPerformers.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-bg-soft/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center font-black text-green-500">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-black text-text-slate text-sm">{student.name}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">{student.batch}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-50 text-green-600 border-none font-black text-[10px] uppercase">
                    {student.score}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm font-bold text-gray-400 text-center py-4">No data available</p>
            )}
          </div>
        </Card>

        <Card className="p-8 border-none shadow-soft rounded-[32px] bg-white">
          <div className="flex items-center gap-3 mb-6">
            <TrendingDown className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-black text-text-slate">Needs Improvement</h3>
          </div>
          <div className="space-y-4">
            {analyticsData.weakStudents.length > 0 ? (
              analyticsData.weakStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-bg-soft/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center font-black text-red-500">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-black text-text-slate text-sm">{student.name}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">{student.batch}</p>
                    </div>
                  </div>
                  <Badge className="bg-red-50 text-red-600 border-none font-black text-[10px] uppercase">
                    {student.score}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm font-bold text-gray-400 text-center py-4">No data available</p>
            )}
          </div>
        </Card>
      </div>
      </>
      )}
    </div>
  );
};

const MetricCard = ({ icon: Icon, label, value, color, bgColor }: any) => (
  <Card className={`p-6 border-none shadow-soft rounded-[24px] ${bgColor}`}>
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className={`text-2xl font-black ${color}`}>{value}</p>
      </div>
    </div>
  </Card>
);
