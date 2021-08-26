import React, { ReactNode } from 'react';
import classNames from 'classnames';

import Caption from '../basic/Caption';

import staticStyles from './style';

type HelpItemProps = {
  caption: string;
  description?: string | ReactNode;
  icon?: string;
  children?: ReactNode;
  className?: string;
  captionColor?: 'primary' | 'secondary' | 'dark';
  onWhiteBackground?: boolean;
};

export default function HelpItem({
  caption,
  description,
  icon,
  children,
  className,
  captionColor,
  onWhiteBackground = true,
}: HelpItemProps) {
  return (
    <div className={classNames('HelpItem', className)}>
      {icon && icon}
      <Caption
        title={caption}
        description={description}
        color={captionColor}
        onWhiteBackground={onWhiteBackground}
      />
      {children}

      <style jsx={true}>{staticStyles}</style>
    </div>
  );
}
