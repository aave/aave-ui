import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .StateChangesContent {
    padding: 10px;
    display: flex;
    margin-bottom: 15px;
    align-items: center;
    justify-content: center;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: -20px;
      width: calc(100% + 40px);
      @include respond-to(sm) {
        left: -15px;
        width: calc(100% + 30px);
      }
    }

    .StateChangesContent__state {
      .StateChanges__info-block {
        width: 50px;
        font-size: $small;
        border-radius: $borderRadius;
        span {
          letter-spacing: 0;
          width: auto;
        }
      }
      .StateChanges__arrow {
        border-width: 1px 1px 0 0;
        width: 9px;
        height: 9px;
        margin: 0 11px 0 13px;
        &:after,
        &:before {
          height: 1px;
          top: -1px;
          width: 14px;
        }
      }
    }
  }

  .APYStateChangesContent {
    .StateChangesContent__state {
      .StateChanges__info-block {
        width: 80px;
      }
    }
  }
`;

export default staticStyles;
