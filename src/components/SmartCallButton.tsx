import { useState, useCallback, type ReactNode } from 'react';
import { Phone, Check, Copy } from 'lucide-react';
import siteConfig from '../config/siteConfig';

interface SmartCallProps {
  className?: string;
  variant?: 'primary' | 'accent' | 'outline' | 'subtle';
  children?: ReactNode;
  showIcon?: boolean;
}

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ) ||
    (window.matchMedia('(max-width: 768px)').matches && 'ontouchstart' in window)
  );
}

export function useSmartCall() {
  const [copied, setCopied] = useState(false);
  const { contact } = siteConfig;

  const triggerCall = useCallback(
    (e?: React.MouseEvent) => {
      if (isMobileDevice()) {
        // Direct mobile dialer trigger
        window.location.href = contact.phoneHref;
      } else {
        // Desktop: copy phone number to clipboard
        e?.preventDefault();
        if (navigator.clipboard) {
          navigator.clipboard.writeText(contact.phoneDisplay).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
          });
        }
      }
    },
    [contact],
  );

  return {
    triggerCall,
    copied,
    phoneDisplay: contact.phoneDisplay,
    phoneHref: contact.phoneHref,
  };
}

export default function SmartCallButton({
  className = '',
  variant = 'accent',
  children,
  showIcon = true,
}: SmartCallProps) {
  const { triggerCall, copied, phoneDisplay } = useSmartCall();

  const variantStyles = {
    accent:
      'bg-brand-accent text-white hover:bg-brand-accent-hover shadow-md active:scale-[0.99]',
    primary:
      'bg-brand-primary text-white hover:bg-brand-primary-dark shadow-md active:scale-[0.99]',
    outline:
      'border-2 border-white bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-brand-primary',
    subtle: 'text-brand-primary hover:underline bg-brand-primary/10',
  }[variant];

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={triggerCall}
        className={`relative inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${variantStyles} ${className}`}
        aria-label={
          copied
            ? `Copied ${phoneDisplay} to clipboard`
            : `Call ${phoneDisplay} or copy phone number`
        }
      >
        {showIcon && (
          <span className="shrink-0" aria-hidden="true">
            {copied ? <Check className="h-4 w-4 text-white" /> : <Phone className="h-4 w-4" />}
          </span>
        )}
        <span>{copied ? 'Copied to Clipboard!' : children || `Call ${phoneDisplay}`}</span>
      </button>

      {/* Desktop Copied Toast Notification */}
      {copied && (
        <div
          role="status"
          aria-live="polite"
          className="absolute -top-11 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white shadow-xl animate-fade-in"
        >
          <span className="text-green-400">✓</span> Copied {phoneDisplay}
        </div>
      )}
    </div>
  );
}
