import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { rgba, useThemeContext, DropdownWrapper } from '@aave/aave-ui-kit';

import { useLanguageContext } from '../../../libs/language-provider';
import CustomScroll from '../CustomScroll';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../../../libs/language-provider/constants';
import { languages } from './languages';

import messages from './messages';
import staticStyles from './style';

import arrows from './images/arrows.svg';

interface LangSwitcherProps {
  inside?: boolean;
  className?: string;
}

export default function LangSwitcher({ inside, className }: LangSwitcherProps) {
  const intl = useIntl();
  const { currentLangSlug, changeLang } = useLanguageContext();
  const { currentTheme, sm, md } = useThemeContext();

  const [visible, setVisible] = useState(false);
  const [isTopLineVisible, setIsTopLineVisible] = useState(false);
  const [isBottomLineVisible, setIsBottomLineVisible] = useState(false);

  const setLanguage = (langCode: SupportedLanguage) => {
    changeLang(langCode);
    setVisible(false);
  };

  const borderColor = rgba(`${currentTheme.darkBlue.rgb}, 0.1`);

  const handleScrollUpdate = (values: any) => {
    const { scrollTop, scrollHeight, clientHeight } = values;
    const bottomScrollTop = scrollHeight - clientHeight - 7;

    if (scrollTop > 0) {
      setIsTopLineVisible(true);
    } else {
      setIsTopLineVisible(false);
    }

    if (scrollTop < bottomScrollTop) {
      setIsBottomLineVisible(true);
    } else {
      setIsBottomLineVisible(false);
    }
  };

  return (
    <DropdownWrapper
      visible={visible}
      setVisible={setVisible}
      className={classNames('LangSwitcher', className, { LangSwitcher__inside: inside })}
      verticalPosition="top"
      horizontalPosition={sm ? 'center' : md && inside ? 'center' : 'right'}
      buttonComponent={
        <button
          className={classNames('LangSwitcher__button', { LangSwitcher__buttonActive: visible })}
          onClick={() => setVisible(!visible)}
          type="button"
        >
          <img src={languages[currentLangSlug].icon} alt="" />
        </button>
      }
    >
      <div className="LangSwitcher__content">
        <h4>{intl.formatMessage(messages.caption)}</h4>
        {isTopLineVisible && (
          <div className="LangSwitcher__content-line LangSwitcher__content-lineTop">
            <img src={arrows} alt="" />
          </div>
        )}
        <div className="LangSwitcher__languagesWrapper">
          <CustomScroll onUpdate={handleScrollUpdate}>
            <div className="LangSwitcher__languages">
              {SUPPORTED_LANGUAGES.map((lang, index) => (
                <button
                  className={classNames('LangSwitcher__language', {
                    LangSwitcher__languageActive: lang === currentLangSlug,
                  })}
                  key={index}
                  onClick={() => setLanguage(lang)}
                  disabled={lang === currentLangSlug}
                >
                  <p>{intl.formatMessage(languages[lang].name)}</p>
                  <img src={languages[lang].icon} alt={lang} />
                </button>
              ))}
            </div>
          </CustomScroll>
        </div>
        {isBottomLineVisible && (
          <div className="LangSwitcher__content-line LangSwitcher__content-lineBottom">
            <img src={arrows} alt="" />
          </div>
        )}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .LangSwitcher {
          &__button {
            border-color: ${currentTheme.white.hex};
            background: ${currentTheme.white.hex};
            &:hover {
              border-color: ${currentTheme.primary.hex};
              background: ${currentTheme.primary.hex};
            }
          }

          &__content {
            h4 {
              color: ${currentTheme.darkBlue.hex};
              border-bottom: 1px solid ${borderColor};
            }
          }

          &__content-line {
            background: ${currentTheme.primary.hex};
            box-shadow: 0 2px 5px ${currentTheme.primary.hex};
          }

          &__language {
            border-bottom: 1px solid ${borderColor};
            &:hover {
              background: ${borderColor};
            }
            img {
              border: 1px solid ${borderColor};
            }
            p {
              color: ${currentTheme.darkBlue.hex};
            }
          }
          &__languageActive {
            img {
              border-color: ${currentTheme.primary.hex};
            }
            p {
              color: ${currentTheme.primary.hex};
            }
          }
        }
      `}</style>
    </DropdownWrapper>
  );
}
