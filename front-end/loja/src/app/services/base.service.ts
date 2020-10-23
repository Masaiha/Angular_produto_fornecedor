import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

export abstract class BaseService {
    protected UrlServiceV1: string = 'https://localhost:5001/api/v1/';

    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
    };

    protected ExtrairDados(response: any) {
        return response.data || {};
    };

    protected ErrorService(response: Response | any) {
        let customError: string[] = [];

        if(response instanceof HttpErrorResponse) {
            if(response.statusText === "Unknown Error") {
                customError.push("Ocorreu um erro desconhecido");
                response.error.errors = customError;
            }
        }

        console.error(response);
        return throwError(response);        
    }
}