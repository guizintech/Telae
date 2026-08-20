import { createContext, ReactNode, useContext, useState } from 'react';


interface Review {

  id: string;

  movieId: number;

  movieTitle: string;

  posterPath?: string;

  rating: number;

  comment: string;

  createdAt: string;

}



interface ReviewContextData {

  reviews: Review[];

  addReview: (review: Review) => void;

}



const ReviewContext = createContext<ReviewContextData>(
  {} as ReviewContextData
);




export function ReviewProvider({
  children,
}: {
  children: ReactNode;
}) {


  const [reviews, setReviews] = useState<Review[]>([]);




  function addReview(data: Review) {


    setReviews((current) => [

      ...current,

      data,

    ]);

  }




  return (

    <ReviewContext.Provider

      value={{

        reviews,

        addReview,

      }}

    >

      {children}

    </ReviewContext.Provider>

  );

}




export function useReview() {

  return useContext(ReviewContext);

}