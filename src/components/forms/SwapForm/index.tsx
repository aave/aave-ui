import React, { FormEvent, ReactNode } from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';

import Caption from '../../basic/Caption';
import DefaultButton from '../../basic/DefaultButton';
import InfoWrapper from '../../wrappers/InfoWrapper';
import InfoPanel from '../../InfoPanel';

import staticStyles from './style';

interface SwapFormProps {
  onSubmit: () => void;
  isSubmitButtonDisabled: boolean;
  caption: string;
  description: string | ReactNode;
  fromField: ReactNode;
  toField: ReactNode;
  error?: string;
  buttonTitle: string;
  helpText?: string | ReactNode;
}

export default function SwapForm({
  onSubmit,
  isSubmitButtonDisabled,
  caption,
  description,
  fromField,
  toField,
  error,
  buttonTitle,
  helpText,
}: SwapFormProps) {
  const { currentTheme } = useThemeContext();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="SwapForm">
      <Caption className="SwapForm__caption" title={caption} description={description} />

      <div className="SwapForm__inputs-wrapper">
        {fromField}
        {toField}
      </div>

      <div className="SwapForm__error-inner">{!!error && <p>{error}</p>}</div>

      <div className="SwapForm__button-inner">
        <DefaultButton
          title={buttonTitle}
          type="submit"
          disabled={isSubmitButtonDisabled}
          mobileBig={true}
        />
      </div>

      {!!helpText && (
        <InfoWrapper>
          <InfoPanel>{helpText}</InfoPanel>
        </InfoWrapper>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .SwapForm {
          &__error-inner {
            color: ${currentTheme.red.hex};
          }
        }
      `}</style>
    </form>
  );
}
