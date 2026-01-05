import { Info } from 'lucide-react';

export function AffiliateDisclosure() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
      <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-blue-900">
        <strong>Affiliate Disclosure:</strong> Contains affiliate links. We may earn a commission from purchases made through these links at no additional cost to you.
      </p>
    </div>
  );
}
