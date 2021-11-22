import React from 'react';
import Markdown from 'react-markdown';
import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';
import { IpfsPropsal } from '../../../../../libs/governance-provider/types';

export default function ProposalTextContent({
  parsedBody,
  title,
}: {
  parsedBody: IpfsPropsal | undefined;
  title?: string;
}) {
  const { currentTheme } = useThemeContext();
  let markdownSource = '### No description given';
  if (parsedBody) {
    if (parsedBody.error) {
      markdownSource = `IPFS Error: ${parsedBody.error}`;
    } else if (parsedBody.body) {
      markdownSource = parsedBody.body.replace(
        /]\(\.\.\/assets\/AIP-/g,
        '](https://github.com/aave/aip/raw/master/content/assets/AIP-'
      );
    }
  }

  return (
    <div className="ProposalTextContent">
      <h2 className="ProposalTextContent__description-title">{title}</h2>
      <Markdown
        source={markdownSource}
        renderers={{
          html: (props) => {
            return <div dangerouslySetInnerHTML={{ __html: props.value }} />;
          },
          paragraph: (props) => <p {...props} className="ProposalTextContent__markdownParagraph" />,
          emphasis: (props) => <em {...props} className="ProposalTextContent__markdownEmphasis" />,
          strong: (props) => <strong {...props} className="ProposalTextContent__markdownBold" />,
          blockquote: (props) => (
            <blockquote {...props} className="ProposalTextContent__markdownBlock" />
          ),
          link: (props) => (
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <a {...props} className="ProposalTextContent__markdownLink" />
          ),
          list: (props) => {
            const modifiedProps = { ...props };
            delete modifiedProps['ordered'];
            delete modifiedProps['tight'];
            delete modifiedProps['inline'];
            return <ul {...modifiedProps} className="ProposalTextContent__markdownList" />;
          },
          listItem: (props) => {
            const modifiedProps = { ...props };
            delete modifiedProps['ordered'];
            delete modifiedProps['tight'];
            delete modifiedProps['inline'];
            return <li {...modifiedProps} className="ProposalTextContent__markdownListItem" />;
          },
          heading: (props) => (
            // eslint-disable-next-line jsx-a11y/heading-has-content
            <h3 {...props} className="ProposalTextContent__markdownHeading" />
          ),
          inlineCode: (props) => {
            const modifiedProps = { ...props };
            delete modifiedProps['inline'];
            return <code {...modifiedProps} className="ProposalTextContent__markdownCode" />;
          },
          code: (props) => (
            <pre>
              <code {...props} className="ProposalTextContent__markdownCode" />
            </pre>
          ),
          image: (props) => {
            return <img {...props} alt="" />;
          },
          imageReference: (props) => {
            return <img {...props} alt="" />;
          },
        }}
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';

        .ProposalTextContent {
          color: ${currentTheme.textDarkBlue.hex};
          @include respond-to(sm) {
            color: ${currentTheme.white.hex};
            background: ${currentTheme.darkBlue.hex};
          }

          p,
          em,
          strong,
          blockquote,
          ul,
          li,
          h3,
          pre {
            color: ${currentTheme.textDarkBlue.hex};
            @include respond-to(sm) {
              color: ${currentTheme.white.hex};
            }
          }
          a {
            color: ${currentTheme.primary.hex};
          }
          li {
            &:after {
              background: ${currentTheme.textDarkBlue.hex};
              @include respond-to(sm) {
                background: ${currentTheme.white.hex};
              }
            }
          }

          &__description-title {
            &:after {
              background: ${currentTheme.textDarkBlue.hex};
              @include respond-to(sm) {
                background: ${currentTheme.white.hex};
              }
            }
          }
        }
      `}</style>
    </div>
  );
}
