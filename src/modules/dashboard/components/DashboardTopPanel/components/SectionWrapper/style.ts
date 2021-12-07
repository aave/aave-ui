import css from 'styled-jsx/css';

/*language=SCSS*/
const staticStyles = css`
  @import 'src/_mixins/vars';
  @import 'src/_mixins/screen-size';

  .SectionWrapper.SectionWrapper {
    padding: 20px 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33.33333%;
    @include respond-to(lg) {
      padding: 20px;
    }
    @include respond-to(md) {
      padding: 0;
      border-right: none;
      width: 100%;
      margin-bottom: 20px;
      justify-content: space-between;
    }
    @include respond-to(sm) {
      padding: 0;
      margin-bottom: 20px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }

    &:last-of-type {
      border-right: none;
    }

    &.SectionWrapper__collapse {
      padding: 0 20px;
      @include respond-to(md) {
        width: 33.33333%;
        margin-bottom: 0;
        justify-content: center;
      }
      @include respond-to(sm) {
        padding: 0;
        border-right: none;
        width: 100%;
        margin-bottom: 20px;
        justify-content: space-between;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
`;

export default staticStyles;
