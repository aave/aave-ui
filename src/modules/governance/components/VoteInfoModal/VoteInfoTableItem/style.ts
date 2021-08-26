import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .VoteInfoTableItem {
    display: flex;
    justify-content: space-between;
    padding: 7px 0;
    position: relative;
    @include respond-to(xl) {
      padding: 10px 0;
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.1;
      width: 100%;
      height: 1px;
    }
    p,
    b {
      font-size: $large;
      @include respond-to(xl) {
        font-size: $medium;
      }
    }
    p {
      font-weight: 300;
    }
  }
`;

export default staticStyles;
