'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Analytics() {
  const statCards = [
    { title: "New Signups This Month", value: "8" },
    { title: "Churn This Month", value: "3" },
    { title: "Net MRR Growth", value: "+₹18,000" },
    { title: "Avg Revenue Per Customer", value: "₹2,258" },
  ];

  const mrrGrowth = [
    { name: 'May', mrr: 150000 }, { name: 'Jun', mrr: 160000 },
    { name: 'Jul', mrr: 155000 }, { name: 'Aug', mrr: 170000 },
    { name: 'Sep', mrr: 180000 }, { name: 'Oct', mrr: 210000 },
    { name: 'Nov', mrr: 180000 }, { name: 'Dec', mrr: 200000 },
    { name: 'Jan', mrr: 220000 }, { name: 'Feb', mrr: 240000 },
    { name: 'Mar', mrr: 260000 }, { name: 'Apr', mrr: 280000 },
  ];

  const newVsChurn = [
    { name: 'Nov', new: 12, churn: 2 }, { name: 'Dec', new: 15, churn: 1 },
    { name: 'Jan', new: 8, churn: 4 }, { name: 'Feb', new: 22, churn: 2 },
    { name: 'Mar', new: 18, churn: 3 }, { name: 'Apr', new: 8, churn: 3 },
  ];

  const planDist = [
    { name: 'Nov', pro: 38, basic: 30, free: 15 },
    { name: 'Dec', pro: 40, basic: 32, free: 15 },
    { name: 'Jan', pro: 42, basic: 35, free: 18 },
    { name: 'Feb', pro: 45, basic: 38, free: 19 },
    { name: 'Mar', pro: 46, basic: 40, free: 20 },
    { name: 'Apr', pro: 48, basic: 41, free: 20 },
  ];

  const acquisitionSource = [
    { name: 'Google Ads', value: 38, color: '#3b82f6' },
    { name: 'Referral', value: 29, color: '#10b981' },
    { name: 'Website', value: 18, color: '#f59e0b' },
    { name: 'Cold Call', value: 15, color: '#6366f1' },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-12">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">Platform Analytics</h1>
        <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 outline-none">
          <option>Last 30 Days</option>
          <option>Last 3 Months</option>
          <option>Last 1 Year</option>
          <option>All Time</option>
        </select>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <p className="text-sm font-medium text-gray-500 mb-2">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">MRR Growth (12 Months)</h3>
          </div>
          <CardContent className="h-[300px] p-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mrrGrowth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis 
                  axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickFormatter={(val) => `₹${val/1000}k`}
                />
                <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                <Line type="monotone" dataKey="mrr" stroke="#5E4E99" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">New vs Churned Customers</h3>
          </div>
          <CardContent className="h-[300px] p-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={newVsChurn}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="new" name="New" fill="#10b981" radius={[2, 2, 0, 0]} barSize={20} />
                <Bar dataKey="churn" name="Churned" fill="#ef4444" radius={[2, 2, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Plan Distribution Over Time</h3>
          </div>
          <CardContent className="h-[300px] p-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={planDist}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="pro" name="Pro" stackId="a" fill="#7e22ce" barSize={30} />
                <Bar dataKey="basic" name="Basic" stackId="a" fill="#3b82f6" barSize={30} />
                <Bar dataKey="free" name="Free" stackId="a" fill="#9ca3af" radius={[2, 2, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Customer Acquisition by Source</h3>
          </div>
          <CardContent className="h-[300px] p-6 flex flex-col sm:flex-row items-center">
            <div className="w-full sm:w-1/2 h-full min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={acquisitionSource}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {acquisitionSource.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full sm:w-1/2 space-y-4 pl-0 sm:pl-8 mt-4 sm:mt-0">
              {acquisitionSource.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Top Customers by Revenue</h3>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="py-3 px-6 font-medium">Rank</th>
                <th className="py-3 px-6 font-medium">Institute</th>
                <th className="py-3 px-6 font-medium">Plan</th>
                <th className="py-3 px-6 font-medium">MRR</th>
                <th className="py-3 px-6 font-medium">Since</th>
                <th className="py-3 px-6 font-medium">Region</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-4 px-6 text-gray-900 font-bold">#1</td>
                <td className="py-4 px-6 text-gray-900 font-medium">Focus Academy</td>
                <td className="py-4 px-6 text-purple-600 font-medium">Pro</td>
                <td className="py-4 px-6 text-gray-900">₹12,000</td>
                <td className="py-4 px-6 text-gray-500">Oct 2024</td>
                <td className="py-4 px-6 text-gray-500">Pune</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-4 px-6 text-gray-900 font-bold">#2</td>
                <td className="py-4 px-6 text-gray-900 font-medium">Vidya Mandir Classes</td>
                <td className="py-4 px-6 text-purple-600 font-medium">Pro</td>
                <td className="py-4 px-6 text-gray-900">₹12,000</td>
                <td className="py-4 px-6 text-gray-500">Nov 2024</td>
                <td className="py-4 px-6 text-gray-500">Aurangabad</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-gray-900 font-bold">#3</td>
                <td className="py-4 px-6 text-gray-900 font-medium">NextGen Academy</td>
                <td className="py-4 px-6 text-purple-600 font-medium">Pro</td>
                <td className="py-4 px-6 text-gray-900">₹12,000</td>
                <td className="py-4 px-6 text-gray-500">Dec 2024</td>
                <td className="py-4 px-6 text-gray-500">Hyderabad</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
