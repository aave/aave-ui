import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TxConfirmationView {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex: 1;
    width: 410px;
    margin: 0 auto;
    @include respond-to(xl) {
      width: 380px;
    }
    @include respond-to(lg) {
      width: 340px;
    }
    @include respond-to(md) {
      width: 380px;
    }
    @include respond-to(sm) {
      width: 100%;
      max-width: 380px;
    }

    &__content-inner {
      margin-bottom: 20px;
      width: 100%;
      text-align: center;
      @include respond-to(lg) {
        margin-bottom: 10px;
      }
      @include respond-to(md) {
        margin-bottom: 20px;
      }
    }
    &__contentInner {
      margin-bottom: 0;
    }

    &__content {
      padding: 15px;
      border-radius: $borderRadius;
    }

    &__actions-inner {
      width: 100%;
    }

    .TokenIcon.TokenIcon .TokenIcon__name {
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

    .InfoPanel {
      &:last-of-type {
        margin-top: 15px;
      }
    }
  }
`;

export default staticStyles;
