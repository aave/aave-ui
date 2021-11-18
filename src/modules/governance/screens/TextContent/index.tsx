import React from 'react';

import ProposalTextContent from '../../components/proposal/ProposalTextContent';
import { useProposalDataContext } from '../Proposal';

export default function TextContent() {
  const { parsedBody, proposal } = useProposalDataContext();

  return (
    <ProposalTextContent
      parsedBody={parsedBody}
      title={parsedBody?.attributes?.title || proposal?.title}
    />
  );
}
