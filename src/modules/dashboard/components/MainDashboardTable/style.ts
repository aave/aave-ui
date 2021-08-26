import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .MainDashboardTable {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 10px;
    flex: 1;
    @include respond-to(lg) {
      flex-direction: column;
      justify-content: flex-start;
      display: block;
    }

    &__left-inner,
    &__right-inner {
      width: calc(50% - 10px);
      display: flex;
      align-self: stretch;
      flex-direction: column;
      @include respond-to(lg) {
        width: 100%;
        flex: none;
        min-height: auto;
        display: block;
      }
      @include respond-to(sm) {
        flex: 1;
      }
    }

    &__left-inner {
      @include respond-to(lg) {
        margin-bottom: 20px;
      }
      @include respond-to(md) {
        margin-bottom: 30px;
      }
    }

    &__right-inner {
      @include respond-to(sm) {
        display: none;
      }
    }

    &__onlyOne {
      @include respond-to(sm) {
        .MainDashboardTable__left-inner {
          display: none;
        }
        .MainDashboardTable__right-inner {
          display: flex;
        }
      }
    }

    &__noBorrows {
      .MainDashboardTable__left-inner {
        width: 100%;
        margin-right: 30px;
        @include respond-to(xl) {
          margin-right: 20px;
        }
        @include respond-to(lg) {
          margin-right: 0;
        }
      }
      .MainDashboardTable__right-inner {
        max-width: 320px;
        @include respond-to(xl) {
          max-width: 240px;
        }
        @include respond-to(lg) {
          max-width: 100%;
        }
      }
      .ContentWrapper {
        margin: 32px 0 0;
        @include respond-to(xl) {
          margin: 26px 0 0;
        }
        @include respond-to(lg) {
          margin: 0;
        }
        @include respond-to(sm) {
          padding: 0 10px;
        }
      }
    }
  }

  @media (max-height: 750px) and (max-width: 1200px) {
    .MainDashboardTable {
      display: block;
    }
  }
`;

export default staticStyles;
