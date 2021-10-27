import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .IncentiveClaimItem {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    padding: 8px;
    border-radius: $borderRadius;
    transition: $transition;
    @include respond-to(xl) {
      padding: 4px 6px;
    }
    @include respond-to(md) {
      padding: 8px 6px;
    }
    @include respond-to(sm) {
      width: 100%;
      justify-content: space-between;
      margin: 0 0 4px;
    }
    &:last-of-type {
      margin: 0;
    }

    &__valueInner {
      display: flex;
      align-items: center;
      margin-right: 8px;
      @include respond-to(xl) {
        margin-right: 4px;
      }
    }

    &__icon,
    .TokenIcon__image {
      margin-right: 8px;
    }

    .Value__white .Value__value {
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
    }

    .Link {
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
    }

    .CustomTooltip {
      padding: 5px 8px;
      .CustomTooltip__content {
        font-size: $small;
        @include respond-to(xl) {
          font-size: $extraSmall;
        }
      }
    }

    .CustomTooltip.place-top {
      margin-top: -5px !important;
    }
  }
`;

export default staticStyles;
