import {validate} from 'class-validator';
import {Category} from '../entities';
import {logger} from '../logger';

export async function read(): Promise<Category[]> {
  return await Category.find();
}

export async function readOne(categoryId: number): Promise<Category> {
  logger.info(categoryId);
  return await Category.findOneOrFail(categoryId);
}

export async function writeOne(category: Category): Promise<Category> {
  const errors = await validate(category);
  if (errors.length > 0) {
    throw new Error('Validation failed!');
  } else {
    return await Category.save(category);
  }
}
