import { BatchItem } from './batch-item.model';
import { HttpClient } from '@angular/common/http';
import { Batch } from './batch.model';

export class BatchService {
    private batchData: BatchItem[] = [];
    private batch: Batch[] = [];

    constructor(private http: HttpClient) {

    }


    getBatchDataSource() {
        this.batch = [
            {
                name: "test",
                sl_no_range: "100-200",
                cylinders_count: 20,
                rejections_count: 2,
                status: "on"
            }
        ]
        return this.batch.slice();
    }

    prepareReportDataSource(start: number, end: number, report: string, rejectionsList:any) {
        this.batchData = [];
        let batchItem;
        let status = "OK";
        let col_length =  Math.ceil((end - start)/6);
        let start_row_sl_no = start;

        for(let i=0;i<col_length;i++) {
            batchItem = {};
            
            for(var j=1;j<=6;j++) {
                let start_slno = start_row_sl_no + (j-1)*col_length;
                if(start_slno > end) continue;
                let rejectedSerialNo
                if(rejectionsList.length) {
                    rejectedSerialNo = rejectionsList.find(element => element.serial_number == start_slno);
                }
                
                if(rejectedSerialNo != undefined && rejectedSerialNo.rejection_type == report) {
                    status = "REJECTED";
                } else {
                    status = "OK"
                }
                let serial_no_index = "serial_no"+j;
                let status_key = "status"+j;
                batchItem = {
                    ...batchItem,
                    [serial_no_index]: start_slno,
                    [status_key]: status
                }
                
            }
            this.batchData.push(batchItem);  
            ++start_row_sl_no; 
            
        }
        
        return this.batchData.slice();
    }

    prepareTareWeigthReportDataSource(start: number, end: number, tareweightCylinders:any) {
        this.batchData = [];
        let batchItem;
        let status = "OK";
        let col_length =  Math.ceil((end - start)/2);
        let start_row_sl_no = start;

        for(let i=0;i<col_length;i++) {
            batchItem = {};
            
            for(var j=1;j<=2;j++) {
                const start_slno = start_row_sl_no + (j-1)*col_length;
                if(start_slno > end) continue;
                let batch_tareweight;
                if(tareweightCylinders.length) {
                    batch_tareweight = tareweightCylinders.find(element => element.serial_number == start_slno);
                }

                let tare_weight_left_value = "0";
                let tare_weight_right_value = "0";
                let tareweight_value = "0";

                if(batch_tareweight != undefined) {
                    tareweight_value = batch_tareweight.weight;
                    let tareweight_array = String(tareweight_value).split('.');
                    if(tareweight_array.length) {
                        tare_weight_left_value = tareweight_array[0];                        
                    }
                    if(tareweight_array.length > 1) {
                        tare_weight_right_value = tareweight_array[1];
                    }
                    
                    tareweight_value = parseFloat(tareweight_value).toFixed(1);
                }
                //const tareweight_value = batch_tareweight == undefined ? 0 : 0;
              
                
                let serial_no_index = "serial_no"+j;
                let tare_weight_left = "tare_weight_left"+j;
                let tare_weight_right = "tare_weight_right"+j
                let tareweight = "tareweight"+j;
                batchItem = {
                    ...batchItem,
                    [serial_no_index]: start_slno,
                    [tare_weight_left]: tare_weight_left_value,
                    [tare_weight_right]: tare_weight_right_value,                    
                    [tareweight]: tareweight_value
                }
                
            }
            this.batchData.push(batchItem);  
            ++start_row_sl_no; 
            
        }

        console.log(this.batchData);
        
        return this.batchData.slice();
    }

    prepareBatchDataSource(start:number,end:number) {
        /*this.batchData = [];
       let end_serial_no =  Math.floor((start + end)/6);

       let serial_number1 =  end_serial_no+1;

        for(let i= start; i <= end_serial_no;i++) {      
            let batchItem;

            if(serial_number1 > end) {
                batchItem =  {
                    serial_no: i,
                    audited: false,
                }
            } else {
                batchItem =  {
                    serial_no: i,
                    audited: false,
                    serial_no1: serial_number1,
                    audited1: false
                }
            }
            this.batchData.push(batchItem);      
            ++serial_number1;
        }*/

        this.batchData = [];
        let batchItem;
        
        let col_length =  Math.ceil((end - start)/6);
        let start_row_sl_no = start;

        for(let i=0;i<col_length;i++) {
            batchItem = {};
            
            for(var j=1;j<=6;j++) {
                let start_slno = start_row_sl_no + (j-1)*col_length;
                if(start_slno > end) continue;
                let serial_no_index = "serial_no"+j;
                let status_key = "audited"+j;
                batchItem = {
                    ...batchItem,
                    [serial_no_index]: start_slno,
                    [status_key]: false
                }
                
            }
            this.batchData.push(batchItem);  
            ++start_row_sl_no; 
            
        }
        
        return this.batchData.slice();

    }

    createBatch(data:any) {
        return this.http.post<any>('/createbatch',data);
    }

    getBatchList() {
        return this.http.get<any>('/batches');
    }

    getBatch(id) {
        return this.http.get<any>('/batches/'+id);
    }

    getLastSerial() {
        return this.http.get<any>('/lastserial');
    }

    rejectCylinder(data:any) {
        return this.http.post<any>('/rejectcilinder',data);
    }

    rejectedCylindersList(data:any) {
        return this.http.post<any>('/rejectedcylinderlist',data);
    }

    modifyRejection(data:any) {
        return this.http.post<any>('/updaterejection',data);
    }

    saveBarCode(data:any) {
        return this.http.post<any>('/tareweight',data);
    }

    updateBarCode(data:any) {
        return this.http.post<any>('/tareweightupdate',data);
    }

    tareweightCylindersList(data:any) {
        return this.http.post<any>('/tareweightcylinders',data)
    }
}