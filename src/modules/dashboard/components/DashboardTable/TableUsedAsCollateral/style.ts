import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableUsedAsCollateral {
    &__isolatedInner {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    &__isolatedIcon {
      width: 14px;
      height: 14px;
      position: absolute;
      @include respond-to(xl) {
        width: 12px;
        height: 12px;
      }
      @include respond-to(sm) {
        width: 14px;
        height: 14px;
        position: static;
      }
    }
    &__isolatedIconLeft {
      margin-right: 4px;
      right: 100%;
    }
    &__isolatedIconRight {
      margin-left: 4px;
      left: 100%;
    }
  }
`;

export default staticStyles;
