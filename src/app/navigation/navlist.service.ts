import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class NavListService {
    selectedNav;
    navListChange = new Subject<any>();  
    navList = [
        {
            name: 'batch',
            title: 'Batches',
            url: '/viewbatch',
            color:"basic",
            sidenav: [
                { name: 'Prepare Batch', url: '/preparebatch' },
                { name: 'Create Batch', url: '/createbatch' },
                { name: 'View Batch', url: '/viewbatch' }
            ]
        },
        {
            name: 'quality_audit',
            title: 'Quality Audit',
            url: '/rejectcylinders',
            color:"basic",
            sidenav: [
                { name: 'Reject Cylinders', url: '/rejectcylinders' },
                { name: 'Modify Rejections', url: '/modifyrejections' },
                { name: 'Rejected Cylinders', url: '/rejectedcylinders' }
            ]
        },
        {
            name: 'barcode',
            title: 'BarCode',
            url: '/printbarcode',
            color:"basic",
            sidenav: [
                { name: 'Print BarCode', url: '/printbarcode' }
            ]            
        },
        {
            name: 'reports',
            title: 'Reports',
            url: '/hstreport',
            color:"basic",
            sidenav: [
                {name: 'HST Report', url: '/hstreport'},
                {name: 'Pneumatic Report', url: '/pneumaticreport'},
                {name: 'Tare Weight Report', url: '/tareweight'}
            ]
        },
        {
            name: 'dispatch',
            title: 'Dispatch',
            url: '/dispatch',
            color:"basic",
            sidenav: [
                { name: 'Dispatch', url: '/dispatch' },
                { name: 'Edit Dispatch', url: '/editdispatch'}
            ]            
        }
    ];
        

    constructor() {}

    onNavListChange(navList:any) {        
        this.navList.map(element => {
            if(element.name == navList.name) {
                element.color = "warn";                   
            } else {
                element.color = "basic";                    
            }
            return element;
        });             
      
        this.navListChange.next(navList) 
    }

    getNavList() {
        return this.navList;
    }
}
