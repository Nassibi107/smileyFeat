"use client";
import { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  const animate = useCallback(() => {
    // Ring follows with smooth lag
    ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
    ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;

    const rSize = ring.current?.classList.contains("hovering") ? 52 : 36;
    if (ring.current) {
      ring.current.style.transform = `translate(${ringPos.current.x - rSize / 2}px, ${ringPos.current.y - rSize / 2}px)`;
    }
    if (dot.current) {
      dot.current.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
    }
    if (trail.current) {
      trail.current.style.transform = `translate(${ringPos.current.x - 9}px, ${ringPos.current.y - 9}px)`;
    }
    raf.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => ring.current?.classList.add("hovering");
    const onLeave = () => ring.current?.classList.remove("hovering");

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(animate);

    const attach = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea, select").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    attach();
    // Re-attach when DOM changes (new sections scroll in etc.)
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      observer.disconnect();
    };
  }, [animate]);

  return (
    <>
      <div ref={trail} className="custom-cursor-trail" />
      <div ref={ring} className="custom-cursor" />
      <div ref={dot} className="custom-cursor-dot" />
    </>
  );
}
