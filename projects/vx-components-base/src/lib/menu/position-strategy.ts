export interface AttachedPosition {
  menuX: 'left' | 'center' | 'right';
  menuY: 'top' | 'center' | 'bottom';
  attachedX: 'left' | 'center' | 'right';
  attachedY: 'top' | 'center' | 'bottom';
  width: number | 'match' | 'auto';
  height: number;
  offsetX: number;
  offsetY: number;
  className?: string;
}

export type AttachedPositionStrategy = AttachedPosition[];
