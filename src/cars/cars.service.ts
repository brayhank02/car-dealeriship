import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Honda',
    //   model: 'Accord',
    // },
    // {
    //   id: uuid(),
    //   brand: 'BMW',
    //   model: 'M3',
    // },
  ];

  findAll(): Car[] {
    return this.cars;
  }

  findOne(id: string): Car {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }

  create(createCarDto: CreateCarDto): Car {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };

    this.cars.push(car);
    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto): Car {
    let carDB = this.findOne(id);

    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException('Card id is not valid inside body');

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDto, id };
        return carDB;
      }
      return car;
    });
    return carDB;
  }

  remove(id: string) {
    const carDB = this.findOne(id);
    this.cars = this.cars.filter((car) => car.id !== carDB.id);
  }
}
