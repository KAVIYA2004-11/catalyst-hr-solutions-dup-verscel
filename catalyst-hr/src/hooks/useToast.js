import { useState, useCallback } from "react";

/* ─── useToast ──────────────────────────────────────────────── */
export function useToast() {
  const [items, setItems] = useState([]);

  const add = useCallback((msg, type = "success") => {
    const id = Date.now();
    setItems(x => [...x, { id, msg, type }]);
    setTimeout(() => setItems(x => x.filter(i => i.id !== id)), 3800);
  }, []);

  const rm = useCallback(
    id => setItems(x => x.filter(i => i.id !== id)),
    []
  );

  return { items, add, rm };
}
