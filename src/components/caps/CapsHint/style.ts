import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .CapsHint {
    display: flex;
    align-items: center;
    @include respond-to(sm) {
      margin-top: 5px;
    }

    &__withoutText {
      margin-left: 4px;
    }

    .Value__value,
    .TokenIcon__dollar,
    &__title {
      font-size: $small !important;
      @include respond-to(lg) {
        font-size: $extraSmall !important;
      }
      @include respond-to(sm) {
        font-size: $small !important;
      }
    }
    .TokenIcon__dollar {
      margin-right: 1px !important;
    }
    .Value__value,
    .TokenIcon__dollar {
      font-weight: 600;
    }

    &__title {
      margin: 0 4px;
    }
  }
`;

export default staticStyles;
