import { randomUUID } from 'crypto';
import { Validations } from '../shared/validations';

type ProductProps = {
  id?: string;
  thumbnail: string;
  name: string;
  price: number;
  ingredients: string;
  availability: number;
  volume: number;
  pharmacyId: string;
};

export class Product {
  readonly id: string;
  readonly thumbnail: string;
  readonly name: string;
  readonly price: number;
  readonly ingredients: string;
  readonly availability: number;
  readonly volume: number;
  readonly pharmacyId: string;

  constructor(props: ProductProps) {
    this.id = props.id ?? randomUUID();
    this.thumbnail = props.thumbnail;
    this.name = props.name;
    this.price = props.price;
    this.ingredients = props.ingredients;
    this.availability = props.availability;
    this.volume = props.volume;
    this.pharmacyId = props.pharmacyId;

    this.validate();
  }

  validate() {
    Validations.isNotEmpty(this.thumbnail, 'Thumbnail is required');
    Validations.isNotEmpty(this.name, 'Name is required');
    Validations.isNotNull(this.price, 'Price is required');
    Validations.isGreaterThan(this.price, 0, 'Price must be greater than 0');
    Validations.isNotEmpty(this.ingredients, 'Ingredients is required');
    Validations.isNotNull(this.availability, 'Availability is required');
    Validations.isNotNull(this.volume, 'Volume is required');
    Validations.isGreaterThan(this.volume, 0, 'Volume must be greater than 0');
    Validations.isNotEmpty(this.pharmacyId, 'PharmacyId is required');
  }
}
