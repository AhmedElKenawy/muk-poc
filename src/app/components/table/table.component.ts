import {
  AsyncPipe,
  CommonModule,
  DatePipe,
  UpperCasePipe,
} from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {
  ButtonType,
  MukButtonComponent,
  MukButtonTypes,
  MukThemePalette,
  TooltipPositions,
} from 'ngx-mui-kit/components/muk-button';
import { MukLoadingSpinnerComponent } from 'ngx-mui-kit/components/muk-loading-spinner';
import {
  Column,
  ITableConfig,
  MukTableComponent
} from 'ngx-mui-kit/components/muk-table';
import { Observable, finalize, of } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MukTableComponent,
    DatePipe,
    UpperCasePipe,
    MukButtonComponent,
    AsyncPipe,
    MukLoadingSpinnerComponent,
    CommonModule,
  ],
  providers: [ApiService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  apiService: ApiService = inject(ApiService);
  dialog : MatDialog = inject (MatDialog) ;
  products$: Observable<Product[]> = of([]);
  isLoaded = false;

  data!: MatTableDataSource<Product>;
  pageIndex = 0;
  pageSize = 5;
  length = 0;
  allData!: Product[];
  tableConfig: ITableConfig<any> = {
    dataSource: new MatTableDataSource(),
    totalElements: 50,
    pageSize: 10,
    displayedColumns: [
      {
        label: 'Title',
        path: 'title',
        type: Column.Text,
        isPrimary: true,
      },
      {
        label: 'price',
        path: 'price',
        type: Column.Text,
        isTruncated: true,
      },
      {
        label: 'category',
        path: 'category.name',
        type: Column.Text,
        contentIndex: 0,
      },

      {
        label: 'Actions',
        path: 'actions1',
        type: Column.Actions,
        actions: [
          {
            isMukButton: true,
            isLoading: false,
            color: MukThemePalette.Warn,
            matType: MukButtonTypes.Icon,
            icon: 'edit',
            isDisabled: false,
            type: ButtonType.Button,
            toolTip: {
              position: TooltipPositions.Below,
              toolTip: 'Edit',
            },
            
          },
          {
            isMukButton: true,
            isLoading: false,
            color: MukThemePalette.Warn,
            matType: MukButtonTypes.Icon,
            // spinnerColor:'white',
            icon: 'delete',
            isDisabled: false,
            type: ButtonType.Button,
            toolTip: {
              position: TooltipPositions.Below,
              toolTip: 'Delete',
            },
            
          },
        ],
      },
    
    ],
    isLoading: false,
    loadMoreButtonConfig: {
      text: 'Load More',
      color: MukThemePalette.Primary,
      isMukButton: true,
    },
  };

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.apiService
      .getAllProducts()
      .pipe(finalize(() => (this.isLoaded = true)))
      .subscribe((products) => {
        this.length = products.length;
        this.tableConfig.dataSource = new MatTableDataSource(
          products.slice(this.pageIndex * 5, this.pageIndex * 5 + 5)
        );
      });
  }

  onPaginatorChange(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.getProducts();
  }

 


}

