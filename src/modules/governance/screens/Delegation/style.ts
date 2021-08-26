import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .Delegation {
    &__content {
      max-width: 600px;
      @include respond-to(xl) {
        max-width: 640px;
      }
      @include respond-to(lg) {
        max-width: 450px;
      }
    }

    &__form {
      margin: 0 auto;
      max-width: 335px;
      @include respond-to(lg) {
        max-width: 260px;
      }
      @include respond-to(md) {
        max-width: 335px;
      }
    }

    .ButtonWithBackButton {
      margin-top: 30px;
    }

    &__button-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
    }
  }
`;

export default staticStyles;
