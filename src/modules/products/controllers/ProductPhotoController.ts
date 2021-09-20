import { classToClass } from 'class-transformer';
import { Response, Request } from 'express';
import UpdateProductPhotoService from '../services/UpdateProductPhotoService';

export default class ProductPhotoController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updatePhoto = new UpdateProductPhotoService();

    const product = updatePhoto.execute({
      product_id: request.params.id,
      photoFilename: request.file?.filename as string,
    });

    return response.json(classToClass(product));
  }
}
