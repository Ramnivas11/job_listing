import { NewspaperClipping } from '@phosphor-icons/react';

export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center p-16 md:p-24 border-[4px] border-black bg-white my-12" id="empty-state">
      <div className="mb-8 bg-black text-[#F9F9F7] p-5">
        <NewspaperClipping size={48} weight="light" />
      </div>
      <h2 className="font-serif text-3xl sm:text-4xl font-black text-black uppercase tracking-tighter mb-4 text-center">
        Edition Unavailable
      </h2>
      <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#111111] max-w-[44ch] text-center leading-[1.8] font-bold border-t border-black pt-4">
        {message || 'The specific criteria entered yielded no published records. Please broaden your inquiry and try again.'}
      </p>
    </div>
  );
}
