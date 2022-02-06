import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .BasicTable {
    display: flex;
    flex-direction: column;
    flex: 1;

    width: 100%;
    margin: 0;

    @include respond-to(sm) {
      flex: none;
      display: block;
      margin: 0;
      width: 100%;
    }

    &__wrapper {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    &__content {
      display: flex;
      flex-direction: column;
      flex: auto;
      height: 1px;
      min-height: 250px;
      padding-top: 100px;
      margin-top: -100px;
      @include respond-to(sm) {
        height: auto;
      }
    }

    &__content-inner {
      display: block;
      padding: 7px 15px 12px;
      @include respond-to(sm) {
        padding: 5px 5px 12px;
      }
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0 45px 5px;
      @include respond-to(xl) {
        padding-left: 35px;
        padding-right: 35px;
      }
      @include respond-to(lg) {
        padding-left: 25px;
        padding-right: 25px;
      }
      @include respond-to(sm) {
        padding-left: 15px;
        padding-right: 15px;
      }
    }
  }
`;

export default staticStyles;
