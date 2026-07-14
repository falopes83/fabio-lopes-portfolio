type LogoProps = {
  light?: boolean;
};

export function Logo({ light = false }: LogoProps) {
  return (
    <a href="/" className="inline-flex items-center" aria-label="Fabio Lopes">
      {light ? (
        <img src="/assets/logo-alt.svg" alt="Fabio Lopes" className="h-11 w-auto" />
      ) : (
        <>
          <img src="/assets/logo.svg" alt="Fabio Lopes" className="h-11 w-auto dark:hidden" />
          <img src="/assets/logo-alt.svg" alt="Fabio Lopes" className="hidden h-11 w-auto dark:block" />
        </>
      )}
    </a>
  );
}
