import React from 'react';

interface HFContentProps {
  healthFactor: string;
}

export default function HFContent({ healthFactor }: HFContentProps) {
  return (
    <div className="HFContent">
      <h1>HF Content</h1>
    </div>
  );
}
