import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { pluck } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {}

  search(term: string): Observable<Article[]> {
    const params = {
      action: 'query',
      format: 'json',
      list: 'search',
      srsearch: term,
      utf8: '1',
      origin: '*',
    };
    return (
      this.http
        .get<WikipediaResponse>(environment.api, { params })
        // Obtenemos el array de resultados y no toda la respuesta
        .pipe(pluck('query', 'search'))
    );
  }
}

interface WikipediaResponse {
  query: {
    search: Article[];
  };
}

export interface Article {
  ns: number;
  title: string;
  pageid: number;
  size: number;
  wordcount: number;
  snippet: string;
  timestamp: Date;
}
