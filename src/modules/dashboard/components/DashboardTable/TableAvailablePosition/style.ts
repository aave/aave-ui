import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableAvailablePosition {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 6px 10px;
    position: relative;
    box-shadow: $boxShadow;
    border-radius: $borderRadius;
    margin-bottom: 6px;
    min-height: 70px;
    @include respond-to(xl) {
      min-height: 60px;
    }
    @include respond-to(lg) {
      min-height: 55px;
    }

    &__withInfo {
      position: relative;
      margin-bottom: 35px;
    }

    &__isolated {
      position: relative;
      margin-top: 24px;
      border-top-left-radius: unset;
      border-top-right-radius: unset;
      @include respond-to(xl) {
        margin-top: 20px;
      }
    }

    &__isolated--inner {
      position: absolute;
      left: 0;
      right: 0;
      top: -24px;
      height: 24px;
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
      padding: 2px 10px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      @include respond-to(xl) {
        height: 20px;
        top: -20px;
      }

      .IsolatedBadge {
        border: none !important;
        padding: 0 !important;
        margin: 0 !important;
      }
    }

    .TableAvailablePosition__inner {
      align-items: center;
      justify-content: flex-start;
      flex-direction: row;
    }

    .TableAvailablePosition__token {
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
