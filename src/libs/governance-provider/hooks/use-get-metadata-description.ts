import { useState, useEffect } from 'react';
import fm from 'front-matter';
import { IpfsMeta, IpfsPropsal } from '../types';
import { getProposalMetadata } from '@aave/contract-helpers';
import { IPFS_ENDPOINT } from '../helper';

const useGetMetadataDescription = (idHash: string, skip: boolean) => {
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState<IpfsPropsal>();

  const getMeta = async (idHash: string) => {
    setLoading(true);
    try {
      const rawBody = await getProposalMetadata(idHash, IPFS_ENDPOINT);
      // Fix Bug with the @
      const parsedDesc = !!rawBody.description
        ? rawBody.description.replace(/@/gi, '')
        : 'no description, or description loading failed';
      const processed = fm<IpfsMeta>(parsedDesc);
      if (!rawBody.aip || !rawBody.author || !rawBody.discussions) {
        setBody({
          attributes: processed.attributes,
          body: processed.body,
          error: undefined,
        });
      } else {
        setBody({
          attributes: {
            ...processed.attributes,
            ...rawBody,
          },
          body: processed.body,
          error: undefined,
        });
      }
    } catch (error) {
      console.error('Error get metadata ', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    !skip && getMeta(idHash);
  }, [idHash, skip]);

  return { body, loading };
};

export default useGetMetadataDescription;
