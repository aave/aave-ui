import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableNoData {
    display: block;
    margin: 0 auto;
    .ContentWrapper {
      padding-top: 40px;
      padding-bottom: 40px;
      @include respond-to(sm) {
        padding-top: 20px;
        padding-bottom: 20px;
      }
    }
    .Caption {
      margin-bottom: 0;
    }

    &__title {
      display: block;
      padding: 0 10px;
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(lg) {
        font-size: $medium;
      }
      @include respond-to(md) {
        font-size: $small;
      }
      margin-bottom: 10px;
      @include respond-to(sm) {
        display: none;
      }
    }

    &__withTopMargin {
      margin-top: 50px;
    }
  }
`;

export default staticStyles;
