'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Check, X } from 'lucide-react';

export default function Plans() {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "/ month",
      color: "border-gray-200 hover:border-gray-300",
      badge: "gray",
      customers: 20,
      features: [
        { text: "Up to 50 students", included: true },
        { text: "1 batch", included: true },
        { text: "Basic attendance", included: true },
        { text: "No analytics", included: true },
        { text: "Email support", included: true },
        { text: "CRM pipeline", included: false },
        { text: "Timetable + assignments", included: false }
      ]
    },
    {
      name: "Basic",
      price: "₹500",
      period: "/ month",
      color: "border-blue-200 shadow-md ring-1 ring-blue-500",
      badge: "blue",
      popular: true,
      customers: 41,
      features: [
        { text: "Up to 200 students", included: true },
        { text: "5 batches", included: true },
        { text: "Attendance + fees", included: true },
        { text: "Basic analytics", included: true },
        { text: "Email + chat support", included: true },
        { text: "CRM pipeline", included: false },
        { text: "Timetable + assignments", included: false }
      ]
    },
    {
      name: "Pro",
      price: "₹1,000",
      period: "/ month",
      color: "border-[#EAE7F8] border-2",
      badge: "purple",
      customers: 48,
      features: [
        { text: "Unlimited students", included: true },
        { text: "Unlimited batches", included: true },
        { text: "Full analytics + reports", included: true },
        { text: "CRM pipeline", included: true },
        { text: "Timetable + assignments", included: true },
        { text: "Priority support + onboarding", included: true }
      ]
    }
  ];

  return (
    <div className="space-y-10 max-w-[1200px] mx-auto pb-12">
      <div className="text-center space-y-2 mt-4">
        <h1 className="text-3xl font-bold text-gray-900">Plans & Pricing</h1>
        <p className="text-gray-500">Manage SAAS subscription tiers and track adoption.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {plans.map((plan, i) => (
          <div key={i} className={`bg-white rounded-2xl border ${plan.color} overflow-hidden transition-all relative flex flex-col h-full`}>
            {plan.popular && (
              <div className="bg-blue-500 text-white text-xs font-bold uppercase tracking-wider text-center py-1 absolute top-0 w-full left-0 z-10">
                Most Popular
              </div>
            )}
            <div className={`p-8 ${plan.popular ? 'pt-10' : ''}`}>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-gray-500 font-medium">{plan.period}</span>
              </div>
              <Button variant={plan.popular ? 'primary' : 'outline'} fullWidth>Edit Plan</Button>
            </div>
            
            <div className="p-8 pt-0 border-t border-gray-50 flex-1 flex flex-col bg-gray-50/30">
              <div className="py-4 border-b border-gray-100 mb-6">
                <p className="text-sm font-medium text-gray-600">Current customers: <span className="font-bold text-gray-900">{plan.customers}</span></p>
              </div>
              <ul className="space-y-4 flex-1">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex flex-start gap-3 items-center">
                    {f.included ? (
                      <Check className="w-5 h-5 text-green-500 shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 shrink-0" />
                    )}
                    <span className={`text-sm ${f.included ? 'text-gray-700' : 'text-gray-400'}`}>{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
