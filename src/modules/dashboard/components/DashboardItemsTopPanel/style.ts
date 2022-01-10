import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DashboardItemsTopPanel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 36px;
    margin: 10px 20px 25px;
    @include respond-to(xl) {
      min-height: 32px;
    }
    @include respond-to(lg) {
      min-height: 26px;
      margin: 10px 15px 25px;
    }
    @include respond-to(md) {
      min-height: 34px;
      margin: 10px 20px 15px;
    }
    @include respond-to(sm) {
      margin: 10px 0 20px;
      flex-wrap: wrap;
    }

    .CheckBoxField {
      label {
        font-weight: 400;
      }
    }

    .CheckBoxField label,
    .Link {
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $medium;
      }
    }

    &__bridgeLink {
      display: flex;
      align-items: center;
      img {
        margin-left: 4px;
        width: 12px;
        height: 12px;
        @include respond-to(xl) {
          width: 10px;
          height: 10px;
        }
      }
    }
  }
`;

export default staticStyles;
