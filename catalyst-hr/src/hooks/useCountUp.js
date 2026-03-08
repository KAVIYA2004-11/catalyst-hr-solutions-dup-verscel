import { useState, useEffect, useRef } from "react";

/* ─── useCountUp ────────────────────────────────────────────── */
export function useCountUp(to, dur = 1600) {
  const [v, setV]   = useState(0);
  const raf         = useRef(null);

  useEffect(() => {
    const start = Date.now();
    const tick  = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      setV(Math.floor(p * to));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [to, dur]);

  return v;
}
