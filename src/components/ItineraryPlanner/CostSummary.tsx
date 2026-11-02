import React from 'react';
import { IndianRupee, PieChart, Info, ShoppingBag, Utensils, Ticket, Car } from 'lucide-react';
import { ItineraryPlan } from '../../types';

interface CostSummaryProps {
  plan: ItineraryPlan;
}

export const CostSummary: React.FC<CostSummaryProps> = ({ plan }) => {
  // Approximate categorical budget split
  const total = plan.totalEstimatedCostINR;
  const entryFeeEst = Math.round(total * 0.25);
  const foodEst = Math.round(total * 0.40);
  const transportEst = Math.round(total * 0.20);
  const shoppingEst = Math.round(total * 0.15);

  return (
    <div className="bg-gradient-to-br from-amber-50/60 to-orange-50/60 rounded-3xl border border-orange-200/80 p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-orange-200/60">
        <div className="flex items-center gap-2">
          <PieChart className="w-5 h-5 text-orange-600" />
          <h4 className="text-sm font-bold text-slate-900">Estimated Expense Breakdown</h4>
        </div>
        <div className="flex items-center text-orange-700 font-extrabold text-base sm:text-lg">
          <IndianRupee className="w-4 h-4 mr-0.5" />
          <span>{total.toLocaleString('en-IN')}</span>
          <span className="text-xs font-normal text-slate-500 ml-1">/ person</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        <div className="bg-white/80 p-3 rounded-2xl border border-orange-100 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <Ticket className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">Attractions</div>
            <div className="text-xs font-bold text-slate-900">₹{entryFeeEst.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="bg-white/80 p-3 rounded-2xl border border-orange-100 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Utensils className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">Food & Treats</div>
            <div className="text-xs font-bold text-slate-900">₹{foodEst.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="bg-white/80 p-3 rounded-2xl border border-orange-100 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <Car className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">Local Transport</div>
            <div className="text-xs font-bold text-slate-900">₹{transportEst.toLocaleString('en-IN')}</div>
          </div>
        </div>

        <div className="bg-white/80 p-3 rounded-2xl border border-orange-100 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-medium">Artisan / Souvenirs</div>
            <div className="text-xs font-bold text-slate-900">₹{shoppingEst.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2 text-[11px] text-slate-500 bg-white/60 p-2.5 rounded-xl border border-orange-100/60">
        <Info className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
        <span>
          {plan.localEconomicImpactNote}
        </span>
      </div>
    </div>
  );
};
