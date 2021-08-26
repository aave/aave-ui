import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .VoteBalance {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding-left: 5px;
    .VoteBalance__value {
      font-weight: 600;
    }
  }
`;

export default staticStyles;
