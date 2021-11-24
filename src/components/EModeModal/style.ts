import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ReactModal__Content.EModeModal__wrapper {
    max-width: 100% !important;
  }

  .EModeModal {
    .Caption {
      max-width: 500px;
    }

    &__content {
      padding: 20px;
      border-radius: $borderRadius;
      @include respond-to(xl) {
        padding: 20px 15px;
      }
      @include respond-to(sm) {
        padding: 20px 10px;
      }
    }

    &__title {
      display: flex;
      align-items: center;
    }

    &__subTitle {
      margin-right: 10px;
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(lg) {
        font-size: $extraSmall;
      }
      @include respond-to(md) {
        font-size: $small;
      }
    }

    &__button {
      margin: 0 auto;
    }
  }
`;

export default staticStyles;
