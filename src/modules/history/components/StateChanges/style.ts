import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .StateChanges {
    display: flex;
    align-items: center;

    &__arrows-wrapper {
      display: flex;
      align-items: center;
    }
    &__info-block {
      width: 90px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px;
      font-size: $small;
      border-radius: $borderRadius;
      border-width: 1px;
      border-style: solid;
      @include respond-to(sm) {
        font-size: $medium;
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
      span {
        display: inline-block;
        @include respond-to(sm) {
          letter-spacing: 10px;
          width: 10px;
          overflow: hidden;
        }
      }
    }
    .StateChanges__arrow {
      border-width: 1px 1px 0 0;
      width: 9px;
      height: 9px;
      margin: 0 11px 0 13px;
      @include respond-to(sm) {
        margin: 0 6px 0 8px;
        width: 8px;
        height: 8px;
      }
      &:after,
      &:before {
        height: 1px;
        top: -1px;
        width: 14px;
        @include respond-to(sm) {
          width: 12px;
        }
      }
    }

    &__token-inner {
      margin-left: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex: 1;
      @include respond-to(lg) {
        margin-right: 5px;
      }
      .StateChanges__token-icon {
        img {
          margin-right: 5px !important;
        }
      }
      .MultipleIcons {
        margin-right: 5px !important;
      }
      span {
        font-size: $regular;
        font-weight: 300;
        position: relative;
        top: 1px;
        @include respond-to(lg) {
          font-size: $medium;
        }
      }
    }
  }
`;

export default staticStyles;
