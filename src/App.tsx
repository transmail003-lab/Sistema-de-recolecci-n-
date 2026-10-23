/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

export default function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Forward keyboard shortcuts to iframe if parent has focus
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key.toLowerCase() === 'i')) {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.dispatchEvent(
            new KeyboardEvent('keydown', {
              key: e.key,
              altKey: true,
              bubbles: true,
            })
          );
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-screen h-screen m-0 p-0 overflow-hidden bg-[#080a0d]">
      <iframe
        ref={iframeRef}
        src="/Sistema.html"
        title="Sistema de Gestión Logística & Control Táctico - Bodega Central Amarateca"
        className="w-full h-full border-none block m-0 p-0"
        allow="camera *; microphone *; clipboard-write; autoplay *; display-capture *"
      />
    </div>
  );
}
