import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css.global`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .DelegationFieldInner {
    position: relative;
    z-index: 1;
    margin-bottom: 20px;
    @include respond-to(lg) {
      margin-bottom: 10px;
    }
    @include respond-to(md) {
      margin-bottom: 20px;
    }
    &:first-of-type {
      z-index: 3;
    }
    &:nth-of-type(2) {
      z-index: 2;
    }
    &:last-of-type {
      margin-bottom: 0;
    }

    &__title {
      margin-bottom: 5px;
      font-size: $medium;
      @include respond-to(lg) {
        font-size: $small;
      }
      @include respond-to(md) {
        font-size: $medium;
      }
    }

    .Delegation__select {
      .DropdownWrapper__content {
        top: 100%;
      }
      .SelectField__select {
        padding: 13px 15px;
        box-shadow: none;
        font-size: $regular;
        @include respond-to(lg) {
          font-size: $small;
          padding: 11px 15px;
        }
        @include respond-to(md) {
          font-size: $regular;
          padding: 13px 15px;
        }
      }

      .Delegation__select-item {
        font-size: $regular;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        transition: $transition;
        @include respond-to(lg) {
          padding: 8px 15px;
          font-size: $small;
        }
        @include respond-to(md) {
          padding: 15px;
          font-size: $regular;
        }
        &:last-of-type {
          border-bottom: none !important;
        }
        &:disabled {
          cursor: default;
        }

        .TokenIcon .TokenIcon__name,
        .Value .Value__value {
          font-size: $regular;
          @include respond-to(lg) {
            font-size: $small;
          }
          @include respond-to(md) {
            font-size: $regular;
          }
        }

        .TokenIcon .TokenIcon__name {
          b {
            font-weight: 400;
          }
        }
      }
    }
  }
`;

export default staticStyles;
