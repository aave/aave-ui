import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .BasicField {
    position: relative;
    z-index: 2;
    width: 100%;
    input {
      border: none;
      background: transparent;
      font-family: 'roboto-font', sans-serif;
      transition: $transition;
      font-size: $regular;
      width: 100%;
      @include respond-to(lg) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $regular;
      }
    }
  }
`;

export default staticStyles;
