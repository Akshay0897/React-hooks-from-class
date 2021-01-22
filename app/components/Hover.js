import React from 'react';

export function useHover() {
  const [hovering, sethovering] = React.useState(false);
  const onMouseOver = () => sethovering(true);
  const onMouseOut = () => sethovering(false);
  return [hovering, { onMouseOut, onMouseOver }];
}
