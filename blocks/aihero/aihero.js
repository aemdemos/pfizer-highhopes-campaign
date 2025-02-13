import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];

  block.classList.add(`cols-${cols.length}`);

  // setup image aicolumns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');

      const imgSizes = [
        { media: '(max-width: 600px)', width: '400' },
        { media: '(min-width: 601px)', width: '720' },
      ];

      const img = pic?.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, 'hero image', true, imgSizes);
        pic.replaceWith(optimizedPic);
      }

      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('aicolumns-img-col');
        }
      }
    });
  });
}
