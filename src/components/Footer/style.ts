import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';
  .footer_wrapper {
    margin-top: 40px;
  }
  .line_vert {
    width: 1px;
    height: 30px;
    margin: 0 14px 0 30px;
    opacity: 0.2;
    border: solid 1px #fff;
  }
  .indicator_shadow {
    width: 12px;
    height: 12px;
    margin: 2px 4px 1px 0;
    padding: 3px;
    background-color: #13d7b120;
    border-radius: 50%;
    margin-left: -16px;
  }
  .indicator {
    width: 6px;
    height: 6px;
    background-color: #13d7b1;
    border-radius: 50%;
  }
  .statbox {
    display: flex;
    flex-direction: column;
    margin-right: 24px;
  }
  .stats {
    display: flex;
    flex-direction: row;
  }

  .statbox__value {
    font-family: Montserrat;
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #fff;
  }

  .statbox__description-wrapper {
    display: flex;
    flex-direction: row;
  }

  .statbox__description {
    opacity: 0.5;
    font-family: Montserrat;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #fff;
    margin-right: 6px;
  }

  .statbox__time-ago {
    opacity: 0.2;
    font-family: Montserrat;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #fff;
  }
  .aurora_footer_container {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 15px;
    margin-top: 32px;
  }
  .aurora_footer_title {
    opacity: 0.5;
    font-family: Roboto;
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #000;
    margin-bottom: 4px;
  }
  .Footer {
    background-color: #131313;
    position: relative;
    z-index: 2;
    padding: 10px 15px 10px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    @include respond-to(sm) {
      display: none;
    }

    &__inside {
      @include respond-to(md) {
        display: none;
      }
    }

    .DarkModeSwitcher {
      margin-right: 10px;
    }
  }
`;

export default staticStyles;
