import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableAprCol {
    .ValuePercent__value {
      @include respond-to(xl) {
        font-size: $medium;
      }
      @include respond-to(sm) {
        font-size: $small;
      }
    }

    &__noData {
      font-size: $large;
      @include respond-to(xl) {
        font-size: $medium;
      }
      @include respond-to(sm) {
        font-size: $small;
      }
    }
  }
`;

export default staticStyles;
