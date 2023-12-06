export class CreatePostDto {
  id?: number;
  message: string;
  createAt?: Date | string;
  vectorField: number[];
}
