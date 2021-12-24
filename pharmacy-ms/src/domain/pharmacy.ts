/* eslint-disable no-use-before-define */
import { DomainError } from '../shared/domain-error';
import { Entity } from '../shared/entity';
import { Validations } from '../shared/validations';

type PharmacyProps = {
  id?: string;
  logo: string;
  name: string;
  cnpj: string;
  address: string;
  openingHours: string;
  responsible: string;
  phone: string;
  affiliatedPharmacies?: Pharmacy[];
};

export class Pharmacy extends Entity {
  private _logo: string;
  private _name: string;
  private _cnpj: string;
  private _address: string;
  private _openingHours: string;
  private _responsible: string;
  private _phone: string;
  private _affiliatedPharmacies: Pharmacy[];

  constructor(props: PharmacyProps) {
    super(props.id);
    this._logo = props.logo;
    this._name = props.name;
    this._cnpj = props.cnpj;
    this._address = props.address;
    this._openingHours = props.openingHours;
    this._responsible = props.responsible;
    this._phone = props.phone;
    this._affiliatedPharmacies = props.affiliatedPharmacies ?? [];

    this.validate();
  }

  addAffiliatedPharmacy(pharmacy: Pharmacy) {
    if (pharmacy.id === this.id) {
      throw new DomainError('Pharmacy cannot be affiliated with itself');
    }
    if (this.findAffiliatedPharmacyById(pharmacy.id)) {
      throw new DomainError('Pharmacy already affiliated');
    }
    if (this._affiliatedPharmacies.length >= 3) {
      throw new DomainError('You can only have 3 affiliated pharmacies');
    }
    this._affiliatedPharmacies.push(pharmacy);
  }

  isHeadPharmacy(): boolean {
    return this._affiliatedPharmacies.length > 0;
  }

  private findAffiliatedPharmacyById(id: string): Pharmacy | undefined {
    return this._affiliatedPharmacies.find((pharmacy) => pharmacy.id === id);
  }

  validate(): void {
    Validations.isNotEmpty(this._name, 'Name is required to create a pharmacy');
    Validations.isCnpj(this._cnpj, 'CNPJ is invalid when creating a pharmacy');
    Validations.isNotEmpty(
      this._address,
      'Address is required to create a pharmacy',
    );
    Validations.isNotEmpty(
      this._openingHours,
      'Opening hours are required to create a pharmacy',
    );
    Validations.isNotEmpty(
      this._responsible,
      'Responsible is required to create a pharmacy',
    );
    Validations.isPhone(
      this._phone,
      'Phone is invalid when creating a pharmacy',
    );
  }

  get affiliatedPharmacies(): Pharmacy[] {
    return this._affiliatedPharmacies;
  }

  get logo(): string {
    return this._logo;
  }

  get name(): string {
    return this._name;
  }

  get cnpj(): string {
    return this._cnpj;
  }

  get address(): string {
    return this._address;
  }

  get openingHours(): string {
    return this._openingHours;
  }

  get responsible(): string {
    return this._responsible;
  }

  get phone(): string {
    return this._phone;
  }
}
