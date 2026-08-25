import React from 'react';

export const ASSET_IMAGES = {
  heroPlantation: '/assets/plantation-hero.svg',
  harvestPalm: '/assets/harvest-palm.svg',
  fertilizer: '/assets/fertilizer.svg',
  fuel: '/assets/fuel.svg',
  tools: '/assets/tools.svg',
  avatar: '/assets/avatar.svg',
  palmBlock: '/assets/palm-block.svg',
};

// Fallback lookup based on category/keyword
export function getAssetFallback(type: string): string {
  const lower = (type || '').toLowerCase();
  if (lower.includes('avatar') || lower.includes('profile') || lower.includes('jack')) {
    return ASSET_IMAGES.avatar;
  }
  if (lower.includes('panen') || lower.includes('harvest') || lower.includes('tbs') || lower.includes('janjang')) {
    return ASSET_IMAGES.harvestPalm;
  }
  if (lower.includes('pupuk') || lower.includes('npk') || lower.includes('urea') || lower.includes('kcl') || lower.includes('dosis') || lower.includes('pemupukan')) {
    return ASSET_IMAGES.fertilizer;
  }
  if (lower.includes('solar') || lower.includes('bbm') || lower.includes('fuel') || lower.includes('minyak')) {
    return ASSET_IMAGES.fuel;
  }
  if (lower.includes('tool') || lower.includes('chemical') || lower.includes('herbisida') || lower.includes('perawatan')) {
    return ASSET_IMAGES.tools;
  }
  if (lower.includes('blok') || lower.includes('kebun') || lower.includes('peta')) {
    return ASSET_IMAGES.palmBlock;
  }
  return ASSET_IMAGES.heroPlantation;
}

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: string;
}

export function SmartImage({ src, alt, fallbackType = 'hero', className, ...props }: ImageProps) {
  const defaultFallback = getAssetFallback(fallbackType);
  const [imgSrc, setImgSrc] = React.useState<string>(src || defaultFallback);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    setImgSrc(src || defaultFallback);
    setHasError(false);
  }, [src, defaultFallback]);

  return (
    <img
      src={hasError ? defaultFallback : imgSrc}
      alt={alt || 'Palm App'}
      className={className}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(defaultFallback);
        }
      }}
      {...props}
    />
  );
}
