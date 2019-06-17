export interface AttachedPosition {
  menuX: 'left' | 'center' | 'right';
  menuY: 'top' | 'center' | 'bottom';
  attachedX: 'left' | 'center' | 'right';
  attachedY: 'top' | 'center' | 'bottom';
  offsetX: number;
  offsetY: number;
  className?: string;
}

export type AttachedPositionStrategy = AttachedPosition[];
