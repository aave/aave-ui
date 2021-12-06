import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .NetAPYGraph {
    width: 124px;
    height: 97px;
    display: flex;
    align-items: flex-end;
    padding-left: 50px;
    position: relative;
    margin-right: 10px;
    @include respond-to(xl) {
      width: 97px;
      height: 85px;
      padding-left: 42px;
    }
    @include respond-to(lg) {
      width: 64px;
      height: 104px;
      margin-right: 0;
      padding-left: 32px;
    }
    @include respond-to(md) {
      width: 124px;
      height: 162px;
      padding-left: 50px;
      margin-right: 10px;
    }

    &__line {
      position: absolute;
      left: 0;
      width: 100%;
      font-size: $extraSmall;
      padding-bottom: 3px;
      @include respond-to(xl) {
        font-size: 8px;
        padding-bottom: 2px;
      }
      @include respond-to(md) {
        font-size: $extraSmall;
        padding-bottom: 3px;
      }
    }
    &__lineTop {
      bottom: 100%;
    }
    &__lineCenter {
      bottom: 50%;
    }
    &__lineBottom {
      bottom: 0;
    }

    &__column {
      width: 20px;
      position: relative;
      z-index: 2;
      @include respond-to(xl) {
        width: 14px;
      }
      @include respond-to(lg) {
        width: 10px;
      }
      @include respond-to(md) {
        width: 20px;
      }
      &:last-of-type {
        margin-left: 4px;
        @include respond-to(xl) {
          margin-left: 2px;
        }
        @include respond-to(md) {
          margin-left: 4px;
        }
      }
    }
    &__earnedColumn {
      background: linear-gradient(180deg, #3cdeec 0%, #2ebac6 92.12%);
    }
    &__debtColumn {
      background: linear-gradient(180deg, #e255c1 0%, #b6509e 100%);
    }
  }
`;

export default staticStyles;
