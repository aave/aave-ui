import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableItem {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 11px 10px 10px;
    position: relative;
    min-height: 72px;
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
