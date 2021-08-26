import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .VoteInfoBar {
    margin-bottom: 10px;

    .Row.VoteInfoBar__row {
      margin-bottom: 8px;
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $medium;
      }
    }
  }
`;

export default staticStyles;
