import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .MainDashboardTable {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    &__left-inner,
    &__right-inner {
      width: calc(50% - 10px);
      @include respond-to(lg) {
        width: 100%;
      }
    }

    &__right-inner {
      @include respond-to(lg) {
        display: none;
      }
    }

    &__onlyOne {
      @include respond-to(lg) {
        .MainDashboardTable__left-inner {
          display: none;
        }
        .MainDashboardTable__right-inner {
          display: block;
        }
      }
    }

    &__noData--wrapper {
      display: block;
      margin: 0 auto;
      .ContentWrapper {
        padding-top: 40px;
        padding-bottom: 40px;
        @include respond-to(sm) {
          padding-top: 20px;
          padding-bottom: 20px;
        }
      }
      .Caption {
        margin-bottom: 0;
      }
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
