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

    const renderCanvas = (bouquetImg?: HTMLImageElement) => {
      // Kraft paper gradient background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#FAF3E3');
      bgGrad.addColorStop(0.5, '#F5E8D0');
      bgGrad.addColorStop(1, '#EEDBC0');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Vintage borders
      ctx.strokeStyle = '#D4C1A3';
      ctx.lineWidth = 3;
      ctx.strokeRect(36, 36, width - 72, height - 72);

      ctx.strokeStyle = '#B39D7D';
      ctx.lineWidth = 1;
      ctx.strokeRect(44, 44, width - 88, height - 88);

      // Postage Stamp top right
      ctx.fillStyle = '#E8DAC2';
      ctx.fillRect(width - 170, 60, 110, 130);
      ctx.strokeStyle = '#A89274';
      ctx.lineWidth = 2;
      ctx.strokeRect(width - 170, 60, 110, 130);

      ctx.font = '36px serif';
      ctx.textAlign = 'center';
      ctx.fillText('🌻', width - 115, 122);
      ctx.font = '11px Georgia, serif';
      ctx.fillStyle = '#7A6447';
      ctx.fillText('FLORES AMARILLAS', width - 115, 155);
      ctx.fillText('EDICIÓN ESPECIAL', width - 115, 172);

      // Header Left
      ctx.fillStyle = '#735B3B';
      ctx.font = 'italic 20px Georgia, serif';
      ctx.textAlign = 'left';
      ctx.fillText('POSTAL DE JARDÍN', 65, 95);
      ctx.font = '15px Georgia, serif';
      ctx.fillStyle = '#8C7353';
      ctx.fillText(`Edición Única · ${dateText}`, 65, 125);

      // Center Bouquet
      if (bouquetImg && bouquetImg.complete && bouquetImg.naturalWidth > 0) {
        // Draw real illustrated bouquet with rounded corners
        const bWidth = 320;
        const bHeight = 320;
        const bX = (width - bWidth) / 2;
        const bY = 210;

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(bX, bY, bWidth, bHeight, 24);
        ctx.clip();
        ctx.drawImage(bouquetImg, bX, bY, bWidth, bHeight);
        ctx.restore();

        // Border around bouquet art
        ctx.strokeStyle = '#C9A24D';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(bX, bY, bWidth, bHeight, 24);
        ctx.stroke();
      } else {
        ctx.textAlign = 'center';
        ctx.font = '90px serif';
        ctx.fillText('💐', width / 2, 380);
      }

      // Sparkles
      ctx.fillStyle = '#EAB308';
      ctx.font = '28px serif';
      ctx.textAlign = 'center';
      ctx.fillText('✨', width / 2 - 190, 310);
      ctx.fillText('✨', width / 2 + 190, 310);
      ctx.fillText('✨', width / 2 - 160, 480);
      ctx.fillText('✨', width / 2 + 160, 480);

      // Title & Recipient Name
      ctx.fillStyle = '#30261A';
      ctx.font = 'bold 36px Georgia, serif';
      ctx.fillText('Tus flores amarillas 💛', width / 2, 590);

      ctx.fillStyle = '#854D0E';
      ctx.font = 'italic 44px Georgia, serif';
      ctx.fillText(recipientName, width / 2, 650);

      // Decorative divider
      ctx.strokeStyle = '#D97706';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 130, 690);
      ctx.lineTo(width / 2 + 130, 690);
      ctx.stroke();
      ctx.font = '18px serif';
      ctx.fillText('🌼', width / 2, 696);

      // Body text
      ctx.fillStyle = '#4A3B2C';
      ctx.font = 'italic 25px Georgia, serif';
      ctx.fillText('“Estas no son de verdad,', width / 2, 760);
      ctx.fillText('pero sí son solamente tuyas.”', width / 2, 805);

      ctx.font = '22px Georgia, serif';
      ctx.fillStyle = '#6B5740';
      ctx.fillText('Con todo el cariño del mundo,', width / 2, 885);
      ctx.fillText('aquí están tus flores amarillas por bonita hoy.', width / 2, 925);

      // Signature & Date
      ctx.fillStyle = '#854D0E';
      ctx.font = 'bold 32px Georgia, serif';
      ctx.textAlign = 'right';
      ctx.fillText(senderName, width - 85, 1015);

      ctx.font = 'italic 17px Georgia, serif';
      ctx.fillStyle = '#8C7353';
      ctx.fillText(dateText, width - 85, 1045);

      try {
        setDataUrl(canvas.toDataURL('image/png'));
      } catch {}
    };

    const img = new (window as any).Image();
    img.crossOrigin = 'anonymous';
    img.src = '/images/yellow_bouquet.jpg';
    img.onload = () => renderCanvas(img);
    img.onerror = () => renderCanvas();
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
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-dark/60 p-3 sm:p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92dvh] w-full max-w-sm sm:max-w-md flex-col items-center rounded-3xl bg-[#FAF5EB] p-4 sm:p-5 shadow-2xl border border-amber-900/20 overflow-y-auto"
      >
        <button
          onClick={onClose}
          aria-label="Cerrar postal"
          className="absolute top-3.5 right-3.5 rounded-full p-2 text-amber-900/60 hover:bg-amber-100 hover:text-amber-900 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-1.5 text-amber-700 mb-1.5 pt-1">
          <Sparkles size={16} />
          <span className="font-serif text-xs font-semibold uppercase tracking-wider">
            Tu Postal de Recuerdos
          </span>
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {dataUrl && (
          <div className="relative my-2 w-full overflow-hidden rounded-2xl border-2 border-[#D9C4A1] shadow-md bg-[#FAF3E3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dataUrl}
              alt={`Postal para ${recipientName}`}
              className="h-auto w-full object-contain"
            />
          </div>
        )}

        <p className="font-handwriting text-xs sm:text-sm text-amber-900/70 text-center my-0.5">
          Guarda esta postal en tu galería o compártela cuando quieras 💛
        </p>

        <div className="mt-2.5 flex w-full gap-2 sm:gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-800 py-3 px-3 font-serif text-xs font-medium text-amber-50 shadow hover:bg-amber-900 transition-colors active:scale-95"
          >
            <Download size={14} />
            <span>Descargar</span>
          </button>

          <button
            onClick={handleCopyOrShare}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-100 py-3 px-4 font-serif text-xs font-medium text-amber-900 hover:bg-amber-200 transition-colors active:scale-95"
          >
            {copied ? <Check size={14} className="text-emerald-700" /> : <Share2 size={14} />}
            <span>{copied ? '¡Listo!' : 'Compartir'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};