import TargetCursor from '@/components/TargetCursor';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function CustomCursor() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <TargetCursor
      targetSelector="a, button, .cursor-target"
      spinDuration={2}
      hideDefaultCursor={true}
    />
  );
}
