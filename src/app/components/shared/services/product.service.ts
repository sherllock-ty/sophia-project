import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/modals/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, flatMap, concatMap, switchMap } from 'rxjs/operators';



// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("compareItem")) || [];

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public currency: string = 'USD';
  public catalogMode: boolean = false;


  private _url: string = "http://localhost:1337";
  public url = "http://localhost:1337/banners";

  public compareProducts: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public observer: Subscriber<{}>;

  constructor(private httpClient: HttpClient, public snackBar: MatSnackBar) {
    this.compareProducts.subscribe(products => products = products)
  }

  private products(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:1337/products');

  }

  getPicture(product){
    return 'http://localhost:1337' + product.pictures[0].url
  }

  public getImageById(id: number, imageIndex: number) {
    return this.getProduct(id).pipe(
      switchMap(product => {
        return this.httpClient
          .get('http://localhost:1337' + product.pictures[imageIndex].url, { responseType: 'blob' })
      })
    ).toPromise();
  }

  public getImage(product: Product, imageIndex: number) {
    console.log(product);

    return this.httpClient
      .get('http://localhost:1337' + product.pictures[imageIndex].url, { responseType: 'blob' }).toPromise();

  }

  public createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    return new Promise(resolve => {
      if (image) {
        reader.readAsDataURL(image);
      }
      reader.addEventListener('load', () => {
        resolve(reader.result);
      }, false)
    });
  }

  public banners(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url);
  }


  // Get Banners
  public getBanners() {
    return this.banners();
  }

  // Get Banners
  public getProducts(): Observable<Product[]> {
    return this.products();
  }


  // Get Products By Id
  public getProduct(id: number): Observable<Product> {
    // return this.products().pipe(map(items => {
    //   return items.find((item: Product) => {
    //     return item.id === id;
    //   });
    // }));
    // return this.products.find(product=> product.id === id);

    return this.httpClient.get<Product>(this._url + '/products/' + id);
  }

  public getProductt(id: number) {
    return this.httpClient.get<Product>(this._url + '/products/' + id).toPromise();
  }


  /*
---------------------------------------------
----------  Compare Product  ----------------
---------------------------------------------
*/

  // Get Compare Products
  public getComapreProducts(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(products);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // If item is aleready added In compare
  public hasProduct(product: Product): boolean {
    const item = products.find(item => item.id === product.id);
    return item !== undefined;
  }

  // Add to compare
  public addToCompare(product: Product): Product | boolean {
    let message, status;
    var item: Product | boolean = false;
    if (this.hasProduct(product)) {
      item = products.filter(item => item.id === product.id)[0];
      const index = products.indexOf(item);
      this.snackBar.open('The product  ' + product.name + ' already added to comparison list.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

    } else {
      if (products.length < 4)
        products.push(product);
      message = 'The product ' + product.name + ' has been added to comparison list.';
      status = 'success';
      this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });

    }
    localStorage.setItem("compareItem", JSON.stringify(products));
    return item;
  }

  // Removed Product
  public removeFromCompare(product: Product) {
    if (product === undefined) { return; }
    const index = products.indexOf(product);
    products.splice(index, 1);
    localStorage.setItem("compareItem", JSON.stringify(products));
  }

  // Get Products By category
  public getProductByCategory(category: string): Observable<Product[]> {
    return this.products().pipe(map(items =>
      items.filter((item: Product) => {
        if (category == 'all')
          return item
        else
          return item.category === category;

      })
    ));
  }

}
