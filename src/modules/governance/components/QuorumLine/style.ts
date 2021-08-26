import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .QuorumLine {
    display: flex;
    align-items: center;
    margin-left: 20px;
    @include respond-to(xl) {
      margin-left: 15px;
    }
    @include respond-to(xs) {
      margin-left: 10px;
    }

    p {
      font-size: $regular;
      margin-right: 10px;
      @include respond-to(xl) {
        font-size: $small;
      }
    }

    img {
      width: 16px;
      height: 16px;
      @include respond-to(xl) {
        width: 12px;
        height: 12px;
        margin-left: -5px;
      }
    }

    .PercentLine {
      width: 100px;
      height: 6px;
      top: 2px;
      @include respond-to(xl) {
        top: 1px;
        width: 60px;
      }
      @include respond-to(xs) {
        width: 55px;
      }
    }
  }
`;

export default staticStyles;
