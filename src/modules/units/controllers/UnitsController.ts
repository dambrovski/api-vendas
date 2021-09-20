import { Response, Request } from 'express';
import CreateUnityService from '../services/CreateUnityService';
import DeleteUnityService from '../services/DeleteUnityService';
import ListUnityService from '../services/ListUnityService';
import ShowUnityService from '../services/ShowUnityService';
import UpdateUnityService from '../services/UpdateUnityService';

export default class UnitsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUnits = new ListUnityService();

    const units = await listUnits.execute();
    return response.json(units);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUnity = new ShowUnityService();

    const unity = await showUnity.execute({ id });

    return response.json(unity);
  }

  public async showByName(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name } = request.params;

    const showUnity = new ShowUnityService();

    const unity = await showUnity.searchUnityName({ name });

    return response.json(unity);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, initials } = request.body;

    const createUnity = new CreateUnityService();
    const unity = await createUnity.execute({
      name,
      initials,
    });
    return response.json(unity);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, initials } = request.body;
    const { id } = request.params;

    const updateUnity = new UpdateUnityService();
    const unity = await updateUnity.execute({
      id,
      name,
      initials,
    });
    return response.json(unity);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUnity = new DeleteUnityService();

    await deleteUnity.execute({ id });

    return response.json([]);
  }
}
