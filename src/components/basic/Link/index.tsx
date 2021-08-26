import React, { ReactNode } from 'react';
import { FormattedMessage, MessageDescriptor } from 'react-intl';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

interface LinkProps {
  title?: string;
  to: string;
  absolute?: boolean;
  inNewWindow?: boolean;
  color?: 'primary' | 'secondary' | 'white' | 'dark';
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  titleWithIntl?: MessageDescriptor;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  bold?: boolean;
  onWhiteBackground?: boolean;
}

export default function Link({
  title,
  to,
  absolute,
  inNewWindow,
  color = 'primary',
  className,
  children,
  disabled,
  onClick,
  titleWithIntl,
  onMouseEnter,
  onMouseLeave,
  bold,
  onWhiteBackground,
  ...props
}: LinkProps) {
  const { currentTheme } = useThemeContext();

  const handleClick = (e: any) => {
    e.stopPropagation();

    if (!!onClick && !disabled) {
      onClick();
    }
    if (disabled) {
      e.preventDefault();
    }
  };

  return (
    <>
      {!absolute ? (
        <NavLink
          onClick={(e: any) => handleClick(e)}
          className={classNames('Link', `Link__${color}`, className, {
            Link__disabled: disabled,
            Link__bold: bold,
          })}
          to={to}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          {...props}
        >
          {children}
          {title && <span>{title}</span>}
          {titleWithIntl && (
            <span>
              <FormattedMessage {...titleWithIntl} />
            </span>
          )}
        </NavLink>
      ) : (
        // eslint-disable-next-line react/jsx-no-target-blank
        <a
          onClick={(e: any) => handleClick(e)}
          className={classNames('Link', `Link__${color}`, className, {
            Link__disabled: disabled,
            Link__bold: bold,
          })}
          href={to}
          rel={!(window as any).imToken && inNewWindow ? 'noopener noreferrer' : undefined}
          target={!(window as any).imToken && inNewWindow ? '_blank' : undefined}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          {...props}
        >
          {children}
          {title && <span>{title}</span>}
          {titleWithIntl && (
            <span>
              <FormattedMessage {...titleWithIntl} />
            </span>
          )}
        </a>
      )}

      <style jsx={true} global={true}>{`
        .Link__bold {
          font-weight: 600;
        }

        .Link__primary {
          color: ${currentTheme.primary.hex};
        }
        .Link__secondary {
          color: ${currentTheme.secondary.hex};
        }
        .Link__dark {
          color: ${onWhiteBackground ? currentTheme.darkBlue.hex : currentTheme.textDarkBlue.hex};
        }
        .Link__white {
          color: ${currentTheme.white.hex};
        }
        .Link__disabled {
          cursor: default;
          opacity: 0.5 !important;
          transform: scale(1) !important;
          &.ButtonLink {
            opacity: 1 !important;
          }
        }
      `}</style>
    </>
  );
}
