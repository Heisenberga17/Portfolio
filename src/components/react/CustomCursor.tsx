import TargetCursor from '@/components/TargetCursor';

// Add the class "cursor-target" to any element you want the cursor to target
// beyond links and buttons (which are targeted by default).

export default function CustomCursor() {
  return (
    <TargetCursor
      targetSelector="a, button, .cursor-target"
      spinDuration={2}
      hideDefaultCursor={true}
    />
  );
}
