import { BadGatewayException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class BooksService {
  constructor(private readonly httpService: HttpService) {}

  async search(query: string) {
    try {
      // TODO: использовать гугл апи как фолбэк, сначала искать книги в бд + вынести ключ
      const url = `https://www.googleapis.com/books/v1/volumes?maxResults=10&langRestrict=ru&q=${encodeURIComponent(query)}&key=AIzaSyANpGowrTgu2N5mKGW0ZbrqOR8ptmabar8`;
      const response = await firstValueFrom(this.httpService.get(url));
      return this.mapBooks(response.data.items || []);
    } catch (e) {
      throw new BadGatewayException("Google Books API error");
    }
  }

  private mapBooks(items: any[]) {
    return items.map((item) => {
      const volume = item.volumeInfo;

      return {
        externalId: item.id,
        title: volume.title,
        authors: volume.authors || [],
        description: volume.description || null,
        cover: volume.imageLinks?.thumbnail || null,
        publishedDate: volume.publishedDate || null,
      };
    });
  }
}
