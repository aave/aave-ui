import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DesktopPageTitle {
    position: relative;
    margin-bottom: 37px;
    @include respond-to(xl) {
      margin-bottom: 30px;
    }
    @include respond-to(lg) {
      margin-bottom: 20px;
    }
    @include respond-to(md) {
      margin-bottom: 30px;
    }
    @include respond-to(sm) {
      display: none;
    }
    h2 {
      font-weight: 400;
      line-height: 1;
      margin-bottom: 10px;
      font-size: $large;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      @include respond-to(xl) {
        font-size: $regular;
      }
      @include respond-to(lg) {
        font-size: $medium;
      }
      @include respond-to(md) {
        font-size: $regular;
      }

      .DesktopPageTitle__subTitle {
        font-size: $regular;
        @include respond-to(xl) {
          font-size: $small;
        }
        .Link {
          display: inline-flex;
          align-items: center;
          img {
            width: 12px;
            height: 12px;
            margin-left: 5px;
          }
        }
      }
    }
  }
`;

export default staticStyles;
