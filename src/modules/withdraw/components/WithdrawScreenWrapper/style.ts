import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .WithdrawScreenWrapper {
    .Row {
      min-width: 150px;
      &:first-of-type {
        min-width: 300px;
      }
    }
    .Row__column {
      .Row__title-inner {
        align-items: center;
      }
      .Row__content {
        justify-content: center;
      }
      .ValuePercent {
        justify-content: center;
      }
    }
    .CollateralCompositionBar.Row {
      width: 700px;
      @include respond-to(xl) {
        width: 520px;
      }
      @include respond-to(lg) {
        width: 200px;
        .Row__title-inner {
          align-items: flex-start;
          margin-bottom: 5px;
        }
      }
      @include respond-to(md) {
        width: 100%;
        margin-top: 30px;
        .Row__title-inner {
          margin-bottom: 0;
        }
      }
      @include respond-to(sm) {
        margin-top: 0;
        .Row__title-inner {
          align-items: flex-start;
          margin-bottom: 5px;
        }
      }
    }
    .HealthFactor__no-value {
      justify-content: center;
    }
  }
`;

export default staticStyles;
