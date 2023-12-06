import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from './post.entity';
import { SuggestPostDto } from './dto/suggest-post.dto';
import { SuggestPost } from './interface/suggestPost.interface';
import { CreatePost } from './interface/createPost.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>
  ) { }

  /**
   * Creates post.
  */
  public async createPost(data: CreatePostDto): Promise<CreatePost> {
    const body = {
      message: data.message,
      vectorField: data.vectorField,
      createAt: new Date()
    }

    const obj = this.postRepository.create(body);
    const response = await this.postRepository.save(obj);
  
    return { response: response, message: 'Post created' };
  }

  /**
   * Suggests post through comparison.
  */
  public async suggestPost(refVector: SuggestPostDto): Promise<SuggestPost> {
    const response = await this.postRepository.find();

    const value = response.map((x: any) => {
      const distance = this.euclideanDistance(refVector.vectorField, x.vectorField);
      return {
        ...x,
        distance: distance
      }
    })

    const closeValue = this.minDistance(value);

    return closeValue;
  }

  /**
   * Calculates euclidean distance between two vectors.
  */
  private euclideanDistance(vectorA: string[], vectorB: string[]): number {
    let reference = 0;

    for (let i=0; i<vectorA.length; i++) {
      reference = (parseFloat(vectorA[i]) - parseFloat(vectorB[i]))*(parseFloat(vectorA[i]) - parseFloat(vectorB[i])) + reference;
    }
    
    return Math.sqrt(reference);
  }

  /**
   * Calculates minimal euclidean distance by all data. 
  */
  private minDistance(data: any[]): SuggestPost {
    const minValue = data.reduce((min, obj) => (obj.distance < min ? obj.distance : min), data[0].distance);
    const minItem = data.find((x: any) => x.distance === minValue);

    return minItem;
  }
}
