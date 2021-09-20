import { Response, Request } from 'express';
import CreateCategoryService from '../services/CreateCategoryService';
import DeleteCategoryService from '../services/DeleteCategoryService';
import ListCategoryService from '../services/ListCategoryService';
import ShowCategoryService from '../services/ShowCategoryService';
import UpdateCategoryService from '../services/UpdateCategoryService';

export default class CategoriesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCategories = new ListCategoryService();

    const categories = await listCategories.execute();
    return response.json(categories);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCategory = new ShowCategoryService();

    const category = await showCategory.execute({ id });

    return response.json(category);
  }

  public async showByName(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name } = request.params;

    const showCategory = new ShowCategoryService();

    const category = await showCategory.searchCategoryName({ name });

    return response.json(category);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = new CreateCategoryService();
    const category = await createCategory.execute({
      name,
    });
    return response.json(category);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;

    const updateCategory = new UpdateCategoryService();
    const category = await updateCategory.execute({
      id,
      name,
    });
    return response.json(category);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCategory = new DeleteCategoryService();

    await deleteCategory.execute({ id });

    return response.json([]);
  }
}
