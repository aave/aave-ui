import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ScreenWrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    @include respond-to(xl) {
      padding: 0 40px;
    }
    @include respond-to(lg) {
      padding: 0 20px;
    }
    @include respond-to(md) {
      padding: 0 20px;
    }
    @include respond-to(sm) {
      padding: 0 10px;
    }

    &__withDesktopTitle {
      margin-top: 40px;
      @include respond-to(sm) {
        margin-top: 0;
        padding-top: 30px;
      }
    }

    &__mobileSubTitle {
      display: none;
      @include respond-to(sm) {
        display: block;
        width: calc(100% + 20px);
        position: relative;
        left: -10px;
        padding: 8px;
        text-align: center;
        margin-top: -30px;
        margin-bottom: 25px;
        font-size: $small;
      }

      .Link {
        display: inline-flex;
        img {
          width: 12px;
          height: 12px;
          margin-left: 5px;
        }
      }
    }

    &__mobile-bottomBorder {
      display: none;
      @include respond-to(md) {
        display: block;
        width: 100%;
        opacity: 0;
      }
      p {
        line-height: 50px;
      }
    }

    &__bannerWrapper {
      margin-bottom: 12px;
      @include respond-to(sm) {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      }
    }

    &__bannerSpacer {
      display: none;
      @include respond-to(sm) {
        display: block;
        margin-bottom: 95px;
      }
    }
  }
`;

export default staticStyles;
