import React from 'react';

import ProposalTextContent from '../../components/proposal/ProposalTextContent';
import { useProposalDataContext } from '../Proposal';

export default function TextContent() {
  const { parsedBody } = useProposalDataContext();

  return <ProposalTextContent parsedBody={parsedBody} />;
}
