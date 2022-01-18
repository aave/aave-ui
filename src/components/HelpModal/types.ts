import { HelpModalWrapperProps } from './HelpModalWrapper';

export interface HelpModalProps
  extends Pick<
    HelpModalWrapperProps,
    'text' | 'iconSize' | 'className' | 'color' | 'lightWeight' | 'onWhiteBackground'
  > {
  caption?: string;
  description?: string;
  withGrayIcon?: boolean;
  withSecondaryIcon?: boolean;
}
