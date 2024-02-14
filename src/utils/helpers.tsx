import { Product } from '../shared.types'

export const modifiedImageName = (id: String, imageName: string) => {
  return `${id}&img=${imageName}`;
};

export const originalImageName = (imageName = '') => {
  if (imageName.includes('&img=')) {
    return imageName.split('&img=')[1];
  }

  return imageName;
};

export const productsByTimestamps = (filteredProducts: Product[]) => {
  const result = filteredProducts.map(item => {
    return {
      ...item,
      createdAt: new Date(item.createdAt).getTime()
    }
  })

  return result
}