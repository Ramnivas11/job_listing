import { Warning, ArrowClockwise } from '@phosphor-icons/react';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-start justify-center p-8 md:p-12 border-[4px] border-[#CC0000] bg-white my-12 sharp-corners w-full" id="error-state" role="alert">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 text-[#CC0000] border-b-2 border-[#CC0000] pb-6 w-full">
        <div className="bg-[#CC0000] text-white p-3 border-2 border-black flex-shrink-0">
          <Warning size={32} weight="bold" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-black uppercase tracking-tighter text-black">
          Transmission Failure
        </h2>
      </div>
      <p className="font-mono text-sm sm:text-base text-neutral-800 leading-[1.8] max-w-[60ch] mb-10 font-bold tracking-widest uppercase">
        {message || 'Our presses could not reach the server. Verify your connection parameters and attempt to pull the data again.'}
      </p>
      <button
        className="inline-flex items-center gap-3 px-8 py-4 
                   bg-[#CC0000] text-[#F9F9F7] border-[3px] border-[#CC0000]
                   font-mono text-sm font-bold uppercase tracking-widest
                   transition-colors duration-200 hover:bg-black hover:border-black hover:text-[#F9F9F7] sharp-corners"
        onClick={onRetry}
        id="retry-button"
      >
        <ArrowClockwise size={20} weight="bold" />
        Reprint Request
      </button>
    </div>
  );
}
