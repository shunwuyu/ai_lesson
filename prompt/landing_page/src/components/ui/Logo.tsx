type LogoProps = {
  className?: string;
};

export function Logo({ className = '' }: LogoProps) {
  return (
    <a href="#" className={`inline-flex items-center gap-2 ${className}`} aria-label="Foodiez home">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange font-display text-lg font-extrabold text-white">
        F
      </span>
      <span className="font-display text-xl font-bold text-gray-900">Foodiez</span>
    </a>
  );
}
