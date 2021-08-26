import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .RepayScreenWrapper {
    &__items-wrapper {
      width: 400px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-self: stretch;
      @include respond-to(xl) {
        width: 370px;
      }
      @include respond-to(lg) {
        width: 260px;
      }
      &:nth-of-type(1) {
        @include respond-to(md) {
          order: 0;
          width: 45%;
        }
        @include respond-to(sm) {
          width: 100%;
        }
      }
      &:nth-of-type(2) {
        @include respond-to(md) {
          order: 2;
          width: 100%;
          flex-direction: row;
          .Row {
            width: 45%;
          }
        }
        @include respond-to(sm) {
          flex-direction: column;
          .Row {
            width: 100%;
          }
        }
      }
      &:nth-of-type(3) {
        @include respond-to(md) {
          order: 1;
          width: 45%;
          .Row {
            margin-bottom: 25px;
          }
          .HealthFactor {
            margin-bottom: 25px;
          }
        }
        @include respond-to(sm) {
          width: 100%;
          .Row {
            margin-bottom: 14px;
          }
          .HealthFactor {
            margin-bottom: 14px;
          }
        }
      }

      .Row {
        margin-bottom: 10px;
        @include respond-to(sm) {
          margin-bottom: 14px;
        }
      }
      .CollateralCompositionBar {
        .Row__title-inner {
          margin-bottom: 5px;
        }
      }
    }
  }

  .RepayScreenWrapper__content {
    overflow: hidden;
    @include respond-to(sm) {
      overflow: unset;
    }
  }
`;

export default staticStyles;
