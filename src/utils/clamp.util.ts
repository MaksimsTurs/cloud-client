export default function clamp(current: number, min: number, max: number): number {
  return(current < min ? min : current > max ? max : current);
};
