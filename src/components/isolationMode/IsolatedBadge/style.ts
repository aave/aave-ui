import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .IsolatedBadge {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: $borderRadius;
    padding: 3px 5px;
    margin-left: 13px;
    cursor: pointer;
    @include respond-to(xl) {
      padding: 1px 5px;
    }

    &__text {
      font-weight: 500;
      font-size: $medium;
      @include respond-to(xl) {
        font-size: $small;
      }
      @include respond-to(lg) {
        font-size: $extraSmall;
      }
      @include respond-to(md) {
        font-size: $small;
      }
    }

    &__button {
      background: transparent;
      border: none;
      padding: 0;
      cursor: pointer;
      transition: $transition;
      border-radius: 50%;
      margin-left: 4px;
      &:hover {
        box-shadow: rgba(0, 0, 0, 0.25) 0 1px 5px;
      }
      &:active {
        transform: scale(0.8);
      }
    }
  }
`;

export default staticStyles;
