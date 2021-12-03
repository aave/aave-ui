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
    }
  }
`;

export default staticStyles;
