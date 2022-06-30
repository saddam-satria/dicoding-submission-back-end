const rootController = (_request, handler) => {
  const response = {
    status: 'success',
    message: 'Submission Dicoding Submission Bookshelf API',
  };
  handler.response().code(200);
  return response;
};
export default rootController;
