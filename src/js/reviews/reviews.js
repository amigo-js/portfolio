import { renderReviewsError, renderReviewsSuccess } from './renderReviews.js';
import Swiper from 'swiper';
import { Keyboard, Navigation } from 'swiper/modules';

export function reviewSection() {
  const reviewsData = [
    {
      author: 'Antoni Malinowski',
      avatar_url: '../../img/reviews/antoni_malinowski.jpg',
      review:
        'Viktor stands out as a dependable and skilled specialist. He consistently exceeds expectations with his attention to detail, timely delivery, and exceptional work ethic.',
    },
  ];

  const swiperReviews = new Swiper('.reviews-swiper', {
    modules: [Navigation, Keyboard],
    navigation: {
      nextEl: '.reviews-swiper-button-right',
      prevEl: '.reviews-swiper-button-left',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
      pageUpDown: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      1440: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
    },
  });

  async function getReviews() {
    try {
      renderReviewsSuccess(reviewsData);
    } catch (error) {
      renderReviewsError();
    }
  }

  getReviews();
}
