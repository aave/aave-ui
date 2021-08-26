import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .MarketsModal {
    &__content {
      max-width: 300px;

      h3 {
        font-weight: 600;
        font-size: $regular;
        margin-bottom: 30px;
      }

      .MarketSelectButton {
        margin-bottom: 10px;
      }
      .MarketSelectButton__inner {
        width: 260px;
        height: 60px;
      }
      .MarketSelectButton .MarketSelectButton__subLogo {
        height: 60px;
      }
      .MarketSelectButton__logo-inner img {
        max-height: 25px;
        width: 110px;
      }
      .MarketSelectButton__logo-inner span {
        font-size: $medium;
      }
      .MarketSelectButton .MarketSelectButton__marketText {
        font-size: 13px;
      }
      .MarketSelectButton__kovan {
        text-transform: uppercase;
        width: 17px;
        height: 17px;
        right: 3px;
        top: 3px;
        font-size: $extraSmall;
      }
    }
  }

  @media only screen and (max-height: 650px) and (max-width: 768px) {
    .ReactModal__Content.MarketsModal {
      position: absolute !important;
      top: 5% !important;
      bottom: 5% !important;
      display: block;
      overflow: auto !important;
    }
  }
`;

export default staticStyles;
