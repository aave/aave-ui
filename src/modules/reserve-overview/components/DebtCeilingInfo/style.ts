import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DebtCeilingInfo {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    @include respond-to(xl) {
      margin-top: 10px;
    }

    .DebtCeilingInfo__title {
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 4px;
      .TextWithModal__button {
        position: static;
        transform: unset;
        margin: 1px 0 0 4px;
      }
    }

    &__modal--text {
      font-size: $large;
      margin-bottom: 32px;
      @include respond-to(xl) {
        font-size: $regular;
      }
      @include respond-to(lg) {
        font-size: $medium;
      }
      @include respond-to(md) {
        font-size: $regular;
      }

      a {
        font-weight: 500;
      }
    }

    .DebtCeilingInfo__values,
    .TextWithModal__text,
    .Value .Value__token-icon .TokenIcon__dollar,
    .Value .Value__value {
      font-size: $small;
      font-weight: 400;
      @include respond-to(xl) {
        font-size: $extraSmall;
      }
      @include respond-to(sm) {
        font-size: $medium;
      }
    }

    .Value .Value__token-icon .TokenIcon__dollar {
      margin-right: 2px !important;
    }

    &__values {
      display: flex;
      &--divider {
        margin: 0 3px;
      }
    }
  }
`;

export default staticStyles;
