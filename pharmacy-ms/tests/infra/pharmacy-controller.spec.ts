import { IPharmacyService } from '../../src/application/pharmacy-service';
import { PharmacyController } from '../../src/infra/pharmacy-controller';
import { PharmacyServiceStub } from './pharmacy-service-stub';

describe('PharmacyController', () => {
  let sut: PharmacyController;
  let pharmacyService: IPharmacyService;

  beforeEach(() => {
    pharmacyService = new PharmacyServiceStub();
    sut = new PharmacyController(pharmacyService);
  });

  describe('create()', () => {
    it('should return 201 on success', async () => {
      const response = await sut.create({ body: {}, params: {} });
      expect(response.statusCode).toBe(201);
      expect(response.data).toHaveProperty('id');
    });

    it('should call pharmacyService.create with correct data', async () => {
      const spy = jest.spyOn(pharmacyService, 'create');
      await sut.create({ body: {}, params: {} });
      expect(spy).toHaveBeenCalledWith({});
    });
  });

  describe('addAffiliatedPharmacy()', () => {
    it('should return 204 on success', async () => {
      const response = await sut.addAffiliatedPharmacy({
        params: { id: 'id' },
        body: { affiliatedPharmacyId: 'affiliatedPharmacyId' },
      });
      expect(response.statusCode).toBe(204);
    });

    it('should call pharmacyService.addAffiliatedPharmacy with correct data', async () => {
      const spy = jest.spyOn(pharmacyService, 'addAffiliatedPharmacy');
      await sut.addAffiliatedPharmacy({
        params: { id: 'id' },
        body: { affiliatedPharmacyId: 'affiliatedPharmacyId' },
      });
      expect(spy).toHaveBeenCalledWith('id', 'affiliatedPharmacyId');
    });
  });

  describe('update()', () => {
    it('should return 200 on success', async () => {
      const response = await sut.update({
        params: { id: 'id' },
        body: {},
      });
      expect(response.statusCode).toBe(200);
      expect(response.data).toHaveProperty('id');
    });

    it('should call pharmacyService.update with correct data', async () => {
      const spy = jest.spyOn(pharmacyService, 'update');
      await sut.update({
        params: { id: 'id' },
        body: {},
      });
      expect(spy).toHaveBeenCalledWith({}, 'id');
    });
  });

  describe('delete()', () => {
    it('should return 204 on success', async () => {
      const response = await sut.delete({ body: {}, params: { id: 'id' } });
      expect(response.statusCode).toBe(204);
    });

    it('should call pharmacyService.delete with correct data', async () => {
      const spy = jest.spyOn(pharmacyService, 'delete');
      await sut.delete({ body: {}, params: { id: 'id' } });
      expect(spy).toHaveBeenCalledWith('id');
    });
  });

  describe('getAll()', () => {
    it('should return 200 on success', async () => {
      const response = await sut.getAll();
      expect(response.statusCode).toBe(200);
      expect(response.data).toHaveLength(0);
    });

    it('should call pharmacyService.getAll with correct data', async () => {
      const spy = jest.spyOn(pharmacyService, 'getAll');
      await sut.getAll();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getById()', () => {
    it('should return 200 on success', async () => {
      const response = await sut.getById({ body: {}, params: { id: 'id' } });
      expect(response.statusCode).toBe(200);
      expect(response.data).toHaveProperty('id');
    });

    it('should call pharmacyService.getById with correct data', async () => {
      const spy = jest.spyOn(pharmacyService, 'getById');
      await sut.getById({ body: {}, params: { id: 'id' } });
      expect(spy).toHaveBeenCalledWith('id');
    });
  });
});
