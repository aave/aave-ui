import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .TableButtonsWrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    max-width: 200px;
    flex: 2;
    @include respond-to(xl) {
      max-width: 160px;
    }
    @include respond-to(lg) {
      max-width: 180px;
    }
    @include respond-to(md) {
      max-width: 160px;
    }
    @include respond-to(sm) {
      position: relative;
      max-width: 100%;
      width: 100%;
      flex: unset;
      justify-content: space-between;
      padding-top: 20px;
      &:after {
        content: '';
        position: absolute;
        left: -15px;
        right: -15px;
        top: 0;
        height: 1px;
      }

      .Link {
        width: 46%;
      }

      &.TableButtonsWrapper .DefaultButton {
        min-height: 42px;
        font-size: $medium;
        width: 100%;
      }
    }

    &__onlyOne {
      justify-content: flex-end;
      max-width: 100px;
      @include respond-to(xl) {
        max-width: 80px;
      }
      @include respond-to(lg) {
        max-width: 90px;
      }
      @include respond-to(md) {
        max-width: 80px;
      }
      @include respond-to(sm) {
        max-width: 100%;
      }
    }
  }
`;

export default staticStyles;
