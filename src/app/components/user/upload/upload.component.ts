import {AuthService} from './../../../services/auth.service';
import {
  Component,
  OnInit,
  ViewContainerRef,
  Compiler,
  Injector,
  TemplateRef,
  ViewChild,
  NgModuleRef
} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ContestHistory} from "../../../models/contest";
import {Overlay} from 'angular2-modal';
import {overlayConfigFactory} from "angular2-modal";
import {Modal, BSModalContext} from 'angular2-modal/plugins/bootstrap';
import 'rxjs/Rx';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  selectedHistory:ContestHistory;
  filename;
  userDetail = JSON.parse(localStorage.getItem('token'));
  configUpload = {
    // Change this to your upload POST address:
    server: 'https://api.dfsportgod.com/api/contest/history',
    maxFilesize: 50,
    acceptedFiles: '.csv',
    paramName: 'file',
    autoReset: 500,
    headers: {'Authorization': 'Bearer ' + this.userDetail.token}
  };
  uploads:ContestHistory[];
  mainDialog;
  subDialog;

  @ViewChild('downloadTemplateRef') public downloadTemplateRef:TemplateRef<any>;
  @ViewChild('deleteTemplateRef') public deleteTemplateRef:TemplateRef<any>;

  constructor(private authservice:AuthService, private router:Router, private _notificationsService:NotificationsService, private compiler:Compiler, private injector:Injector, overlay:Overlay, vcRef:ViewContainerRef, public modal:Modal) {
    overlay.defaultViewContainer = vcRef;
  }

  ngOnInit() {
    this.getUploads();
  }

  getUploads() {
    this.authservice.getUploads().subscribe(
      uploads => {
        this.uploads = uploads.data;
      },
      error => {
        console.log("HTTP Error => ", error);
        //this.authservice.logout();
        //window.location.href = '/login';
      }
    )
  }

  fileUploadEvent(event) {
    let fileList:FileList = event.target.files;
    if (fileList.length > 0) {
      this.authservice.uploadContests(fileList).subscribe(
        data => console.log('success'),
        error => console.log(error)
      );
    }
  }

  onUploadError(event) {
    console.log(event);
  }

  onUploadSuccess(event) {
    this.getUploads();
  }

  onSending(file) {
    this.filename = file[0].name.split('-')
    this.filename = this.filename[0]
    file[2].append('type', this.filename)
  }

  onTableRowClicked(history:ContestHistory) {
    this.selectedHistory = history;
    this.modal.open(this.downloadTemplateRef, overlayConfigFactory({isBlocking: false}, BSModalContext))
  }

  deleteHistoryClicked(downloadDialog) {
    this.mainDialog = downloadDialog;
    this.modal.open(this.deleteTemplateRef, overlayConfigFactory({isBlocking: false}, BSModalContext));
  }

  confirmDeleteClicked(deleteDialog) {
    this.subDialog = deleteDialog;
    this.authservice.deleteUpload(this.selectedHistory)
      .subscribe(
        data => {
          this.subDialog.close(true);
          this.mainDialog.close(true);
          this.getUploads();
          console.log(data);
        }
      )
  }

  getFileSize(size:number):string {
    if (size) {
      return (size / 1024).toFixed(2);
    }
    return '0';
  }

  downloadClick() {
    let history = this.selectedHistory;
    this.authservice.downloadFile(history)
      .subscribe(
        data => {
          let file = new Blob([data["_body"]], {type: 'text/csv'});
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(file);
          link.setAttribute('download', history.original_name);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      )
  }

}
