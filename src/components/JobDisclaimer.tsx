import { AlertCircle } from 'lucide-react';

export function JobDisclaimer() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-amber-900">
        <strong>Disclaimer:</strong> The Info Stack is not the employer. We only curate opportunities.
      </p>
    </div>
  );
}
