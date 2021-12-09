import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .EmodeCategoryLabel {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      margin-right: 4px;
      width: 12px;
      height: 12px;
      @include respond-to(xl) {
        width: 10px;
        height: 10px;
      }
      @include respond-to(lg) {
        width: 8px;
        height: 8px;
      }
      @include respond-to(md) {
        width: 10px;
        height: 10px;
      }
      @include respond-to(sm) {
        width: 12px;
        height: 12px;
      }
    }
  }
`;

export default staticStyles;
