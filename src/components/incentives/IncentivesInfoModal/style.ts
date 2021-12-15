import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/screen-size';
  @import 'src/_mixins/vars';

  .IncentivesInfoModal {
    &__marketName {
      margin-right: 4px;
      &:first-of-type {
        text-transform: capitalize;
      }
    }

    &__info {
      padding: 20px;
      margin-bottom: 32px;
      border-radius: $borderRadius;
    }

    &__netAPR--inner {
      padding-bottom: 10px;
      margin-bottom: 10px;
    }

    &__valueInner {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__infinity {
      position: relative;
      bottom: 1px;
    }
    &__text-apr {
      margin-left: 4px;
    }

    &__incentives {
      .Row {
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }

    .TokenIcon .TokenIcon__name b {
      font-weight: 400;
      font-size: $large;
      @include respond-to(xl) {
        font-size: $medium;
      }
      @include respond-to(lg) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
      @include respond-to(sm) {
        font-size: $regular;
      }
    }

    &__buttonInner {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export default staticStyles;
