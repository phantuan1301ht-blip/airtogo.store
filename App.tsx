import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SEOForm from './components/SEOForm';
import ResultCard from './components/ResultCard';
import { generateSEOContent } from './services/geminiService';
import { Bot, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (description: string, imageFile: File | null, language: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const seoContent = await generateSEOContent(description, imageFile, language);
      setResult(seoContent);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Header />
      <Hero />
      
      {/* Main Content moved up slightly to overlap or sit nicely below hero */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <SEOForm onSubmit={handleSubmit} isLoading={loading} />
            
            {/* Trust Indicators */}
            <div className="px-4 py-2 hidden lg:block">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                System Capabilities
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                  Real-time Trend Analysis
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                  Multi-language Localisation
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                  Conversion-Focused Copywriting
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Output (7 cols) */}
          <div className="lg:col-span-7 flex flex-col h-full min-h-[600px]">
            {error && (
              <div className="bg-white border-l-4 border-red-500 p-6 mb-6 rounded-r-lg shadow-sm animate-fade-in-up">
                <div className="flex">
                  <div className="ml-1">
                    <p className="text-sm font-bold text-red-600 uppercase tracking-wide mb-1">Error</p>
                    <p className="text-sm text-slate-600">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {result ? (
              <ResultCard content={result} />
            ) : (
              <div className="h-full bg-white rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center p-12 text-center text-slate-400 shadow-sm">
                {!loading ? (
                  <div className="max-w-xs">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Bot className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-lg font-bold text-slate-900 mb-2">Ready to Generate</p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Upload your product details on the left to receive a comprehensive SEO report.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center w-full max-w-sm">
                    <div className="space-y-4 w-full">
                      <div className="h-4 bg-slate-100 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-slate-100 rounded w-5/6 animate-pulse"></div>
                      <div className="h-4 bg-slate-100 rounded w-4/6 animate-pulse"></div>
                    </div>
                    <p className="mt-8 text-xs font-bold text-indigo-500 uppercase tracking-widest animate-pulse">Generating Content...</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="border-t border-slate-800 py-12 mt-auto bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest">
            © {new Date().getFullYear()} SEO Master AI. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;