import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .SwapForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @include respond-to(sm) {
      padding-top: 30px;
    }

    .SwapForm__caption {
      max-width: 615px;
      margin-right: auto;
      margin-left: auto;
    }

    &__inputs-wrapper {
      display: flex;
      flex-direction: column;
    }

    &__error-inner {
      width: 100%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-bottom: 20px;
      font-size: $medium;
      min-height: 25px;
      @include respond-to(xl) {
        font-size: $extraSmall;
        min-height: 20px;
        margin-bottom: 15px;
      }
      @include respond-to(lg) {
        margin-bottom: 10px;
      }
      @include respond-to(md) {
        font-size: $medium;
        min-height: 25px;
        margin-bottom: 30px;
      }
      p {
        text-align: center;
      }
    }

    &__button-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 5px;
    }
  }
`;

export default staticStyles;
