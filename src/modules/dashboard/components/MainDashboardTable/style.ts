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

    &__rightNoData--wrapper {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    &__noData--title {
      display: block;
      padding: 0 10px;
      font-size: $regular;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(lg) {
        font-size: $medium;
      }
      @include respond-to(md) {
        font-size: $small;
      }
      margin-bottom: 10px;
      @include respond-to(sm) {
        display: none;
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
