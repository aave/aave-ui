import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableItem {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 7px 10px 6px;
    position: relative;
    min-height: 70px;
    @include respond-to(xl) {
      min-height: 60px;
    }
    @include respond-to(lg) {
      min-height: 55px;
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
    }

    &__withInfo {
      position: relative;
      margin-bottom: 35px;
    }

    &__isolated {
      position: relative;
      padding-top: 30px;
      border-top-left-radius: unset;
      border-top-right-radius: unset;
      @include respond-to(xl) {
        padding-top: 26px;
      }
      &:after {
        display: none;
      }
    }

    &__isolated--inner {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 24px;
      padding: 2px 10px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      @include respond-to(xl) {
        height: 20px;
      }

      .IsolatedBadge {
        border: none !important;
        padding: 0 !important;
        margin: 0 !important;
      }
    }

    .TableItem__inner {
      align-items: flex-start;
      justify-content: flex-start;
    }

    .TableItem__token {
      .TokenIcon__name {
        font-size: $medium;
      }
      .TokenIcon__image {
        margin-right: 5px;
      }
      .MultipleIcons {
        margin-right: 5px;
        .TokenIcon__image {
          margin-right: 0;
        }
      }
    }

    .Value {
      .Value__Value {
        @include respond-to(xl) {
          font-size: $regular;
        }
        @include respond-to(lg) {
          font-size: $medium;
        }
      }
      .SubValue {
        @include respond-to(xl) {
          font-size: $small;
        }
        @include respond-to(lg) {
          font-size: $extraSmall;
        }
      }
    }
  }
`;

export default staticStyles;
