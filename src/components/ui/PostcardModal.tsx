'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Share2, Sparkles, Check } from 'lucide-react';
import { sounds } from '@/utils/sound';

interface PostcardModalProps {
  recipientName: string;
  senderName: string;
  dateText: string;
  dedicationText: string;
  onClose: () => void;
}

export const PostcardModal: React.FC<PostcardModalProps> = ({
  recipientName,
  senderName,
  dateText,
  dedicationText,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 800;
    const height = 1120;
    canvas.width = width;
    canvas.height = height;

    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#FAF3E3');
    bgGrad.addColorStop(0.5, '#F5E8D0');
    bgGrad.addColorStop(1, '#EEDBC0');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#D4C1A3';
    ctx.lineWidth = 3;
    ctx.strokeRect(36, 36, width - 72, height - 72);

    ctx.strokeStyle = '#B39D7D';
    ctx.lineWidth = 1;
    ctx.strokeRect(44, 44, width - 88, height - 88);

    ctx.fillStyle = '#E8DAC2';
    ctx.fillRect(width - 170, 60, 110, 130);
    ctx.strokeStyle = '#A89274';
    ctx.lineWidth = 2;
    ctx.strokeRect(width - 170, 60, 110, 130);

    ctx.font = '40px serif';
    ctx.textAlign = 'center';
    ctx.fillText('🌻', width - 115, 128);
    ctx.font = '12px Georgia, serif';
    ctx.fillStyle = '#7A6447';
    ctx.fillText('FLORES AMARILLAS', width - 115, 164);
    ctx.fillText('SPECIAL POST', width - 115, 180);

    ctx.fillStyle = '#735B3B';
    ctx.font = 'italic 20px Georgia, serif';
    ctx.textAlign = 'left';
    ctx.fillText('POSTAL DE JARDÍN', 65, 95);

    ctx.font = '16px Georgia, serif';
    ctx.fillStyle = '#8C7353';
    ctx.fillText(`Edición Única · ${dateText}`, 65, 125);

    ctx.textAlign = 'center';
    ctx.font = '90px serif';
    ctx.fillText('💐', width / 2, 340);

    const stars = [
      { x: width / 2 - 120, y: 280, r: 16 },
      { x: width / 2 + 130, y: 300, r: 14 },
      { x: width / 2 - 80, y: 410, r: 12 },
      { x: width / 2 + 90, y: 390, r: 15 },
    ];
    ctx.fillStyle = '#EAB308';
    stars.forEach((s) => {
      ctx.font = `${s.r * 2}px serif`;
      ctx.fillText('✨', s.x, s.y);
    });

    ctx.fillStyle = '#30261A';
    ctx.font = 'bold 36px Georgia, serif';
    ctx.fillText('Tus flores amarillas 💛', width / 2, 510);

    ctx.fillStyle = '#854D0E';
    ctx.font = 'italic 46px Georgia, serif';
    ctx.fillText(recipientName, width / 2, 580);

    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 140, 625);
    ctx.lineTo(width / 2 + 140, 625);
    ctx.stroke();

    ctx.font = '18px serif';
    ctx.fillText('🌼', width / 2, 631);

    ctx.fillStyle = '#4A3B2C';
    ctx.font = 'italic 26px Georgia, serif';
    ctx.fillText('“Estas no son de verdad,', width / 2, 700);
    ctx.fillText('pero sí son solamente tuyas.”', width / 2, 745);

    ctx.font = '22px Georgia, serif';
    ctx.fillStyle = '#6B5740';
    ctx.fillText('Con todo el cariño del mundo,', width / 2, 830);
    ctx.fillText('aquí están tus flores amarillas por bonita hoy.', width / 2, 870);

    ctx.fillStyle = '#854D0E';
    ctx.font = 'bold 32px Georgia, serif';
    ctx.textAlign = 'right';
    ctx.fillText(senderName, width - 90, 970);

    ctx.font = 'italic 18px Georgia, serif';
    ctx.fillStyle = '#8C7353';
    ctx.fillText(dateText, width - 90, 1005);

    try {
      setDataUrl(canvas.toDataURL('image/png'));
    } catch {}
  }, [recipientName, senderName, dateText, dedicationText]);

  const handleDownload = () => {
    sounds.vibrate(20);
    sounds.playSecretFound();
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `flores-amarillas-${recipientName.toLowerCase()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyOrShare = async () => {
    sounds.vibrate(20);
    if (navigator.share && dataUrl) {
      try {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], `flores-amarillas-${recipientName.toLowerCase()}.png`, {
          type: 'image/png',
        });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `Flores amarillas para ${recipientName}`,
            text: 'Un pequeño jardín amarillo que florece para ti.',
            files: [file],
          });
          return;
        }
      } catch {}
    }
    handleDownload();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-dark/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-md flex-col items-center rounded-3xl bg-[#FAF5EB] p-5 shadow-2xl border border-amber-900/20 overflow-y-auto"
      >
        <button
          onClick={onClose}
          aria-label="Cerrar postal"
          className="absolute top-4 right-4 rounded-full p-2 text-amber-900/60 hover:bg-amber-100 hover:text-amber-900 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-1.5 text-amber-600 mb-2">
          <Sparkles size={18} />
          <span className="font-serif text-xs font-semibold uppercase tracking-wider">
            Tu Postal de Recuerdos
          </span>
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {dataUrl && (
          <div className="relative my-2 w-full overflow-hidden rounded-2xl border-2 border-[#D9C4A1] shadow-paper bg-[#FAF3E3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dataUrl}
              alt={`Postal para ${recipientName}`}
              className="h-auto w-full object-contain"
            />
          </div>
        )}

        <p className="font-handwriting text-sm text-amber-900/70 text-center my-1">
          Guarda esta postal en tu galería o compártela cuando quieras 💛
        </p>

        <div className="mt-3 flex w-full gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-800 py-3 px-4 font-serif text-xs font-medium text-amber-50 shadow-md hover:bg-amber-900 transition-colors active:scale-95"
          >
            <Download size={15} />
            <span>Descargar postal</span>
          </button>

          <button
            onClick={handleCopyOrShare}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-100 py-3 px-4 font-serif text-xs font-medium text-amber-900 hover:bg-amber-200 transition-colors active:scale-95"
          >
            {copied ? <Check size={15} className="text-emerald-700" /> : <Share2 size={15} />}
            <span>{copied ? '¡Guardada!' : 'Compartir'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};