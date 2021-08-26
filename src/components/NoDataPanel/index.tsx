import React, { ReactNodeArray, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import Link from '../basic/Link';
import DefaultButton from '../basic/DefaultButton';
import Caption from '../basic/Caption';
import ConnectButton from '../ConnectButton';

import messages from './messages';
import staticStyles from './style';

export interface NoDataPanelProps {
  title: string;
  description?: string | ReactNodeArray;
  buttonTitle?: string;
  linkTo?: string;
  className?: string;
  withBigBackButton?: boolean;
  withConnectButton?: boolean;
  buttonMediumSize?: boolean;
  withAnimationCircle?: boolean;
  children?: ReactNode;
}

export default function NoDataPanel({
  title,
  description,
  buttonTitle,
  linkTo,
  className,
  withBigBackButton,
  withConnectButton,
  buttonMediumSize,
  withAnimationCircle,
  children,
}: NoDataPanelProps) {
  const history = useHistory();
  const intl = useIntl();

  return (
    <div className={classNames('NoDataPanel', className)}>
      <Caption title={title} description={description} withAnimationCircle={withAnimationCircle} />

      {linkTo && buttonTitle && (
        <Link to={linkTo} className="ButtonLink">
          <DefaultButton title={buttonTitle} mobileBig={!buttonMediumSize} />
        </Link>
      )}

      {withConnectButton && (
        <div className="NoDataPanel__button-inner">
          <ConnectButton />
        </div>
      )}

      {withBigBackButton && (
        <div className="NoDataPanel__button-inner">
          <DefaultButton
            title={intl.formatMessage(messages.goBack)}
            mobileBig={true}
            onClick={history.goBack}
          />
        </div>
      )}

      {children}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
