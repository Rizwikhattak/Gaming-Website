import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { fetchSliderGames } from "../Services/RawgServices";

const Customerreviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        // Fetch games or reviews data from your API
        const data = await fetchSliderGames();
        console.log("Popular games", data);
        if (data) {
          const topGames = data.slice(0, 8); // Fetch top 8 games for reviews
          const reviewsData = topGames.map((game, index) => ({
            id: game.id,
            name: game.name,
            image: `./img/people/${index + 1}.jpg`, // Use dynamic image path for avatars
            rating: Math.round(game.rating),
            comment: `${
              game.name
            } offers an incredible gaming experience with its ${
              game.released ? "dynamic gameplay" : "upcoming release"
            }. A must-try for every gamer!`,
            reviewer: `Reviewer ${index + 1}`,
          }));
          setReviews(reviewsData);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="subtitle mb20">Customer reviews</div>
            <h2 className="wow fadeInUp">
              {loading ? "Loading..." : "4.85 out of 5"}
            </h2>
            <div className="spacer-20"></div>
          </div>
        </div>
      </div>
      <Swiper
        className="smallslider"
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView="auto"
        pagination={{ clickable: true }}
        centeredSlides
        loop
        slideToClickedSlide
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="swiper-inner">
              <div className="de_testi type-2">
                <blockquote>
                  <div className="de-rating-ext">
                    <span className="d-stars">
                      {Array.from({ length: review.rating }, (_, index) => (
                        <i className="fa fa-star" key={index}></i>
                      ))}
                    </span>
                  </div>
                  <p>&quot;{review.comment}&quot;</p>
                  <div className="de_testi_by">
                    <img alt={review.name} src={review.image} />
                    <span>{review.reviewer}</span>
                  </div>
                </blockquote>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {!reviews.length && !loading && (
          <SwiperSlide>
            <div className="swiper-inner">
              <p>No reviews available</p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
};

export default Customerreviews;
