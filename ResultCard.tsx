import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, FileText } from 'lucide-react';

interface ResultCardProps {
  content: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ content }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full animate-fade-in-up">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-500" />
          Generated Result
        </h2>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all border ${
            copied 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
              : 'bg-white text-slate-600 hover:text-indigo-600 border-slate-200 hover:border-indigo-200 hover:bg-indigo-50'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              COPIED
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              COPY TEXT
            </>
          )}
        </button>
      </div>
      
      <div className="p-6 md:p-8 overflow-y-auto max-h-[800px]">
        {/* Text Content */}
        <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-7 prose-li:text-slate-600 prose-strong:text-slate-800 prose-a:text-indigo-600 hover:prose-a:text-indigo-700">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-2xl font-extrabold text-slate-900 mb-6 pb-4 border-b border-slate-100" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-lg font-bold text-slate-900 mt-8 mb-4 uppercase tracking-tight flex items-center gap-2" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-base font-bold text-slate-800 mt-6 mb-3" {...props} />,
              p: ({node, ...props}) => <p className="text-slate-600 mb-4 font-normal" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-outside ml-4 space-y-2 text-slate-600 mb-6 marker:text-indigo-300" {...props} />,
              li: ({node, ...props}) => <li className="pl-1" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-slate-900" {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-2 border-indigo-500 bg-indigo-50/30 pl-6 py-4 my-6 not-italic text-slate-700 rounded-r-lg" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;