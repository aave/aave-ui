import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .HealthFactorInfo {
    margin-bottom: 0;
    @include respond-to(md) {
      width: 100%;
    }

    &.HealthFactor.HealthFactor__column .TextWithModal {
      margin-bottom: 4px;
    }

    .TextWithModal__text {
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $medium;
      }
    }
    .ValuePercent__value {
      font-size: 24px;
      font-weight: 500;
      @include respond-to(xl) {
        font-size: 20px;
      }
      @include respond-to(lg) {
        font-size: $regular;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
    }

    .HealthFactor__no-value {
      justify-content: center;
      @include respond-to(md) {
        justify-content: flex-end;
      }
    }

    &__collapsed {
      @include respond-to(md) {
        width: unset;
      }
      @include respond-to(sm) {
        width: 100%;
      }

      .ValuePercent__value {
        font-size: $large;
        @include respond-to(xl) {
          font-size: $regular;
        }
        @include respond-to(sm) {
          font-size: $medium;
        }
      }

      .HealthFactor__no-value {
        @include respond-to(md) {
          justify-content: center;
        }
        @include respond-to(sm) {
          justify-content: flex-end;
        }
      }
    }
  }
`;

export default staticStyles;
