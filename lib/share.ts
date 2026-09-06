export function buildMemeText(m: {
  situacao: string;
  desculpa: string;
  respostaIA: string;
  status: { emoji: string; label: string };
}) {
  return (
    `SITUAÇÃO: ${m.situacao}\n` +
    `DESCULPA: "${m.desculpa}"\n` +
    `IA: "${m.respostaIA}"\n` +
    `STATUS: ${m.status.emoji} ${m.status.label}\n\n` +
    `gerado no BugMeme`
  );
}

export function shareWhatsApp(text: string) {
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function shareX(text: string) {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function shareLinkedIn(text: string) {
  // LinkedIn share works best with a URL; text-only is limited
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    typeof window !== "undefined" ? window.location.origin : "https://bugmeme.vercel.app"
  )}&summary=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export async function shareNative(title: string, text: string) {
  if (typeof navigator !== "undefined" && navigator.share) {
    await navigator.share({ title, text });
    return true;
  }
  return false;
}
