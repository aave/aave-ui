import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TextStatus {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    &__text {
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $medium;
      }
      @include respond-to(lg) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
    }

    .DefaultButton.TextStatus__button {
      width: 120px;
      min-height: 32px;
      font-size: $medium;
      @include respond-to(xl) {
        width: 90px;
        min-height: 26px;
        font-size: $small;
      }
    }
  }
`;

export default staticStyles;
