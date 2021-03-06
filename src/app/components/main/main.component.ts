import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {Product} from "../../modals/product.model";
import {CartItem} from "../../modals/cart-item";
import {ProductService} from "../shared/services/product.service";
import {CartService} from "../shared/services/cart.service";
import { Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { SidebarMenuService } from '../shared/sidebar/sidebar-menu.service';
import { SidenavMenu } from '../shared/sidebar/sidebar-menu.model';
import { NgxSpinnerService } from "ngx-spinner";
import { FacebookService, InitParams } from 'ngx-facebook';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  public modeAffichage = 2;
  public sidenavMenuItems:Array<any>;

  // public currencies = ['DZA'];
  public currency:any;
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg' },
    { name:'German', image: 'assets/images/flags/de.svg' },
    { name:'French', image: 'assets/images/flags/fr.svg' },
    { name:'Russian', image: 'assets/images/flags/ru.svg' },
    { name:'Turkish', image: 'assets/images/flags/tr.svg' }
  ]
  public flag:any;

  products: Product[];

  indexProduct: number;
  shoppingCartItems: CartItem[] = [];

  public banners = [];

  wishlistItems  :   Product[] = [];

  public url : any;



  navItems: SidenavMenu[] = [
    {
      displayName: 'Acceuil',
      iconName: 'recent_actors',
      route: '/home'
    },
    {
      displayName: 'Produits',
          iconName: 'feedback',
          route: '/home/products/all'
    },
    {
      displayName: 'Catégories',
      iconName: 'movie_filter',
      children: [
        {
          displayName: 'Computers',
          iconName: 'group',
          children: [
            {
              displayName: 'Laptops',
              iconName: 'person',
              route: 'michael-prentice',
            },
            {
              displayName: 'Cables',
              iconName: 'person',
              route: 'stephen-fluin',
               },
            {
              displayName: 'Monitors',
              iconName: 'person',
              route: 'mike-brocchi',
           },
           {
            displayName: 'Tablets',
            iconName: 'person',
            route: 'mike-brocchi',
         },
         {
          displayName: 'Headsets',
          iconName: 'person',
          route: 'mike-brocchi',
       }
          ]
        },
        {
          displayName: 'Tv & Audio',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Tv',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'Audio',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'Video',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            },
            {
              displayName: 'Dvd',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            }
          ]
        },
        {
          displayName: 'Phones',
          iconName: 'feedback',
          children: [
            {
              displayName: 'Mobile phones',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'Power Bank',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'Memory Cards',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            },
            {
              displayName: 'Accesories',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            }
          ]
        },
        {
          displayName: 'Electronics',
          iconName: 'feedback',
          children: [
            {
              displayName: 'Washing Machines',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'Water heater',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'Cookers',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            },
            {
              displayName: 'Cold stores',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            }
          ]
        }
      ]
    },
    {
      displayName: 'A propos',
      iconName: 'group',
      route: '/pages/about'
    },
    {
      displayName: 'Contact',
      iconName: 'feedback',
      route: '/pages/contact'
    }
  ];

  constructor(
     private facebookService: FacebookService,
     private spinner: NgxSpinnerService, public router: Router,
     private cartService: CartService, public sidenavMenuService:SidebarMenuService) {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart)
       {
        this.spinner.show();
       }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.spinner.hide();
        this.url = event.url;
      }
    } )
    const initParams: InitParams = { xfbml:true, version:'v3.2'};
    this.facebookService.init(initParams);
    
  }

  ngAfterViewInit() {
  }


  ngOnInit(){    
  }

  goTop(){
    // setTimeout(() => {
    document.querySelector('mat-sidenav-content').scroll({top: 0, behavior: 'smooth'});
    // },1000);
  }

  // public changeCurrency(currency){
  //   this.currency = currency;
  // }
  // public changeLang(flag){
  //   this.flag = flag;
  // }

}
