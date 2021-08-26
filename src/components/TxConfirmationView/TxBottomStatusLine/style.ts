import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TxBottomStatusLine {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px;
    position: relative;
    width: 100%;
    min-height: 28px;
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      left: 0;
      top: 0;
      opacity: 0.1;
    }

    .TxBottomStatusLine__title {
      text-align: left;
    }

    .TxBottomStatusLine__title,
    .TxBottomStatusLine__status-inner,
    .TxBottomStatusLine__linkInner {
      width: 33%;
    }

    .TxBottomStatusLine__title,
    .TxBottomStatusLine__link {
      font-size: $medium;
      white-space: nowrap;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(lg) {
        font-size: $extraSmall;
      }
      @include respond-to(md) {
        font-size: $small;
      }
    }

    .TxBottomStatusLine__link {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      img {
        margin-left: 5px;
      }
    }
  }
`;

export default staticStyles;
