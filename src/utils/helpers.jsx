export const modifiedImageName = (id, imageName) => {
  return `${id}&img=${imageName}`;
};

export const originalImageName = (imageName = '') => {
  if (imageName.includes('&img=')) {
    return imageName.split('&img=')[1];
  }

  return imageName;
};
