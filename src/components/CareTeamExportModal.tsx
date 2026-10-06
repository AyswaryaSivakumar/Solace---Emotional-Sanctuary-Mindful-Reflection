import React, { useState } from 'react';
import { X, Copy, Check, Download, ShieldCheck, Mail } from 'lucide-react';
import { MoodLogEntry } from '../types';

interface CareTeamExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: MoodLogEntry[];
}

export const CareTeamExportModal: React.FC<CareTeamExportModalProps> = ({
  isOpen,
  onClose,
  logs,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const summaryText = `SOLACE REFLECTION SUMMARY (Care Team Copy)
Client: Maya Vance
Reporting Window: Last 7 Days (Current Streak: 14 Days)
Average Resonance Score: 7.2 / 10
Primary Emotional Rhythm: Mostly Grounded & Reflective

EMOTIONAL THEME DISTRIBUTION:
• Hopeful: 38%
• Overwhelmed: 24%
• Calm: 22%
• Restless: 16%

IDENTIFIED NOURISHING FACTORS:
• Morning Literature Lift: Noticeable lightening of anxiety when reading reflective prose prior to noon.
• Evening Breath Integration: 20% self-reported increase in calm following intentional 4-7-8 breathing.

RECENT LOGGED ENTRIES:
${logs
  .map(
    (l) =>
      `• [${l.date} ${l.time}] Score: ${l.score}/10 (${l.label})
   Tags: ${l.tags.join(', ')}
   Note: "${l.quote}"
   Story Anchor: ${l.linkedStoryTitle || 'Self-Reflection'}`
  )
  .join('\n\n')}

Confidential & securely stored on user device. Generated via Solace Sanctuary.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Maya_Vance_Solace_Summary_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-[#FAF7F2] w-full max-w-lg rounded-3xl shadow-2xl border border-[#EDE4D8] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 pb-3 flex items-center justify-between border-b border-[#EAE1D3]">
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#2E2A27]">
              Care Team Reflection Summary
            </h3>
            <p className="text-xs text-[#82786F]">Longitudinal emotional notes for your therapist or provider</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#E5DCD0] text-stone-600 flex items-center justify-center hover:bg-stone-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preview box */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-[#E8DFD3] font-mono text-xs text-[#3E3730] whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto shadow-inner">
            {summaryText}
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-[#EBF1EA] text-[#3E553B] text-xs">
            <ShieldCheck className="w-4 h-4 shrink-0 text-[#6B8567]" />
            <span>Encrypted on device. No sensitive data was transmitted to third-party ad networks.</span>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 bg-[#FAF5EE] border-t border-[#EAE0D2] flex flex-wrap gap-2 justify-end">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#DDD3C6] text-xs font-medium text-[#423A33] hover:bg-stone-50 shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied to Clipboard
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy Summary
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#BD5B3E] text-white text-xs font-medium hover:bg-[#A94E34] transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" /> Download .TXT Report
          </button>
        </div>
      </div>
    </div>
  );
};
