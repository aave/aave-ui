import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .LiquidationRiskParametresInfoModal {
    &__content {
      .Caption {
        a {
          font-weight: 500;
        }
      }

      .HealthFactor {
        margin-bottom: 0;
      }

      .TextWithModal__text,
      .Row__title {
        @include respond-to(xl) {
          font-size: $medium !important;
        }
      }

      .ValuePercent__value {
        @include respond-to(xl) {
          font-size: $regular !important;
        }
      }
    }

    &__buttonInner {
      margin-top: 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  @media only screen and (max-height: 775px) {
    .ReactModal__Content.LiquidationRiskParametresInfoModal.ReactModal__Content--after-open {
      position: absolute !important;
      top: 1% !important;
      bottom: 1% !important;
      display: block;
      overflow: auto !important;
    }
  }
`;

export default staticStyles;
