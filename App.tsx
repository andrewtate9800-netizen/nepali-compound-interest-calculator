
import React, { useState } from 'react';
import { Calculator, RotateCcw, TrendingUp, Globe, Settings2 } from 'lucide-react';
import { DateState, CalculationResult, Language, CalculationType } from './types';
import DateCard from './components/DateCard';
import { calculateTimeBreakdown, calculateInterest, formatCurrency, formatNumber, TimeBreakdown } from './utils/calculations';

const translations = {
  ne: {
    title: "चक्रिय ब्याज निकाल्नुहोस्",
    loanDate: "रकम लिएको मिति",
    payDate: "रकम बुझाउने मिति",
    principal: "मूलधन (Principal)",
    rate: "ब्याज दर (Monthly Rate %)",
    ratePlaceholder: "२.०",
    principalPlaceholder: "रु. ३,५०,०००",
    rateDesc: "ब्याजदर प्रति महिना लेख्नुहोला",
    calcBtn: "हिसाब गर्नुहोस्",
    resetBtn: "अर्को हिसाब",
    error: "कृपया सबै विवरणहरू भर्नुहोला।",
    totalInterest: "जम्मा ब्याज",
    totalAmount: "कुल जम्मा",
    timePeriod: "कुल समय",
    year: "साल",
    month: "महिना",
    day: "दिन",
    method: "हिसाब गर्ने तरिका",
    methodNepali: "नेपाली शैली (वार्षिक)",
    methodStandard: "मानक चक्रिय (मासिक)",
    dev: "सुदिप कुमार चौधरी",
    role: "App Developer",
    connect: "Connect",
    perMonth: "प्रति महिना"
  },
  en: {
    title: "Compound Interest Calculator",
    loanDate: "Loan Date",
    payDate: "Payment Date",
    principal: "Principal",
    rate: "Interest Rate (Monthly %)",
    ratePlaceholder: "2.0",
    principalPlaceholder: "Rs. 3,50,000",
    rateDesc: "Enter monthly interest rate",
    calcBtn: "Calculate Now",
    resetBtn: "Calculate Again",
    error: "Please fill all details.",
    totalInterest: "TOTAL INTEREST",
    totalAmount: "TOTAL AMOUNT",
    timePeriod: "TIME PERIOD",
    year: "Year",
    month: "Month",
    day: "Day",
    method: "Calculation Method",
    methodNepali: "Nepali Style (Yearly)",
    methodStandard: "Standard (Monthly)",
    dev: "Sudip Kumar Chaudhary",
    role: "App Developer",
    connect: "Connect",
    perMonth: "Per Month"
  }
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ne');
  const [calcType, setCalcType] = useState<CalculationType>('nepali');
  const [loanDate, setLoanDate] = useState<DateState>({ year: '', month: '', day: '' });
  const [payDate, setPayDate] = useState<DateState>({ year: '', month: '', day: '' });
  const [principal, setPrincipal] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [timeBreakdown, setTimeBreakdown] = useState<TimeBreakdown | null>(null);
  const [error, setError] = useState<string>('');

  const t = translations[lang];

  const handleLoanChange = (field: keyof DateState, value: string) => {
    setLoanDate(prev => ({ ...prev, [field]: value }));
  };

  const handlePayChange = (field: keyof DateState, value: string) => {
    setPayDate(prev => ({ ...prev, [field]: value }));
  };

  const reset = () => {
    setLoanDate({ year: '', month: '', day: '' });
    setPayDate({ year: '', month: '', day: '' });
    setPrincipal('');
    setRate('');
    setResult(null);
    setTimeBreakdown(null);
    setError('');
  };

  const handleCalculate = () => {
    if (!loanDate.year || !loanDate.month || !loanDate.day ||
        !payDate.year || !payDate.month || !payDate.day ||
        !principal || !rate) {
      setError(t.error);
      return;
    }

    setError('');
    const breakdown = calculateTimeBreakdown(loanDate, payDate);
    const p = parseFloat(principal);
    const r = parseFloat(rate);

    const calculation = calculateInterest(p, r, breakdown, calcType);
    setResult(calculation);
    setTimeBreakdown(breakdown);
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gradient-to-tr from-[#0f172a] via-[#1e3a8a] to-[#7f1d1d] pb-32 relative font-sans flex flex-col selection:bg-yellow-400 selection:text-black overflow-x-hidden">
      
      {/* Language Toggle & Header */}
      <div className="pt-4 px-4">
        <div className="flex justify-center mb-2">
            <div className="bg-black/40 p-1 rounded-full flex gap-1 border border-white/10 backdrop-blur-md">
                <button 
                  onClick={() => setLang('ne')}
                  className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${lang === 'ne' ? 'bg-yellow-500 text-black shadow-lg' : 'text-white/60'}`}
                >नेपाली</button>
                <button 
                  onClick={() => setLang('en')}
                  className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${lang === 'en' ? 'bg-yellow-500 text-black shadow-lg' : 'text-white/60'}`}
                >ENGLISH</button>
            </div>
        </div>
      </div>

      <header className="bg-black/20 backdrop-blur-md p-4 flex items-center gap-3 border-b border-white/10 sticky top-0 z-20 shadow-xl">
        <div className="bg-yellow-500 p-1.5 rounded-lg shadow-inner">
           <Calculator className="w-6 h-6 text-black" />
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight drop-shadow-lg">{t.title}</h1>
      </header>

      <main className="p-4 flex-grow space-y-5 overflow-y-auto">
        {!result ? (
          <>
            {error && (
              <div className="bg-red-500/30 backdrop-blur-sm border border-red-500/50 text-red-100 p-4 rounded-xl text-sm mb-2 shadow-lg animate-pulse">
                ⚠️ {error}
              </div>
            )}

            <DateCard 
              title={t.loanDate} 
              bgColor="bg-emerald-700/80" 
              state={loanDate} 
              onChange={handleLoanChange}
              lang={lang}
            />

            <DateCard 
              title={t.payDate} 
              bgColor="bg-rose-700/80" 
              state={payDate} 
              onChange={handlePayChange}
              lang={lang}
            />

            {/* Calculation Method Selection */}
            <div className="bg-slate-800/60 p-5 rounded-2xl shadow-xl border border-white/10 space-y-3">
               <h3 className="text-sky-200 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                 <Settings2 className="w-4 h-4" /> {t.method}
               </h3>
               <div className="grid grid-cols-1 gap-2">
                  <button 
                    onClick={() => setCalcType('nepali')}
                    className={`text-left p-3 rounded-xl border transition-all flex items-center justify-between ${calcType === 'nepali' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 'bg-black/20 border-white/10 text-white/60'}`}
                  >
                    <span className="font-bold">{t.methodNepali}</span>
                    {calcType === 'nepali' && <div className="w-2 h-2 rounded-full bg-yellow-500" />}
                  </button>
                  <button 
                    onClick={() => setCalcType('standard')}
                    className={`text-left p-3 rounded-xl border transition-all flex items-center justify-between ${calcType === 'standard' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 'bg-black/20 border-white/10 text-white/60'}`}
                  >
                    <span className="font-bold">{t.methodStandard}</span>
                    {calcType === 'standard' && <div className="w-2 h-2 rounded-full bg-yellow-500" />}
                  </button>
               </div>
            </div>

            <div className="bg-sky-700/60 p-6 rounded-2xl shadow-2xl text-white space-y-4 backdrop-blur-md border border-white/10">
              <h2 className="text-xl font-black border-b border-white/20 pb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-400" /> {t.principal} & {t.rate}
              </h2>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label className="text-xs font-bold uppercase tracking-wider text-sky-200 mb-1">{t.principal}</label>
                  <input
                    type="number"
                    placeholder={t.principalPlaceholder}
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 font-black text-xl transition-all"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold uppercase tracking-wider text-sky-200 mb-1">{t.rate}</label>
                  <input
                    type="number"
                    placeholder={t.ratePlaceholder}
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 font-black text-xl transition-all"
                  />
                  <p className="text-[10px] mt-2 text-sky-100/70 italic font-medium">{t.rateDesc}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 active:scale-[0.97] transition-all py-5 rounded-2xl shadow-2xl text-2xl font-black text-white mt-6 uppercase tracking-widest border-b-4 border-orange-800"
            >
              {t.calcBtn}
            </button>
          </>
        ) : (
          /* Result View */
          <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6 pt-2 pb-12">
            
            {/* Summary Details */}
            <div className="bg-black/30 rounded-3xl p-5 border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-sky-300 font-bold">{t.loanDate}:</span>
                    <span className="text-white font-black">{loanDate.year}/{loanDate.month}/{loanDate.day}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-sky-300 font-bold">{t.payDate}:</span>
                    <span className="text-white font-black">{payDate.year}/{payDate.month}/{payDate.day}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-sky-300 font-bold">{t.principal}:</span>
                    <span className="text-yellow-400 font-black">रु {formatNumber(parseFloat(principal))}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-sky-300 font-bold">{t.rate}:</span>
                    <span className="text-white font-black">{rate}% ({t.perMonth})</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-sky-300 font-bold">{t.method}:</span>
                    <span className="text-rose-400 font-black italic">{calcType === 'nepali' ? t.methodNepali : t.methodStandard}</span>
                </div>
            </div>

            {/* Time Breakdown Card */}
            <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
              <h3 className="text-sky-200 text-xs font-black uppercase tracking-[0.2em] mb-1 opacity-70">{t.timePeriod}</h3>
              <p className="text-sky-100 text-2xl font-black">
                {timeBreakdown?.years} {t.year} {timeBreakdown?.months} {t.month} {timeBreakdown?.days} {t.day}
              </p>
            </div>

            {/* Total Interest Card */}
            <div className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] p-8 rounded-[2rem] border border-white/10 shadow-2xl text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <TrendingUp className="w-24 h-24 text-white" />
              </div>
              <h3 className="text-white/60 text-sm font-black uppercase tracking-widest mb-4">{t.totalInterest}</h3>
              <div className="flex flex-col items-center">
                 <span className="text-yellow-400 text-4xl font-black mb-1">रु</span>
                 <p className="text-yellow-400 text-6xl font-black tracking-tight drop-shadow-[0_4px_10px_rgba(250,204,21,0.3)]">
                   {formatCurrency(result.totalInterest)}
                 </p>
              </div>
            </div>

            {/* Total Amount Card */}
            <div className="bg-gradient-to-b from-[#334155] to-[#1e293b] p-10 rounded-[2.5rem] border border-white/10 shadow-2xl text-center">
              <h3 className="text-white/60 text-sm font-black uppercase tracking-widest mb-5">{t.totalAmount}</h3>
              <div className="flex flex-col items-center">
                <span className="text-white text-5xl font-black mb-3">रु</span>
                <p className="text-white text-[4.5rem] leading-[1] font-black tracking-tighter drop-shadow-2xl">
                  {formatCurrency(result.totalAmount)}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={reset}
                className="bg-white hover:bg-yellow-50 text-slate-900 px-10 py-5 rounded-2xl shadow-2xl text-2xl font-black active:scale-95 transition-all border-b-[6px] border-gray-300 flex items-center gap-3"
              >
                <RotateCcw className="w-6 h-6" /> {t.resetBtn}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Developer Footer */}
      <footer className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-black/90 backdrop-blur-2xl flex justify-between items-center px-6 py-4 text-yellow-400 border-t border-white/10 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        <div className="flex flex-col">
          <span className="text-base font-black tracking-tight leading-none mb-1">{t.dev}</span>
          <span className="text-[9px] text-sky-300 uppercase font-black opacity-70">{t.role}</span>
        </div>
        <div className="text-right flex flex-col items-end">
          <span className="text-[10px] text-sky-300 font-black block mb-1">+9779702079484</span>
          <span className="text-[9px] text-yellow-500 uppercase font-black tracking-widest animate-pulse border border-yellow-500/30 px-1 rounded">DONATE TO ESEWA</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
