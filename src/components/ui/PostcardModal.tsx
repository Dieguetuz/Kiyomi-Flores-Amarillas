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
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [sharedSuccess, setSharedSuccess] = useState(false);

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

      // Vintage double borders
      ctx.strokeStyle = '#D4C1A3';
      ctx.lineWidth = 3;
      ctx.strokeRect(36, 36, width - 72, height - 72);

      ctx.strokeStyle = '#B39D7D';
      ctx.lineWidth = 1;
      ctx.strokeRect(44, 44, width - 88, height - 88);

      // Clean Header Left
      ctx.fillStyle = '#735B3B';
      ctx.font = 'italic 22px Georgia, serif';
      ctx.textAlign = 'left';
      ctx.fillText('POSTAL DE JARDÍN', 65, 105);

      // Center Bouquet Art
      if (bouquetImg && bouquetImg.complete && bouquetImg.naturalWidth > 0) {
        const bWidth = 340;
        const bHeight = 340;
        const bX = (width - bWidth) / 2;
        const bY = 175;

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(bX, bY, bWidth, bHeight, 28);
        ctx.clip();
        ctx.drawImage(bouquetImg, bX, bY, bWidth, bHeight);
        ctx.restore();

        // Border around bouquet
        ctx.strokeStyle = '#C9A24D';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(bX, bY, bWidth, bHeight, 28);
        ctx.stroke();
      } else {
        ctx.textAlign = 'center';
        ctx.font = '90px serif';
        ctx.fillText('💐', width / 2, 360);
      }

      // Sparkles surrounding bouquet
      ctx.fillStyle = '#EAB308';
      ctx.font = '28px serif';
      ctx.textAlign = 'center';
      ctx.fillText('✨', width / 2 - 200, 270);
      ctx.fillText('✨', width / 2 + 200, 270);
      ctx.fillText('✨', width / 2 - 170, 460);
      ctx.fillText('✨', width / 2 + 170, 460);

      // Title & Recipient Name
      ctx.fillStyle = '#30261A';
      ctx.font = 'bold 38px Georgia, serif';
      ctx.fillText('Tus flores amarillas 💛', width / 2, 575);

      ctx.fillStyle = '#854D0E';
      ctx.font = 'italic 46px Georgia, serif';
      ctx.fillText(recipientName, width / 2, 638);

      // Decorative divider
      ctx.strokeStyle = '#D97706';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 130, 680);
      ctx.lineTo(width / 2 + 130, 680);
      ctx.stroke();
      ctx.font = '18px serif';
      ctx.fillText('🌼', width / 2, 686);

      // Body Dedication Text
      ctx.fillStyle = '#4A3B2C';
      ctx.font = 'italic 26px Georgia, serif';
      ctx.fillText('“Estas no son de verdad,', width / 2, 755);
      ctx.fillText('pero sí son solamente tuyas.”', width / 2, 800);

      ctx.font = '22px Georgia, serif';
      ctx.fillStyle = '#6B5740';
      ctx.fillText('Con todo el cariño del mundo,', width / 2, 880);
      ctx.fillText('aquí están tus flores amarillas por bonita hoy.', width / 2, 920);

      // Signature & Date
      ctx.fillStyle = '#854D0E';
      ctx.font = 'bold 34px Georgia, serif';
      ctx.textAlign = 'right';
      ctx.fillText(senderName, width - 85, 1010);

      ctx.font = 'italic 18px Georgia, serif';
      ctx.fillStyle = '#8C7353';
      ctx.fillText(dateText, width - 85, 1042);

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

  const getCanvasBlob = async (): Promise<Blob | null> => {
    if (!canvasRef.current) return null;
    return new Promise((resolve) => {
      canvasRef.current?.toBlob((b) => resolve(b), 'image/png');
    });
  };

  const handleDownload = async () => {
    sounds.vibrate(20);
    sounds.playSecretFound();

    const fileName = `flores-amarillas-${recipientName.toLowerCase()}.png`;
    const blob = await getCanvasBlob();

    // 1. Mobile First: Web Share API (native sheet with "Guardar imagen / Guardar en Fotos" on iOS & Android)
    if (blob && typeof navigator !== 'undefined' && navigator.share && navigator.canShare) {
      try {
        const file = new File([blob], fileName, { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `Flores amarillas para ${recipientName}`,
            text: 'Un pequeño jardín amarillo que florece para ti 💛',
            files: [file],
          });
          setDownloadSuccess(true);
          setTimeout(() => setDownloadSuccess(false), 2500);
          return;
        }
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
      }
    }

    // 2. Fallback: Direct Blob URL download
    if (blob) {
      try {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
          URL.revokeObjectURL(blobUrl);
        }, 5000);

        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 2500);
        return;
      } catch {}
    }

    // 3. Fallback: Base64 dataUrl download or window open
    if (dataUrl) {
      try {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 2500);
      } catch {
        window.open(dataUrl, '_blank');
      }
    }
  };

  const handleShare = async () => {
    sounds.vibrate(20);
    const fileName = `flores-amarillas-${recipientName.toLowerCase()}.png`;
    const blob = await getCanvasBlob();

    if (blob && typeof navigator !== 'undefined' && navigator.share && navigator.canShare) {
      try {
        const file = new File([blob], fileName, { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `Flores amarillas para ${recipientName}`,
            text: 'Un pequeño jardín amarillo que florece para ti 💛',
            files: [file],
          });
          setSharedSuccess(true);
          setTimeout(() => setSharedSuccess(false), 2000);
          return;
        }
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
      }
    }

    // Fallback: download if share is not available
    handleDownload();
    setSharedSuccess(true);
    setTimeout(() => setSharedSuccess(false), 2000);
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

        <div className="flex items-center gap-1.5 text-amber-700 mb-1 pt-1">
          <Sparkles size={16} />
          <span className="font-serif text-xs font-semibold uppercase tracking-wider">
            Tu Postal de Recuerdos
          </span>
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {/* Postcard preview image with native long-press touch-to-save enabled */}
        {dataUrl && (
          <div className="relative my-2 w-full overflow-hidden rounded-2xl border-2 border-[#D9C4A1] shadow-md bg-[#FAF3E3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dataUrl}
              alt={`Postal para ${recipientName}`}
              className="h-auto w-full object-contain allow-touch-save cursor-pointer select-auto"
              style={{
                WebkitTouchCallout: 'default',
                userSelect: 'auto',
              }}
            />
          </div>
        )}

        <p className="font-handwriting text-sm text-amber-900/80 text-center my-0.5 font-medium">
          Guarda esta postal en tu galería 💛
        </p>

        <p className="font-handwriting text-[11px] text-amber-800/60 text-center mb-2">
          (En celular también puedes mantener presionada la imagen para guardarla 📱✨)
        </p>

        <div className="mt-1 flex w-full gap-2 sm:gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-800 py-3 px-3 font-serif text-xs font-medium text-amber-50 shadow hover:bg-amber-900 transition-colors active:scale-95"
          >
            {downloadSuccess ? <Check size={14} className="text-emerald-300" /> : <Download size={14} />}
            <span>{downloadSuccess ? '¡Guardada!' : 'Descargar'}</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-100 py-3 px-4 font-serif text-xs font-medium text-amber-900 hover:bg-amber-200 transition-colors active:scale-95"
          >
            {sharedSuccess ? <Check size={14} className="text-emerald-700" /> : <Share2 size={14} />}
            <span>{sharedSuccess ? '¡Listo!' : 'Compartir'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};