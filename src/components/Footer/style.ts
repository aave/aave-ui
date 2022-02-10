import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Footer {
    background: #131313;
    height: 50px;
    position: relative;
    z-index: 2;
    padding: 10px 30px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
    }
    .footer_text {
      padding-right: 25px;
      h2 {
        font-family: Montserrat;
        font-size: 12px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #fff;
      }
      p {
        opacity: 0.5;
        font-family: Montserrat;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #fff;
        span {
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
      }
    }
    @include respond-to(xl) {
      padding: 10px 10px 5px;
    }
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
