'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Brain, Sparkles, Target, BookOpen,
  TrendingUp, AlertTriangle, Lightbulb,
  RefreshCw, Download, Share2
} from 'lucide-react';

export const AIInsights: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insights, setInsights] = useState<any>(null);

  const handleGenerateInsights = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis - replace with actual API call
    setTimeout(() => {
      setInsights({
        strengths: [
          { topic: 'Algebra', score: 85, trend: 'improving' },
          { topic: 'Geometry', score: 78, trend: 'stable' },
          { topic: 'Number Systems', score: 82, trend: 'improving' },
        ],
        weaknesses: [
          { topic: 'Calculus', score: 45, trend: 'declining' },
          { topic: 'Statistics', score: 52, trend: 'stable' },
          { topic: 'Probability', score: 48, trend: 'declining' },
        ],
        frequentlyIncorrect: [
          { question: 'Integration by parts', incorrectRate: 72, attempts: 45 },
          { question: 'Standard deviation calculation', incorrectRate: 68, attempts: 42 },
          { question: 'Conditional probability', incorrectRate: 65, attempts: 38 },
        ],
        learningGaps: [
          { gap: 'Understanding of differentiation rules', severity: 'high' },
          { gap: 'Application of integration formulas', severity: 'medium' },
          { gap: 'Statistical interpretation', severity: 'high' },
        ],
        recommendedTopics: [
          { topic: 'Differentiation techniques', priority: 'high', reason: 'Foundation for calculus' },
          { topic: 'Integration basics', priority: 'high', reason: 'Prerequisite for advanced topics' },
          { topic: 'Probability fundamentals', priority: 'medium', reason: 'Improving weak area' },
        ],
        performanceTrends: {
          overall: 'improving',
          subjectWise: {
            Mathematics: 'improving',
            Physics: 'stable',
            Chemistry: 'declining'
          }
        },
        actionableInsights: [
          'Focus on differentiation rules in next 2 weeks',
          'Schedule extra practice sessions for calculus',
          'Review probability concepts with visual aids',
          'Consider peer tutoring for struggling students'
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center">
            <Brain className="w-6 h-6 text-brand-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-text-slate tracking-tight">AI Insights</h2>
            <p className="text-sm font-bold text-gray-400 mt-1">AI-powered analysis of student performance</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleGenerateInsights}
            disabled={isAnalyzing}
            className="h-10 px-4 rounded-xl bg-brand-blue font-black text-[10px] uppercase tracking-widest gap-2"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate Insights
              </>
            )}
          </Button>
          {insights && (
            <>
              <Button variant="outline" className="h-10 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest gap-2">
                <Download className="w-4 h-4" /> Export
              </Button>
              <Button variant="outline" className="h-10 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest gap-2">
                <Share2 className="w-4 h-4" /> Share
              </Button>
            </>
          )}
        </div>
      </div>

      {!insights ? (
        <Card className="p-16 border-none shadow-soft rounded-[32px] bg-white text-center">
          <div className="w-24 h-24 rounded-3xl bg-bg-soft/30 flex items-center justify-center mx-auto mb-6">
            <Brain className="w-12 h-12 text-gray-300" />
          </div>
          <h3 className="text-xl font-black text-text-slate mb-2">Generate AI Insights</h3>
          <p className="text-sm font-bold text-gray-400 mb-6 max-w-md mx-auto">
            Click the button above to analyze test data and generate AI-powered insights about student performance
          </p>
        </Card>
      ) : (
        <>
          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-8 border-none shadow-soft rounded-[32px] bg-white">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-black text-text-slate">Student Strengths</h3>
              </div>
              <div className="space-y-4">
                {insights.strengths.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-green-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <p className="font-black text-text-slate text-sm">{item.topic}</p>
                        <Badge 
                          className={`mt-1 ${
                            item.trend === 'improving' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-gray-100 text-gray-600'
                          } border-none font-black text-[9px] uppercase`}
                        >
                          {item.trend}
                        </Badge>
                      </div>
                    </div>
                    <span className="text-lg font-black text-green-500">{item.score}%</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 border-none shadow-soft rounded-[32px] bg-white">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-black text-text-slate">Areas for Improvement</h3>
              </div>
              <div className="space-y-4">
                {insights.weaknesses.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-red-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <p className="font-black text-text-slate text-sm">{item.topic}</p>
                        <Badge 
                          className={`mt-1 ${
                            item.trend === 'declining' 
                              ? 'bg-red-100 text-red-600' 
                              : 'bg-amber-100 text-amber-600'
                          } border-none font-black text-[9px] uppercase`}
                        >
                          {item.trend}
                        </Badge>
                      </div>
                    </div>
                    <span className="text-lg font-black text-red-500">{item.score}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Frequently Incorrect Questions */}
          <Card className="p-8 border-none shadow-soft rounded-[32px] bg-white">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-black text-text-slate">Frequently Incorrect Questions</h3>
            </div>
            <div className="space-y-4">
              {insights.frequentlyIncorrect.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-amber-50/50">
                  <div className="flex-1">
                    <p className="font-black text-text-slate text-sm mb-1">{item.question}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">{item.attempts} attempts</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${item.incorrectRate}%` }}
                      />
                    </div>
                    <span className="text-sm font-black text-amber-500">{item.incorrectRate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Learning Gaps */}
          <Card className="p-8 border-none shadow-soft rounded-[32px] bg-white">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-black text-text-slate">Identified Learning Gaps</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {insights.learningGaps.map((gap: any, index: number) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-xl border-2 ${
                    gap.severity === 'high' 
                      ? 'border-red-200 bg-red-50/30' 
                      : 'border-amber-200 bg-amber-50/30'
                  }`}
                >
                  <Badge 
                    className={`mb-2 ${
                      gap.severity === 'high' 
                        ? 'bg-red-500 text-white' 
                        : 'bg-amber-500 text-white'
                    } border-none font-black text-[9px] uppercase`}
                  >
                    {gap.severity}
                  </Badge>
                  <p className="font-black text-text-slate text-sm">{gap.gap}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Recommended Topics */}
          <Card className="p-8 border-none shadow-soft rounded-[32px] bg-white">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-5 h-5 text-brand-blue" />
              <h3 className="text-lg font-black text-text-slate">Recommended Topics for Revision</h3>
            </div>
            <div className="space-y-4">
              {insights.recommendedTopics.map((topic: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-brand-blue/5">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      topic.priority === 'high' ? 'bg-brand-blue' : 'bg-brand-blue/50'
                    }`}>
                      <span className="font-black text-white text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-black text-text-slate text-sm">{topic.topic}</p>
                      <p className="text-[10px] font-bold text-gray-400">{topic.reason}</p>
                    </div>
                  </div>
                  <Badge 
                    className={`${
                      topic.priority === 'high' 
                        ? 'bg-brand-blue text-white' 
                        : 'bg-gray-200 text-gray-600'
                    } border-none font-black text-[9px] uppercase`}
                  >
                    {topic.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Performance Trends */}
          <Card className="p-8 border-none shadow-soft rounded-[32px] bg-white">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-black text-text-slate">Performance Trends</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-bg-soft/20">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Overall Trend</p>
                <div className="flex items-center gap-2">
                  <Badge 
                    className={`${
                      insights.performanceTrends.overall === 'improving' 
                        ? 'bg-green-100 text-green-600' 
                        : insights.performanceTrends.overall === 'declining'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600'
                    } border-none font-black text-[10px] uppercase`}
                  >
                    {insights.performanceTrends.overall}
                  </Badge>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Subject-wise Trends</p>
                {Object.entries(insights.performanceTrends.subjectWise).map(([subject, trend]: [string, any]) => (
                  <div key={subject} className="flex items-center justify-between">
                    <span className="text-sm font-black text-text-slate">{subject}</span>
                    <Badge 
                      className={`${
                        trend === 'improving' 
                          ? 'bg-green-100 text-green-600' 
                          : trend === 'declining'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-600'
                      } border-none font-black text-[9px] uppercase`}
                    >
                      {trend}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Actionable Insights */}
          <Card className="p-8 border-none shadow-soft rounded-[32px] bg-gradient-to-br from-brand-blue/5 to-purple-500/5">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-brand-blue" />
              <h3 className="text-lg font-black text-text-slate">Actionable Insights</h3>
            </div>
            <div className="space-y-3">
              {insights.actionableInsights.map((insight: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-white/50">
                  <div className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-black text-white text-xs">{index + 1}</span>
                  </div>
                  <p className="font-bold text-text-slate text-sm">{insight}</p>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};
