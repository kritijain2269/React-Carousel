export const getImages = () => {
  return fetch(
    "https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39&q=beautiful+landscape&image_type=photo"
  ).then(response => response.json());
};
