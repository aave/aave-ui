import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .ProposalVoteBar {
    margin-bottom: 20px;
    @include respond-to(xl) {
      margin-bottom: 10px;
    }
    @include respond-to(sm) {
      margin-bottom: 20px;
    }

    &__leaderboard {
      .ProposalVoteBar__item {
        width: calc(50% - 10px);
        @include respond-to(md) {
          width: calc(50% - 5px);
        }
      }
    }

    &__items {
      display: flex;
      justify-content: space-between;
      @include respond-to(sm) {
        flex-direction: column;
      }
    }

    &__item {
      width: calc(50% - 10px);
      @include respond-to(xl) {
        width: calc(50% - 5px);
      }
      @include respond-to(sm) {
        width: 100%;
        margin-bottom: 20px;
        &:last-of-type {
          margin-bottom: 0;
        }
      }

      .Value .Value__value {
        font-size: $regular;
        font-weight: 400;
        @include respond-to(xl) {
          font-size: $medium;
        }
        @include respond-to(lg) {
          font-size: $small;
        }
        @include respond-to(sm) {
          font-size: $regular;
          font-weight: 600;
        }
      }
      .ContentWrapperWithTopLine__top-line {
        @include respond-to(xl) {
          font-size: $medium;
        }
        @include respond-to(lg) {
          font-size: $small;
        }
        @include respond-to(sm) {
          font-size: $regular;
        }
      }
      .ContentWrapperWithTopLine__content {
        padding: 15px 20px;
        @include respond-to(xl) {
          padding: 10px 15px;
        }
      }
    }
  }
`;

export default staticStyles;
